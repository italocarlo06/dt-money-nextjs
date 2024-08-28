import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { ITransaction } from '@/types/transaction'
import { groupByField, iterateGroupedData } from '@/components/Report/utils'
import { TemplateReport } from '@/components/Report'

type Props = {
  data: ITransaction[]
  filtros: {    
    data_inicio?: Date
    data_fim?: Date
  }
  mode?: 'open' | 'save'
}

export async function TransactionReport({  
  data,
  filtros,
  mode
}: Props) {
  const filterReportText = async () => {
    const { data_fim, data_inicio} = filtros
    const filtersReport = []
    
    filtersReport.push({ text: 'Período: ', style: ['filterText', 'bold'] })
    if (data_inicio && data_fim) {
      filtersReport.push({
        text: `${format(new Date(data_inicio), 'dd/MM/yyyy', {
          locale: ptBR
        })} até ${format(new Date(data_fim), 'dd/MM/yyyy', { locale: ptBR })}`,
        style: ['filterText']
      })
    } else filtersReport.push({ text: '<global> ', style: ['filterText'] })

    return filtersReport
  }

  const transacoesPorCategoriaTable = () => {
    const dadosAgrupados = groupByField(data, 'category')
    const tables: Array<any> = []
    let rows: Array<any> = []
    if (dadosAgrupados) {
      iterateGroupedData(dadosAgrupados, (category, transactions) => {
        rows = [
          [
            { text: 'Título', style: 'columnTitle' },            
            { text: 'Data', style: 'columnTitle' },
            { text: 'Preço', style: 'columnTitle' },
            { text: 'Tipo', style: 'columnTitle' },            
          ]
        ]

    

        transactions.forEach((transaction) => {
          const type = transaction.type === 'income' ? 'Entrada' : 'Saída'

          const formattedPrice = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          }).format(transaction.price);
          const row = [
            { text: transaction.title, style: 'row' },
            { text: format(new Date(transaction.data), 'dd/MM/yyyy'), style: 'row' },
            { text: formattedPrice, style: 'row' },
            { text: type, style: 'row' },                                    
          ]

          rows.push(row as any)
        })

        tables.push([
          {
            text: `Category: ${category}`,
            style: 'subtitle'
          },
          {
            table: {
              widths: ['*', 100, 100, 100],
              headerRows: 1,
              body: rows
            }
          },
          {
            text: `Total de Transações: ${transactions.length}`,
            style: 'total'
          }
        ])
      })
      return tables
    } else {
      return [{ text: '\n' }]
    }
  }

  await TemplateReport({
    content: transacoesPorCategoriaTable(),
    filterText: await filterReportText(),
    reportTitle: 'Transações por categoria',
    pageOrientation: 'portrait',
    mode
  })
}
