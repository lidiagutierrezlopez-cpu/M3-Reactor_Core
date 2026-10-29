# Galería de bolsillo 
 
## Funcionalidades
- Búsqueda de obras en la API del museo mientras se escribe, con mensajes de carga, de error y de búsqueda sin resultados.
- Galería en rejilla adaptable a cualquier tamaño de pantalla, con todas las tarjetas del mismo tamaño.
- Ficha de cada obra en una ventana emergente con la imagen grande, autor, fecha, tipo, técnica, departamento y descripción. Se cierra con el botón, haciendo clic fuera o con la tecla Escape.
- Favoritas: se marcan con el corazón de cada obra, se guardan en el navegador y se conservan al recargar la página, independientemente de la búsqueda.
- Vista «Mis favoritas», con un botón para entrar y otro para salir que mantiene la búsqueda que había antes.
- Modo exposición (funcionalidad original): las favoritas a pantalla completa, una a una, pasando solas cada cinco segundos, con pausa, flechas en pantalla y en el teclado, y contador de posición.
- Dos hooks personalizados reutilizables: useFetch, para las peticiones a la API, y useLocalStorage, para guardar las favoritas.
- Paleta de colores definida en variables CSS para poder cambiarla desde un solo sitio.

## Problemas y decisiones
- Organización de los componentes. Dividí la interfaz en Cabecera, Buscador, Filtros, Galeria, TarjetaObra, DetalleObra, Exposicion y Mensajes. El estado compartido vive en App: por ejemplo, el texto de búsqueda lo escribe el Buscador pero lo necesita la petición a la API, así que lo subí al componente padre. Gracias a eso, al ocultar el buscador en la vista de favoritas, el texto no se pierde.
- Estado mínimo. Solo guardo como estado la búsqueda, las favoritas, si se está en la vista de favoritas, el id de la obra abierta y si está activo el modo exposición. La lista de obras que se muestra, la obra seleccionada y el número de favoritas se calculan en cada render a partir de ese estado.
- Formato de los datos de la API. La API devuelve muchos campos y en inglés, así que creé una función adaptarObra que convierte cada obra en un objeto sencillo. De esta forma, los componentes no dependen del formato de la API.
- Obras sin descripción. Muchas obras no tienen el campo description. Lo resolví buscando el texto también en otros campos de la API, limpiando las etiquetas HTML que traen algunos textos y añadiendo una ficha técnica para que la ventana de detalle nunca quede vacía.
- Respuestas desordenadas al buscar. Al escribir rápido se lanzan varias peticiones, y una antigua podía llegar después y sustituir a la buena. En useFetch, la limpieza del efecto marca las respuestas antiguas para ignorarlas.
- Favoritas que solo se veían si estaban en la búsqueda actual. Al principio guardaba solo los ids de las obras, de modo que una favorita desaparecía al cambiar de búsqueda. Decidí guardar las obras completas, ya que esos datos no se pueden calcular a partir de los resultados actuales, y compararlas por id.
- El botón de favorita abría la ficha de la obra. El clic subía desde el botón hasta la tarjeta. Lo solucioné con stopPropagation en el botón.
- Cerrar la ficha con Escape. Como la tecla debe funcionar en toda la página, uso un efecto que escucha el teclado en la ventana y elimina el listener en su limpieza.
- Temporizador del modo exposición. Usé setTimeout con la posición actual como dependencia en lugar de setInterval: así, cada vez que cambia la obra, el temporizador anterior se cancela y cada obra se ve el tiempo completo aunque se haya avanzado a mano.
- Vista de favoritas. Empecé con una casilla de verificación, pero la sustituí por un botón para entrar y otro para salir, que resulta más claro.
- Carpeta de componentes. Vite no encontraba los componentes porque la carpeta se llamaba componentes y los imports buscaban components. Lo corregí renombrando la carpeta.

## Declaración de uso de IA
He utilizado Claude como apoyo durante todo el desarrollo. Me generó la plantilla inicial del proyecto (estructura de carpetas y esqueleto de los componentes) y, a partir de ahí, construí la aplicación paso a paso con su ayuda: le pedía cómo implementar cada parte, me proporcionaba el código explicando cada fragmento y yo lo integraba, lo probaba y lo adaptaba. También la usé para entender y corregir errores. Las decisiones sobre qué funcionalidades incluir y cómo debía comportarse la aplicación fueron mías.
 
Dos ejemplos de cosas en las que pedí ayuda:
 
- El botón de favoritas no funcionaba y, en su lugar, se abría la ficha de la obra. Con su ayuda vi que en el onClick había una función definida dentro de otra que nunca llegaba a ejecutarse.
- Las favoritas solo aparecían si la obra estaba en la búsqueda actual. Le pedí ayuda para reestructurar cómo se guardaban, y me explicó por qué convenía guardar las obras completas en lugar de los ids y por qué al comparar objetos hay que hacerlo por id.
El CSS ha sido generado por IA; yo solo he ajustado algunos colores de la paleta.