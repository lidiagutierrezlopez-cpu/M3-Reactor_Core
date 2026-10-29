export default function Filtros({ soloFavoritas = false, onCambiarSoloFavoritas = () => {} }) {
    if (soloFavoritas) {
        return (
            <div className="filtros filtros-favoritas">
                <h2>Mis favoritas</h2>
                <button type="button" className="boton" onClick={() => onCambiarSoloFavoritas(false)}>
                    ✕ Salir de favoritas
                </button>
            </div>
        );
    }

    return (
        <div className="filtros">
            <button type="button" className="boton" onClick={() => onCambiarSoloFavoritas(true)}>
                ❤️ Ver favoritas
            </button>
        </div>
    );
}