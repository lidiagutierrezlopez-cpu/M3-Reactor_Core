import TarjetaObra from "./TarjetaObra.jsx";

export default function Galeria({ obras = [], favoritas = [], onFavorita, onSeleccionar }) {
    return (
        <section className="galeria">
            {obras.map((obra) => (
                <TarjetaObra
                    key={obra.id}
                    obra={obra} 
                    esFavorita={favoritas.some((fav) => fav.id === obra.id)}
                    onFavorita={onFavorita}
                    onSeleccionar={onSeleccionar}
                />
            ))}
        </section>
    );
}
