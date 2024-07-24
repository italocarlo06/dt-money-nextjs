import React from 'react';
import Image from 'next/image';


export const Summary: React.FC = () => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <header className="flex justify-between items-center">
                    <p className="font-poppins text-base font-normal leading-6 text-left">Entradas</p>

                    <div className="text-green-500">
                        <Image className="h-6 w-6"  src="/images/Entradas.png" alt="Logo" width={172} height={40}/>
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </div>
                </header>
                <div className="flex justify-center mt-4">
                  <Image src="/images/valorentrada.png" alt="Entradas" width={200} height={50} />
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <header className="flex justify-between items-center">
                    <p className="font-poppins text-base font-normal leading-6 text-left">Saídas</p>
                    <div className="text-red-500">
                       <Image className="h-6 w-6"  src="/images/saida.png" alt="Logo" width={172} height={40}/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        
                    </div>
                </header>
                <div className="flex justify-center mt-4">
                  <Image src="/images/valorsaida.png" alt="Entradas" width={200} height={50} />
                </div>
            </div>
            <div className="bg-green-500 text-white p-4 rounded shadow">
                <header className="flex justify-between items-center">
                    <p className="font-poppins text-base font-normal leading-6 text-left">Total</p>
                    <div>
                        <Image className="h-6 w-6"  src="/images/Total.png" alt="Logo" width={172} height={40}/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                        
                    </div>
                </header>
                <div className="flex justify-center mt-4">
                  <Image src="/images/valortotal.png" alt="Entradas" width={200} height={50} />
                </div>

            </div>

        </div>
    );
};