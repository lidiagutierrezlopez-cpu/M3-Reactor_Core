export default function Filtros({
    soloFavoritas = false,
    totalFavoritas = 0,
    onCambiarSoloFavoritas = () => {},
    onVerExposicion = () => {},
}) {
    if (soloFavoritas) {
        return (
            <div className="filtros filtros-favoritas">
                <h2>Mis favoritas</h2>
                <div className="filtros-acciones">
                    {totalFavoritas > 0 && (
                        <button type="button" className="boton" onClick={onVerExposicion}>
                            ▶ Ver como exposición
                        </button>
                    )}
                    <button type="button" className="boton" onClick={() => onCambiarSoloFavoritas(false)}>
                        ✕ Salir de favoritas
                    </button>
                </div>
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