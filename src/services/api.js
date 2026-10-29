const URL_BASE = "https://openaccess-api.clevelandart.org/api/artworks/";

export function construirUrl(busqueda) {
    const parametros = new URLSearchParams({ has_image: "1", limit: "20" });
    const texto = busqueda.trim();
    if (texto !== "") {
        parametros.set("q", texto);
    }
    return `${URL_BASE}?${parametros}`;
}

function limpiarTexto(texto) {
    if (!texto) return null;
    return texto.replace(/<[^>]*>/g, "").trim() || null;
}

export function adaptarObra(obraApi) {
    return {
        id: obraApi.id,
        titulo: obraApi.title,
        autor: obraApi.creators?.[0]?.description ?? "Autor desconocido",
        fecha: obraApi.creation_date ?? "Fecha desconocida",
        imagen: obraApi.images?.web?.url ?? null,
        descripcion: limpiarTexto(
            obraApi.description ||
            obraApi.wall_description ||
            obraApi.digital_description ||
            obraApi.did_you_know
        ),
        tipo: obraApi.type ?? null,
        tecnica: obraApi.technique ?? null,
        departamento: obraApi.department ?? null,
    };
}