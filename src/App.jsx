import { useState } from "react";
import Cabecera from "./components/Cabecera.jsx";
import Buscador from "./components/Buscador.jsx";
import Filtros from "./components/Filtros.jsx";
import Galeria from "./components/Galeria.jsx";
import DetalleObra from "./components/DetalleObra.jsx";
import { Cargando, MensajeError, SinResultados } from "./components/Mensajes.jsx";
import useFetch from "./hooks/useFetch.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { construirUrl, adaptarObra } from "./services/api.js";
import Exposicion from "./components/Exposicion.jsx";

export default function App() {
    const [busqueda, setBusqueda] = useState("");
    const [favoritas, setFavoritas] = useLocalStorage("galeria-obras-favoritas", []);
    const [soloFavoritas, setSoloFavoritas] = useState(false);
    const [idSeleccionado, setIdSeleccionado] = useState(null);
    const [modoExposicion, setModoExposicion] = useState(false);


    const { datos, cargando, error } = useFetch(construirUrl(busqueda));
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

    let contenido;
    if (!soloFavoritas && cargando) {
        contenido = <Cargando />;
    } else if (!soloFavoritas && error) {
        contenido = <MensajeError mensaje={`No se han podido cargar las obras (${error})`} />;
    } else if (obrasVisibles.length === 0){
        contenido = <SinResultados soloFavoritas={soloFavoritas} busqueda={busqueda} />;
    } else {
        contenido = (
            <Galeria
                obras={obrasVisibles}
                favoritas={favoritas}
                onFavorita={manejarFavorita}
                onSeleccionar={manejarSeleccion}
            />
        );
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
                {contenido}
            </main>

            {obraSeleccionada && <DetalleObra obra={obraSeleccionada} onCerrar={manejarCerrarDetalle} />}
            {modoExposicion && <Exposicion obras={favoritas} onSalir={manejarSalirExposicion} />}
        </>
    );
}
