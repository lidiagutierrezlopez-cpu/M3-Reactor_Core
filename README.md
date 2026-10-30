# Galería de bolsillo
 
## Funcionalidades
- Búsqueda de obras en la API del museo al dejar de escribir, con mensajes de carga, de error y de búsqueda sin resultados.
- Galería en rejilla adaptable a cualquier tamaño de pantalla, con todas las tarjetas del mismo tamaño.
- Ficha de cada obra en una ventana emergente con la imagen grande, autor, fecha, tipo, técnica, departamento y descripción. Se cierra con el botón, haciendo clic fuera o con la tecla Escape.
- Navegación con teclado: las tarjetas se recorren con Tab y se abren con Enter.
- Favoritas: se marcan con el corazón de cada obra, se guardan en el navegador y se conservan al recargar la página, independientemente de la búsqueda.
- Vista «Mis favoritas», con un botón para entrar y otro para salir que mantiene la búsqueda que había antes.
- Modo exposición (funcionalidad original): las favoritas a pantalla completa, una a una, pasando solas cada cinco segundos, con pausa, flechas en pantalla y en el teclado, y contador de posición.
- Cuatro hooks personalizados reutilizables: useFetch, para las peticiones a la API, con cancelación de las peticiones antiguas; useLocalStorage, para guardar las favoritas; useDebounce, para esperar a que se deje de escribir antes de buscar; y useKeyPress, para gestionar las teclas.
- Paleta de colores definida en variables CSS para poder cambiarla desde un solo sitio.

## Problemas y decisiones
- Organización de los componentes. Dividí la interfaz en Cabecera, Buscador, Filtros, Galeria, TarjetaObra, ImagenObra, DetalleObra, Exposicion y Mensajes. El estado compartido vive en App: por ejemplo, el texto de búsqueda lo escribe el Buscador pero lo necesita la petición a la API, así que lo subí al componente padre. Gracias a eso, al ocultar el buscador en la vista de favoritas, el texto no se pierde.
- Estado mínimo. Solo guardo como estado la búsqueda, las favoritas, si se está en la vista de favoritas, el id de la obra abierta y si está activo el modo exposición. La lista de obras que se muestra, la obra seleccionada y el número de favoritas se calculan en cada render a partir de ese estado.
- Favoritas que solo se veían si estaban en la búsqueda actual. Al principio guardaba solo los ids de las obras, de modo que una favorita desaparecía al cambiar de búsqueda. Decidí guardar las obras completas, ya que esos datos no se pueden calcular a partir de los resultados actuales, y compararlas por id. Para saber qué tarjetas son favoritas, la galería crea un Set con sus ids, que permite comprobarlo directamente en lugar de recorrer la lista por cada tarjeta.
- Respuestas desordenadas al buscar. Al escribir rápido se lanzan varias peticiones, y una antigua podía llegar después y sustituir a la buena. Al principio la limpieza del efecto solo marcaba las respuestas antiguas para ignorarlas; después la cambié para que cancele la petición anterior con AbortController, de modo que el navegador deja de descargarla.
- Temporizador del modo exposición. Usé setTimeout con la posición actual como dependencia en lugar de setInterval: así, cada vez que cambia la obra, el temporizador anterior se cancela y cada obra se ve el tiempo completo aunque se haya avanzado a mano. Además, la posición se acota durante el render para que nunca quede fuera de la lista si esta cambia.

## Declaración de uso de IA
He utilizado Claude como apoyo durante todo el desarrollo. Me generó la plantilla inicial del proyecto (estructura de carpetas y esqueleto de los componentes) y, a partir de ahí, construí la aplicación paso a paso con su ayuda: le pedía cómo implementar cada parte, me proporcionaba el código explicando cada fragmento y yo lo integraba, lo probaba y lo adaptaba. También la usé para entender y corregir errores. Las decisiones sobre qué funcionalidades incluir y cómo debía comportarse la aplicación fueron mías.
 
Tras la primera corrección, apliqué también con su ayuda las mejoras sugeridas por el evaluador (AbortController, useDebounce, useKeyPress, ImagenObra y la accesibilidad de las tarjetas), cada una en su propio commit.
 
Dos ejemplos de cosas en las que pedí ayuda:
 
- El botón de favoritas no funcionaba y, en su lugar, se abría la ficha de la obra. Con su ayuda vi que en el onClick había una función definida dentro de otra que nunca llegaba a ejecutarse.
- Las favoritas solo aparecían si la obra estaba en la búsqueda actual. Le pedí ayuda para reestructurar cómo se guardaban, y me explicó por qué convenía guardar las obras completas en lugar de los ids y por qué al comparar objetos hay que hacerlo por id.

El CSS ha sido generado por IA; yo solo he ajustado algunos colores de la paleta.