import ImagenObra from "./ImagenObra.jsx";
import useKeyPress from "../hooks/useKeyPress.js";

export default function DetalleObra({ obra, onCerrar }) {
    useKeyPress({ Escape: onCerrar });

    const tieneFicha = Boolean(obra.tipo || obra.tecnica || obra.departamento);

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
                <ImagenObra obra={obra} className="detalle-imagen" />
                <h2>{obra.titulo}</h2>
                <p>{obra.autor}</p>
                <p>{obra.fecha}</p>
                {tieneFicha && 
                    (<ul className="detalle-ficha">
                        {obra.tipo && <li>Tipo: {obra.tipo}</li>}
                        {obra.tecnica && <li>Técnica: {obra.tecnica}</li>}
                        {obra.departamento && <li>Departamento: {obra.departamento}</li>}
                    </ul>)
                }
                {obra.descripcion
                    ? (<p className="detalle-descripcion">{obra.descripcion}</p>)
                    : (<p className="detalle-descripcion detalle-sin-descripcion">Esta obra no tiene descripción disponible.</p>)}
            </div>
        </div>
    );
}
