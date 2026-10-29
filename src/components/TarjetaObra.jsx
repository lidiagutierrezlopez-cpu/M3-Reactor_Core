export default function TarjetaObra({ obra, esFavorita = false, onFavorita = () => {}, onSeleccionar = () => {} }) {
    return (
        <article className="tarjeta" onClick={() => onSeleccionar(obra.id)}>
            <div className="tarjeta-marco">
                {obra.imagen ? (
                    <img src={obra.imagen} alt={obra.titulo} className="tarjeta-imagen" />
                ) : (
                    <div className="tarjeta-sin-imagen">Sin imagen</div>
                )}
                <button
                    type="button"
                    className="boton-favorita"
                    aria-pressed={esFavorita}
                    aria-label={esFavorita ? "Quitar de favoritas" : "Añadir a favoritas"}
                    onClick={(evento) => {
                        evento.stopPropagation();
                        onFavorita(obra);
                    }}
                >
                    <span aria-hidden="true">{esFavorita ? "❤️" : "🤍"}</span>
                </button>
            </div>
            <div className="tarjeta-info">
                <h3>{obra.titulo}</h3>
                <p className="tarjeta-autor">{obra.autor}</p>
                <p className="tarjeta-fecha">{obra.fecha}</p>
            </div>
        </article>
    );
}