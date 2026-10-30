import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const controlador =  new AbortController();

        async function pedirDatos(){
            setCargando(true);
            setError(null);
            try {
                const respuesta = await fetch(url, { signal: controlador.signal });
                if (!respuesta.ok){
                    throw new Error(`error ${respuesta.status}`);
                }
                const json = await respuesta.json();
                setDatos(json);
            } catch (err){
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                if (!controlador.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        pedirDatos();

        return () => controlador.abort();
    }, [url]);

    return { datos, cargando, error };
}
