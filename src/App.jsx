import { useState } from "react";
import Cabecera from "./components/Cabecera.jsx";
import Buscador from "./components/Buscador.jsx";
import Filtros from "./components/Filtros.jsx";
import DetalleObra from "./components/DetalleObra.jsx";
import Resultados from "./components/Resultados.jsx";
import useFetch from "./hooks/useFetch.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import useDebounce from "./hooks/useDebounce.js";
import { construirUrl, adaptarObra } from "./services/api.js";
import Exposicion from "./components/Exposicion.jsx";

export default function App() {
    const [busqueda, setBusqueda] = useState("");
    const [favoritas, setFavoritas] = useLocalStorage("galeria-obras-favoritas", []);
    const [soloFavoritas, setSoloFavoritas] = useState(false);
    const [idSeleccionado, setIdSeleccionado] = useState(null);
    const [modoExposicion, setModoExposicion] = useState(false);


    const busquedaRetrasada = useDebounce(busqueda, 400);
    const { datos, cargando, error } = useFetch(construirUrl(busquedaRetrasada));
    const obras = datos ? datos.data.map(adaptarObra) : [];

    const totalFavoritas = favoritas.length;
    const obrasVisibles = soloFavoritas ? favoritas : obras;
    const obraSeleccionada = 
        obras.find((obra) => obra.id === idSeleccionado) ??
        favoritas.find((obra) => obra.id === idSeleccionado);


    function manejarFavorita(obra) {
        setFavoritas((anteriores) =>
            anteriores.some((fav) => fav.id === obra.id)
                ? anteriores.filter((fav) => fav.id !== obra.id)
                : [...anteriores, obra]
        );
    }

    function manejarSeleccion(id) {
        setIdSeleccionado(id);
    }

    function manejarCerrarDetalle() {
        setIdSeleccionado(null);
    }

    function manejarVerExposicion() {
        setModoExposicion(true);
    }

    function manejarSalirExposicion() {
        setModoExposicion(false);
    }

    return (
        <>
            <Cabecera totalFavoritas={totalFavoritas} />

            <main>
                <div className="barra">
                    {!soloFavoritas && <Buscador texto={busqueda} onCambio={setBusqueda} />}
                    <Filtros
                        soloFavoritas={soloFavoritas}
                        totalFavoritas={totalFavoritas}
                        onCambiarSoloFavoritas={setSoloFavoritas}
                        onVerExposicion={manejarVerExposicion}
                    />
                </div>
                <Resultados
                    obras={obrasVisibles}
                    favoritas={favoritas}
                    cargando={cargando}
                    error={error}
                    soloFavoritas={soloFavoritas}
                    busqueda={busquedaRetrasada}
                    onFavorita={manejarFavorita}
                    onSeleccionar={manejarSeleccion}
                />
            </main>

            {obraSeleccionada && <DetalleObra obra={obraSeleccionada} onCerrar={manejarCerrarDetalle} />}
            {modoExposicion && <Exposicion obras={favoritas} onSalir={manejarSalirExposicion} />}
        </>
    );
}
