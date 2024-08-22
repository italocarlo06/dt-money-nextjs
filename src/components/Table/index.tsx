import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";
import { useState } from "react";
import { TrashIcon } from '@heroicons/react/24/outline'
import { DeleteModal } from "../DeleteModal";
import { useTransaction } from "@/hooks/useTransaction";

export interface ITableProps {
    data: ITransaction[]
}

export function Table({data}: ITableProps) {
   const [isOpen, setOpen] = useState<boolean>(false)
   const [transactionId, setTransactionId] = useState<string | null>(null)
   const { mutateAsync: deleteTransaction } = useTransaction.Delete()

   const handleDelete = () => {
    if (transactionId) {
        deleteTransaction(transactionId)
        setOpen(false)
    }
   } 

   const handleOpenModal = (id: string) => {
    setTransactionId(id)
    setOpen(true)
   }
   
    return (  
        <>     
        <table className="w-full mt-16 border border-separate border-spacing-y-2 ">
        <thead>
            <tr>
                <th className="px-4 text-left text-table-header text-base font-medium">Título</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Preço</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Data</th>                   
                <th className="px-4 text-left text-table-header text-base font-medium">Ações</th>                   
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index} className="bg-white h-16 rounded-lg">
                    <td className="px-4 py-4 whitespace-nowrap text-title">{item.title}</td>
                    <td className={`px-4 py-4 whitespace-nowrap text-right ${item.type === 'income'? "text-income-value" : "text-outcome"}`}>{formatCurrency(item.price)}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.category}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.data ? formatDate(new Date(item.data)) : ''}</td>         
                    <td className="px-4 py-4 whitespace-nowrap">                
                    <TrashIcon className="h-6 w-6 text-button rounded-md  mx-5 my-6 hover:opacity-80 cursor-pointer"  onClick={() => handleOpenModal(item.id ?? '')} />
                        
                    </td>         
                </tr>
            ))}
        </tbody>
    </table>
    <DeleteModal isOpen={isOpen} setOpen={setOpen} handleDelete={handleDelete} />
    </> 
    )
}