import {
    Content,
    PageOrientation,
    TDocumentDefinitions
  } from 'pdfmake/interfaces'
  import { format } from 'date-fns'
  import { vfs } from './utils/fonts'
  import pdfMake from 'pdfmake/build/pdfmake'
  import logoReportImg from '../../../public/images/logo.png'
import { toDataURL } from './utils'
    
  
  
  pdfMake.vfs = vfs
  pdfMake.fonts = {
    Montserrat: {
      normal: 'Montserrat-Regular.ttf',
      bold: 'Montserrat-SemiBold.ttf',
      italics: 'Montserrat-Italic.ttf',
      bolditalics: 'Montserrat-SemiBoldItalic.ttf'
    }
  }
  
  type TemplateReportProps = {
    id_usuario: string
    pageOrientation?: PageOrientation | undefined
    reportTitle: string
    content: Content
    filterText: Content
    summary?: Content
    mode?: 'open' | 'save'
  }
  
  export async function TemplateReport({
    id_usuario,
    reportTitle,
    content,
    summary,
    filterText,
    mode,
    pageOrientation = 'portrait'
  }: TemplateReportProps) {    
          
    const logoReport = String(await toDataURL(logoReportImg))
  
    const empresaData = {
        cnpj: '00.000.000/0000-00',
        endereco: {
          logradouro: 'Rua Teste',
          numero: '123',
          bairro: 'Bairro Teste',
          municipio: {
            nome: 'Cidade Teste',
            estado: {
              sigla: 'UF'
            }
          },
          cep: '00000-000'
        },
        email: 'admin@dtmoney.com',
        telefone1: '(00) 0000-0000',
        razao_social: 'DT Money Company'
    }
    let empresaHeaderText = ''
    if (empresaData) {
      const { cnpj, endereco, razao_social, email, telefone1 } = empresaData
      empresaHeaderText = `${razao_social} \nCNPJ: ${cnpj} \nEmail: ${email} \n${endereco.logradouro}, nº ${endereco.numero}, Bairro: ${endereco.bairro} \n Cidade/UF: ${endereco.municipio?.nome}/${endereco.municipio?.estado?.sigla} - CEP: ${endereco.cep} \n Telefone: ${telefone1}`
    }
  
    const pageHeader = () => [
      {
        columns: [
          {
            image: logoReport,
            // width: 192,
            // height: 108,
            width: 118,
            height: 86,
            style: 'logo'
          },
          {
            text: empresaHeaderText,
            style: 'headerText'
          }
        ]
      }
    ]
  
    const reportInfo = () => {
      return {
        columns: [
          {
            qr: 'https://easydoc.xsolutionti.com.br/',
            fit: 140,
            width: '22%'
          },
          [
            {
              text: filterText,
              style: 'filterText'
            }
          ]
        ],
        style: 'qrcode'
      }
    }
  
    const summaryInfo = () => [
      {
        columns: [
          {
            text: summary ? summary : '',
            style: 'filterText',
            width: '*'
          }
        ]
      }
    ]
      
    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Montserrat' },
      pageSize: 'A4',
      pageOrientation,
      pageMargins: [30, 30, 30, 40],
      footer: function (currentPage, pageCount) {
        return [
          {
            text: currentPage.toString() + ' de ' + pageCount,
            style: 'footer'
          }
        ]
      },
      content: [
        pageHeader(),
        { text: '\n' },
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: reportTitle,
                  style: 'title'
                }
              ]
            ]
          }
        },
        {
          text: `Impresso pelo usuário: ${'Usuário Teste'} em: ${format(
            new Date(),
            " dd/MM/yyyy 'às' HH:mm"
          )}`,
          style: 'printedOn'
        },
        { text: '\n' },
        reportInfo(),
        { text: '\n' },
        content,
        summaryInfo(),        
      ],
      styles: {
        title: {
          fontSize: 12,
          bold: true,
          alignment: 'center'
        },
        headerText: {
          fontSize: 10,
          lineHeight: 1,
          margin: [26, 0, 0, 0]
        },
        filterText: {
          fontSize: 10,
          margin: [0, 16, 0, 0],
          alignment: 'left'
        },
        filterTextSummary: {
          fontSize: 10,
          margin: [0, 4, 0, 0],
          alignment: 'left'
        },
        summaryText: {
          fontSize: 10,
          margin: [0, 10, 0, 0],
          alignment: 'left'
        },
        red: {
          color: 'red'
        },
        blue: {
          color: 'blue'
        },
        bold: {
          bold: true
        },
        footer: {
          fontSize: 9,
          italics: true,
          alignment: 'right',
          margin: [30, 0, 30, 0]
        },
        printedOn: {
          fontSize: 8,
          alignment: 'right'
        },
        quantityDoc: {
          fontSize: 9,
          alignment: 'right'
        },
        quantityDocPositive: {
          fontSize: 9,
          color: 'blue',
          alignment: 'right'
        },
        quantityDocNegative: {
          fontSize: 9,
          color: 'red',
          alignment: 'right'
        },
        total: {
          fontSize: 9,
          bold: true,
          alignment: 'left',
          margin: [5, 2, 5, 10]
        },
        totalPositive: {
          fontSize: 9,
          bold: true,
          color: 'blue',
          alignment: 'left',
          margin: [5, 2, 5, 10]
        },
        totalNegative: {
          fontSize: 9,
          bold: true,
          color: 'red',
          alignment: 'left',
          margin: [5, 2, 5, 10]
        },
        row: {
          fontSize: 9
        },
        rowRight: {
          fontSize: 9,
          alignment: 'right'
        },
        rowCenter: {
          fontSize: 9,
          alignment: 'center'
        },
        line: {
          alignment: 'center',
          margin: [0, 30, 0, 0]
        },
        assinatura: {
          alignment: 'center',
          fontSize: 10
        },
        qrcode: {
          margin: [0, 8, 0, 0]
        },
        columnTitle: {
          fontSize: 10,
          bold: true,
          alignment: 'center'
        },
        logo: {
          margin: [12, -5, 0, 7]
        }
      }
    }
  
    if (mode === 'open') {
      const win = window.open('', '_blank', 'popup=yes')
      pdfMake.createPdf(docDefinitions).open({}, win)
    } else if (mode === 'save') {
      pdfMake
        .createPdf(docDefinitions)
        .download(`${reportTitle.toLocaleLowerCase().replaceAll(' ', '_')}`)
    }
  }
  