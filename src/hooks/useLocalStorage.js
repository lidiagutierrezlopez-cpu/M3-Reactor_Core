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
        localStorage.setItem(clave, JSON.stringify(valor));
    }, [clave, valor]);

    return [valor, setValor];
}
