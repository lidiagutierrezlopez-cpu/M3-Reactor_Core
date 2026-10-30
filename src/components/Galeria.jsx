import TarjetaObra from "./TarjetaObra.jsx";

export default function Galeria({ obras = [], favoritas = [], onFavorita, onSeleccionar }) {
    const idsFavoritas = new Set(favoritas.map((fav) => fav.id));

    return (
        <section className="galeria">
            {obras.map((obra) => (
                <TarjetaObra
                    key={obra.id}
                    obra={obra} 
                    esFavorita={idsFavoritas.has(obra.id)}
                    onFavorita={onFavorita}
                    onSeleccionar={onSeleccionar}
                />
            ))}
        </section>
    );
}
