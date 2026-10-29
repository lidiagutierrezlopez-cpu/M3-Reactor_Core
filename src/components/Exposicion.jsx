import { useState, useEffect } from "react";

const SEGUNDOS_POR_OBRA = 5;

export default function Exposicion({ obras = [], onSalir = () => {} }) {
    const [indice, setIndice] = useState(0);
    const [enPausa, setEnPausa] = useState(false);

    const total = obras.length;
    const obraActual = obras[indice];

    useEffect(() => {
        if (enPausa || total < 2) return;

        const temporizador = setTimeout(() => {
            setIndice((indice + 1) % total);
        }, SEGUNDOS_POR_OBRA * 1000);

        return () => clearTimeout(temporizador);
    }, [enPausa, indice, total]);

    useEffect(() => {
        function manejarTecla(evento) {
            if (evento.key === "ArrowRight") {
                setIndice((actual) => (actual + 1) % total);
            } else if (evento.key === "ArrowLeft") {
                setIndice((actual) => (actual - 1 + total) % total);
            } else if (evento.key === "Escape") {
                onSalir();
            }
        }

        window.addEventListener("keydown", manejarTecla);
        return () => window.removeEventListener("keydown", manejarTecla);
    }, [onSalir, total]);

    if (!obraActual) return null;

    return (
        <div className="exposicion" role="dialog" aria-modal="true" aria-label="Exposición de tus favoritas">
            <button type="button" className="boton-cerrar" aria-label="Salir de la exposición" onClick={onSalir}>
                <span aria-hidden="true">✕</span>
            </button>

            <figure key={obraActual.id} className="exposicion-obra">
                {obraActual.imagen ? (
                    <img src={obraActual.imagen} alt={obraActual.titulo} />
                ) : (
                    <div className="exposicion-sin-imagen">Sin imagen</div>
                )}
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
                    onClick={() => setIndice((actual) => (actual - 1 + total) % total)}
                >
                    ←
                </button>
                <button type="button" className="boton" onClick={() => setEnPausa((anterior) => !anterior)}>
                    {enPausa ? "▶ Reanudar" : "⏸ Pausa"}
                </button>
                <button
                    type="button"
                    className="boton"
                    aria-label="Obra siguiente"
                    onClick={() => setIndice((actual) => (actual + 1) % total)}
                >
                    →
                </button>
                <span className="exposicion-contador">{indice + 1} de {total}</span>
            </div>
        </div>
    );
}