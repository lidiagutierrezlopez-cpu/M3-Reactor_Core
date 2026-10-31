import { useState, useEffect } from "react";

export default function useLocalStorage(clave, valorInicial) {
    const [valor, setValor] = useState(() => {
        try {
            const guardado = localStorage.getItem(clave);
            return guardado !== null ? JSON.parse(guardado) : valorInicial;
        } catch {
            return valorInicial;
        }
    });

    useEffect(() => {
        try{
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch {
            // Si el navegador no deja guardar sigue funcionando la app
        }
    }, [clave, valor]);

    return [valor, setValor];
}
