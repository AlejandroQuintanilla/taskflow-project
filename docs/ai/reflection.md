# Reflexión final sobre IA y programación

En este documento recojo mis propias conclusiones sobre el uso de la inteligencia artificial durante el desarrollo del proyecto TaskFlow.

---

## En qué tareas me ha ayudado más

La IA me ha ayudado en prácticamente todo el proceso. Lo que más me ha sorprendido es la facilidad con la que se consiguen las cosas. Tareas que antes me habrían llevado mucho tiempo, como detectar patrones repetidos en el código, añadir documentación JSDoc, proteger funciones frente a errores o refactorizar funciones enteras, con IA se resuelven en segundos.

También me ha ayudado mucho a entender conceptos que no tenía claros. Cuando le preguntaba por qué fallaba una función o qué hacía exactamente un trozo de código, la explicación era clara y detallada, mucho más útil que buscar en Google.

En el proyecto TaskFlow concretamente, la IA fue clave para:
- Detectar la repetición de `saveTasks()`, `renderTasks()` y `updateStats()` y proponer la función `syncState()`
- Proteger `loadTasks()` con `try/catch` ante datos corruptos en localStorage
- Simplificar la lógica de filtros con `classList.toggle`
- Generar toda la documentación del proyecto de forma estructurada

---

## Casos donde la IA ha fallado o ha generado cosas incorrectas

No hubo errores graves, pero sí situaciones donde había que revisar lo que generaba. Por ejemplo, el autocompletado de Cursor propuso una función que ya existía en el proyecto, lo que habría creado código duplicado si se hubiera aceptado sin revisar.

También en algunas explicaciones la IA añadía más información de la necesaria, lo que a veces hacía más difícil identificar la parte importante de la respuesta.

---

## Riesgos de depender demasiado de la IA

El principal riesgo es aceptar código sin entenderlo. Si se copia y pega todo lo que genera la IA sin leerlo, es fácil introducir bugs o malas prácticas sin darse cuenta. La IA no siempre conoce el contexto completo del proyecto y puede proponer soluciones que funcionan de forma aislada pero que no encajan bien con el resto del código.

Otro riesgo es perder la capacidad de resolver problemas por uno mismo. Si siempre se recurre a la IA para cualquier cosa, se deja de practicar el razonamiento propio, que es lo que realmente hace crecer como desarrollador.

---

## Cuándo prefiero programar sin asistencia

Prefiero trabajar sin IA cuando quiero entender algo a fondo o cuando el problema es pequeño y resolverlo solo tiene más valor como aprendizaje. También cuando el contexto del proyecto es muy específico y la IA no tiene suficiente información para dar una respuesta útil.

---

## Conclusión

En general, creo que está bien depender de la IA siempre y cuando se compruebe después lo que dice. Es una herramienta muy potente que ahorra tiempo y mejora la calidad del código, pero no sustituye el criterio propio del desarrollador. Lo ideal es usarla como un asistente, no como un sustituto.

La IA me ha enseñado formas más limpias y eficientes de hacer cosas que yo habría resuelto de forma más básica. Eso tiene mucho valor, siempre que uno entienda lo que está aceptando.
