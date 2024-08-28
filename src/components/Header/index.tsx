import { TransactionReport } from "@/app/reports/TransactionReport";
import { useTransaction } from "@/hooks/useTransaction";
import Image from "next/image";
import { PrinterIcon } from '@heroicons/react/24/outline'


export interface IHeaderProps {    
    openModal: () => void;
}

export function Header({openModal}: IHeaderProps) {
    const { data: transactions, isLoading } = useTransaction.ListAll();    

    const handlePrint = async () => {
        if (!isLoading){
            await TransactionReport({
                data: transactions ?? [],
                mode: 'save',
                filtros: {}
            })
        }
    }

    return (
    <header className="bg-header w-full h-[212px]">
        <div className="mx-auto max-w-[1120px] flex justify-between pt-8">
            <Image className="max-h-10"  src="/images/logo.png" alt="Logo" width={172} height={40} />
            <div className="flex justify-center gap-x-4" >
                <button className="bg-button text-white size-4 w-[197px] px-5 py-6 rounded-md text-center flex items-center justify-center hover:opacity-80" onClick={handlePrint}>
                <div className="flex justify-center gap-x-4" >
                    <PrinterIcon className="text-white h-6 w-6" />                    
                     Imprimir 
                </div>
                </button>
                <button className="bg-button text-white size-4 w-[197px] px-5 py-6 rounded-md text-center flex items-center justify-center hover:opacity-80" onClick={openModal}> Nova Transação </button>
            </div>            
        </div>
        
    </header> )
}