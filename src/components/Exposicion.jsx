import { useState, useEffect } from "react";
import ImagenObra from "./ImagenObra.jsx";
import useKeyPress from "../hooks/useKeyPress.js";

const SEGUNDOS_POR_OBRA = 5;

function siguiente(actual, total) {
    return (Math.min(actual, total - 1) + 1) % total;
}

function anterior(actual, total) {
    return (Math.min(actual, total - 1) - 1 + total) % total;
}

export default function Exposicion({ obras = [], onSalir = () => {} }) {
    const [indice, setIndice] = useState(0);
    const [enPausa, setEnPausa] = useState(false);

    const total = obras.length;
    const posicion = Math.min(indice, total - 1)
    const obraActual = obras[posicion];

    useEffect(() => {
        if (enPausa || total < 2) return;

        const temporizador = setTimeout(() => {
            setIndice(siguiente(posicion, total));
        }, SEGUNDOS_POR_OBRA * 1000);

        return () => clearTimeout(temporizador);
    }, [enPausa, posicion, total]);

    useKeyPress({
        ArrowRight: () => setIndice((actual) => siguiente(actual, total)),
        ArrowLeft: () => setIndice((actual) => anterior(actual, total)),
        Escape: onSalir,
    });

    if (!obraActual) return null;

    return (
        <div className="exposicion" role="dialog" aria-modal="true" aria-label="Exposición de tus favoritas">
            <button type="button" className="boton-cerrar" aria-label="Salir de la exposición" onClick={onSalir}>
                <span aria-hidden="true">✕</span>
            </button>

            <figure key={obraActual.id} className="exposicion-obra">
                <ImagenObra obra={obraActual} className="detalle-imagen" />
                <figcaption>
                    <h2>{obraActual.titulo}</h2>
                    <p>{obraActual.autor}, {obraActual.fecha}</p>
                </figcaption>
            </figure>

            <div className="exposicion-controles">
                <button
                    type="button"
                    className="boton"
                    aria-label="Obra anterior"
                    onClick={() => setIndice((actual) => anterior(actual, total))}
                >
                    ←
                </button>
                <button type="button" className="boton" onClick={() => setEnPausa((pausa) => !pausa)}>
                    {enPausa ? "▶ Reanudar" : "⏸ Pausa"}
                </button>
                <button
                    type="button"
                    className="boton"
                    aria-label="Obra siguiente"
                    onClick={() => setIndice((actual) => siguiente(actual, total))}
                >
                    →
                </button>
                <span className="exposicion-contador">{posicion + 1} de {total}</span>
            </div>
        </div>
    );
}