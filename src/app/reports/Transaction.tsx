import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { ITransaction } from '@/types/transaction'
import { groupByField, iterateGroupedData } from '@/components/Report/utils'
import { TemplateReport } from '@/components/Report'

type Props = {
  id_usuario: string
  data: ITransaction[]
  filtros: {    
    data_inicio?: Date
    data_fim?: Date
  }
  mode?: 'open' | 'save'
}

export async function TransactionReport({
  id_usuario,
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
          const row = [
            { text: transaction.title, style: 'row' },
            { text: format(new Date(transaction.data), 'dd/MM/yyyy'), style: 'row' },
            { text: transaction.price, style: 'row' },
            { text: transaction.type, style: 'row' },                                    
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
              widths: [80, '*', 100, 80, 125, 55, 40],
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
    id_usuario,
    content: transacoesPorCategoriaTable(),
    filterText: await filterReportText(),
    reportTitle: 'Transações por categoria',
    pageOrientation: 'landscape',
    mode
  })
}
