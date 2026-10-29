export default function Buscador({ texto = "", onCambio = () => {} }) {
    return (
        <input
            type="search"
            className="buscador"
            placeholder="Buscar obras, artistas, estilos..."
            aria-label="Buscar obras"
            value={texto}
            onChange={(evento) => onCambio(evento.target.value)}
        />
    );
}