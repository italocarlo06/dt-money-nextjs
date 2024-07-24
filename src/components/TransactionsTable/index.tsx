import React from 'react';

export const TransactionsTable: React.FC = () => {
    return (
        <div className="p-4 overflow-x-auto">
            <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b text-left">Título</th>
                    <th className="py-2 px-4 border-b text-left">Preço</th>
                    <th className="py-2 px-4 border-b text-left">Categoria</th>
                    <th className="py-2 px-4 border-b text-left">Data</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="py-2 px-4 border-b text-left">Desenvolvimento de site</td>
                    <td className="py-2 px-4 border-b text-left text-green-500">R$ 12.000,00</td>
                    <td className="py-2 px-4 border-b text-left">Venda</td>
                    <td className="py-2 px-4 border-b text-left">13/04/2021</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b text-left">Hamburguer</td>
                    <td className="py-2 px-4 border-b text-left text-red-500">- R$ 59,00</td>
                    <td className="py-2 px-4 border-b text-left">Alimentação</td>
                    <td className="py-2 px-4 border-b text-left">10/04/2021</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b text-left">Aluguel do apartamento</td>
                    <td className="py-2 px-4 border-b text-left text-red-500">- R$ 1.200,00</td>
                    <td className="py-2 px-4 border-b text-left">Casa</td>
                    <td className="py-2 px-4 border-b text-left">27/03/2021</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b text-left">Computador</td>
                    <td className="py-2 px-4 border-b text-left text-green-500">R$ 5.400,00</td>
                    <td className="py-2 px-4 border-b text-left">Venda</td>
                    <td className="py-2 px-4 border-b text-left">15/03/2021</td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}
