export default function Cabecera({ totalFavoritas = 0 }) {
    return (
        <header>
            <h1>Galería de bolsillo</h1>
            {totalFavoritas > 0 && <p>Favoritas: {totalFavoritas}</p>}
        </header>
    );
}
