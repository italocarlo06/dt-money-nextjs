import React from 'react';

export const TransactionsTable: React.FC = () => {
    return (
        <div className="p-4">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Título</th>
                    <th className="py-2 px-4 border-b">Preço</th>
                    <th className="py-2 px-4 border-b">Categoria</th>
                    <th className="py-2 px-4 border-b">Data</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="py-2 px-4 border-b">Desenvolvimento de site</td>
                    <td className="py-2 px-4 border-b text-green-500">R$ 12.000,00</td>
                    <td className="py-2 px-4 border-b">Venda</td>
                    <td className="py-2 px-4 border-b">13/04/2021</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Hamburguer</td>
                    <td className="py-2 px-4 border-b text-red-500">- R$ 59,00</td>
                    <td className="py-2 px-4 border-b">Alimentação</td>
                    <td className="py-2 px-4 border-b">10/04/2021</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Aluguel do apartamento</td>
                    <td className="py-2 px-4 border-b text-red-500">- R$ 1.200,00</td>
                    <td className="py-2 px-4 border-b">Casa</td>
                    <td className="py-2 px-4 border-b">27/03/2021</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Computador</td>
                    <td className="py-2 px-4 border-b text-green-500">R$ 5.400,00</td>
                    <td className="py-2 px-4 border-b">Venda</td>
                    <td className="py-2 px-4 border-b">15/03/2021</td>
                </tr>
            </tbody>
        </div>
    )
}
