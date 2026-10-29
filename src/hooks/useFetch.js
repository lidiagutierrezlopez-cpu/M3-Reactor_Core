import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        let ignorar = false;

        async function pedirDatos(){
            setCargando(true);
            setError(null);
            try {
                const respuesta = await fetch(url);
                if (!respuesta.ok){
                    throw new Error(`error ${respuesta.status}`);
                }
                const json = await respuesta.json();
                if(!ignorar) setDatos(json);
            } catch (err){
                if (!ignorar) setError(err.message);
            } finally {
                if (!ignorar) setCargando(false);
            }
        }

        pedirDatos();

        return () => {
            ignorar = true;
        };
    }, [url]);

    return { datos, cargando, error };
}
