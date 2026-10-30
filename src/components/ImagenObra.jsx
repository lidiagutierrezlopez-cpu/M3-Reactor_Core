export default function ImagenObra({ obra, className = "" }) {
    if (!obra.imagen) {
        return <div className={`${className} sin-imagen`}>Sin imagen</div>;
    }
    return <img src={obra.imagen} alt={obra.titulo} className={className} />;
}