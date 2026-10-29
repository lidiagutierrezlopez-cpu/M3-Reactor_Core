export function Cargando() {
    return <p>Cargando obras...</p>;
}

export function MensajeError({ mensaje = "No se han podido cargar las obras" }) {
    return <p role="alert">{mensaje}</p>;
}

export function SinResultados({ soloFavoritas = false, busqueda = "" }) {
    if (soloFavoritas) {
        return <p>Todavía no tienes favoritas. Pulsa el 🤍 de las obras que te gusten.</p>;
    }
    return <p>No hay obras para «{busqueda}». Prueba con otra búsqueda.</p>;
}