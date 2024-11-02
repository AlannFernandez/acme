"use client";
import { useState } from 'react'; // Importa useState
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { ToastContainer,  showPromiseToast } from '@/app/components/toast/toast';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [isCashOpen, setIsCashOpen] = useState(false); // Estado para saber si la caja está abierta
    const router = useRouter();

    const handlePromiseToast = () => {
        const mockPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() > 0.5; // Simulación de éxito o fallo
                if (success) {
                    resolve({});
                    setIsCashOpen(prev => !prev); // Alternar el estado de la caja
                    if (!isCashOpen) {
                        router.push('/dashboard/sales/create'); // Redirige solo si se abre la caja
                    }
                } else {
                    reject(new Error('API failed'));
                }
            }, 2000);
        });

        showPromiseToast(mockPromise, {
            loading: isCashOpen ? 'Cerrando caja...' : 'Abriendo caja...', // Mensaje según el estado
            success: () => isCashOpen ? 'Caja cerrada exitosamente' : 'Caja abierta exitosamente',
            error: () => 'No se pudo cambiar el estado de la caja'
        });
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <ToastContainer />
        
            <button 
                onClick={handlePromiseToast}
                className="flex h-[48px] w-full max-w-xs items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
                <BanknotesIcon className="w-6" />
                <div className="hidden md:block">{isCashOpen ? 'Cerrar caja' : 'Abrir caja'}</div> {/* Cambia el texto según el estado */}
            </button>
        </div>
    );
}
