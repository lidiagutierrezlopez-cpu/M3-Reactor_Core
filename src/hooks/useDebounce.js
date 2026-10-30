import { useState, useEffect } from "react";

export default function useDebounce(valor, retraso = 400) {
    const [valorRetrasado, setValorRetrasado] = useState(valor);

    useEffect(() => {
        const temporizador = setTimeout(() => {
            setValorRetrasado(valor);
        }, retraso);

        return () => clearTimeout(temporizador);
    }, [valor, retraso]);

    return valorRetrasado;
}