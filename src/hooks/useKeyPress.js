import { useEffect, useRef } from "react";

export default function useKeyPress(teclas) {
    const teclasRef = useRef(teclas);

    useEffect(() => {
        teclasRef.current = teclas;
    });

    useEffect(() => {
        function manejarTecla(evento) {
            const accion = teclasRef.current[evento.key];
            if (accion) {
                accion(evento);
            }
        }

        window.addEventListener("keydown", manejarTecla);
        return () => window.removeEventListener("keydown", manejarTecla);
    }, []);
}