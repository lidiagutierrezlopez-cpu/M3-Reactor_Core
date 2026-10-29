export function Cargando() {
    return <p>Cargando obras...</p>;
}

export function MensajeError({ mensaje = "No se han podido cargar las obras" }) {
    return <p role="alert">{mensaje}</p>;
}

export function SinResultados({ soloFavoritas = false, busqueda = "" }) {
    if (soloFavoritas) {
        return <p>No hay favoritas entre estas obras. Pulsa «Añadir a favoritas» en las que te gusten.</p>;
    }
    return <p>No hay obras para «{busqueda}». Prueba con otra búsqueda.</p>;
}