import { useEffect } from "react";

export default function DetalleObra({ obra, onCerrar }) {
    useEffect(() => {
        function manejarTecla(evento) {
            if (evento.key === "Escape") {
                onCerrar();
            }
        }

        window.addEventListener("keydown", manejarTecla);
        return () => window.removeEventListener("keydown", manejarTecla);
    }, [onCerrar]);


    return (
        <div className="detalle-fondo" onClick={onCerrar}>
            <div
                className="detalle"
                role="dialog"
                aria-modal="true"
                aria-label={obra.titulo}
                onClick={(evento) => evento.stopPropagation()}
            >
                <button type="button" className="boton-cerrar" aria-label="Cerrar" onClick={onCerrar}>
                    <span aria-hidden="true">✕</span>
                </button>
                {obra.imagen
                    ? (<img src={obra.imagen} alt={obra.titulo} />)
                    : (<div className="detalle-sin-imagen">Sin imagen</div>)
                }
                <h2>{obra.titulo}</h2>
                <p>{obra.autor}</p>
                <p>{obra.fecha}</p>
                <ul className="detalle-ficha">
                    {obra.tipo && <li>Tipo: {obra.tipo}</li>}
                    {obra.tecnica && <li>Técnica: {obra.tecnica}</li>}
                    {obra.departamento && <li>Departamento: {obra.departamento}</li>}
                </ul>
                {obra.descripcion
                    ? (<p className="detalle-descripcion">{obra.descripcion}</p>)
                    : (<p className="detalle-descripcion detalle-sin-descripcion">Esta obra no tiene descripción disponible.</p>)}
            </div>
        </div>
    );
}
