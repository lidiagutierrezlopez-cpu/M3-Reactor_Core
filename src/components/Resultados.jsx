import Galeria from "./Galeria";
import { Cargando, MensajeError, SinResultados } from "./Mensajes";

export default function Resultados ({
    obras = [],
    favoritas = [],
    cargando = false,
    error = null,
    soloFavoritas = false,
    busqueda = "",
    onFavorita,
    onSeleccionar,
}) {
    if (!soloFavoritas && cargando) {
        return <Cargando />;
    }
    if (!soloFavoritas && error) {
        return <MensajeError mensaje={`No se ha podido cargar las obras (${error})`} />;
    }
    if (obras.length === 0){
        return <SinResultados soloFavoritas={soloFavoritas} busqueda={busqueda} />;
    }
    return <Galeria obras={obras} favoritas={favoritas} onFavorita={onFavorita} onSeleccionar={onSeleccionar} />;
}