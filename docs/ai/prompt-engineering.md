# Prompt Engineering

En este documento se recogen los prompts más útiles usados durante el proyecto TaskFlow, explicando por qué funcionan bien y en qué contexto se aplicaron.

---

## Qué es el prompt engineering

El prompt engineering consiste en diseñar instrucciones precisas para obtener mejores respuestas de un asistente de IA. Un prompt bien construido especifica el rol, el contexto, el formato de salida y las restricciones necesarias.

---

## Técnicas utilizadas

### 1. Definir un rol
Indicar a la IA que actúe como un perfil concreto mejora la calidad y el enfoque de la respuesta.

### 2. Few-shot prompting
Incluir ejemplos en el prompt para que la IA entienda el formato esperado.

### 3. Razonamiento paso a paso
Pedir que explique el proceso antes de dar la solución final.

### 4. Restricciones claras
Limitar el formato, la longitud o el tipo de respuesta esperada.

---

## Prompts útiles

### Prompt 1 — Explicación de conceptos con rol
```
Actúa como un desarrollador senior y explícame qué es un closure en JavaScript
con un ejemplo práctico aplicado a un proyecto real
```
**Por qué funciona:** El rol de "desarrollador senior" orienta la respuesta hacia un nivel técnico adecuado con ejemplos aplicados, evitando explicaciones demasiado básicas o teóricas.

---

### Prompt 2 — Detección de bugs con razonamiento paso a paso
```
Analiza esta función JavaScript paso a paso y explica qué error tiene y por qué ocurre:

function calcularMedia(numeros) {
  let suma = 0
  for (let i = 0; i <= numeros.length; i++) {
    suma += numeros[i]
  }
  return suma / numeros.length
}
```
**Por qué funciona:** Pedir el análisis "paso a paso" obliga a la IA a razonar en lugar de dar una respuesta directa, lo que produce explicaciones más completas y didácticas.

---

### Prompt 3 — Generación de código con restricciones
```
Escribe una función JavaScript que reciba un array de números y devuelva
solo los números pares ordenados de menor a mayor.
Usa solo métodos de array nativos, sin bucles for.
```
**Por qué funciona:** Las restricciones claras ("sin bucles for") guían a la IA hacia una solución más limpia y moderna usando filter y sort.

---

### Prompt 4 — Refactorización con contexto
```
Revisa el archivo app.js y dime qué funciones se pueden mejorar o simplificar,
ordenadas por prioridad de impacto
```
**Por qué funciona:** Pedir que ordene por prioridad ayuda a identificar qué cambios aportan más valor, evitando perder tiempo en mejoras menores.

---

### Prompt 5 — Documentación JSDoc con edición inline
```
Añade un comentario JSDoc a esta función
```
**Por qué funciona:** Es un prompt corto y directo usado con Ctrl+K en Cursor. Al tener el cursor dentro de la función, la IA tiene contexto suficiente para generar la documentación correcta sin más instrucciones.

---

### Prompt 6 — Mejora concreta con nombre de función
```
Aplica la mejora número 1: crea la función syncState() y úsala en addTask,
toggleTask, deleteTask, completeAll, clearCompleted y commitEdit
```
**Por qué funciona:** Especificar exactamente qué funciones afecta evita que la IA tome decisiones por su cuenta y aplique cambios no deseados en otras partes del código.

---

### Prompt 7 — Consulta MCP sobre estructura del proyecto
```
Lista todos los archivos del proyecto taskflow-project
```
**Por qué funciona:** Con el servidor MCP activo, la IA accede directamente al sistema de archivos real del proyecto en lugar de inventar una estructura hipotética.

---

### Prompt 8 — Consulta MCP sobre el código
```
Lee el contenido del archivo app.js y dime cuántas funciones tiene
```
**Por qué funciona:** Al especificar el archivo concreto, la IA lo lee directamente y da una respuesta precisa basada en el código real, no en suposiciones.

---

### Prompt 9 — Few-shot prompting para generación de funciones
```
Escribe tres funciones JavaScript siguiendo este patrón:
- Reciben un array como parámetro
- Devuelven un valor procesado
- Incluyen un ejemplo de uso

Ejemplo del patrón:
function obtenerMaximo(arr) { return Math.max(...arr); }
// obtenerMaximo([1, 5, 3]) → 5

Ahora escribe funciones para: filtrar pares, encontrar duplicados y calcular la media
```
**Por qué funciona:** El ejemplo del patrón (few-shot) muestra exactamente el formato esperado, lo que hace que las tres funciones generadas sean consistentes entre sí.

---

### Prompt 10 — Reflexión crítica sobre el código generado
```
Actúa como revisor de código. Analiza esta función y dime si hay algún caso
edge que no esté cubierto, posibles errores en producción y cómo mejorarla:

function loadTasks() {
  const stored = localStorage.getItem('taskflow-tasks');
  return stored ? JSON.parse(stored) : [];
}
```
**Por qué funciona:** El rol de "revisor de código" y preguntar por casos edge obliga a la IA a pensar más allá del caso feliz, identificando el problema del JSON corrupto que luego se solucionó con try/catch.

---

## Conclusiones

Los prompts más efectivos combinan varias técnicas a la vez: un rol claro, contexto específico y restricciones concretas. Los prompts vagos como "mejora este código" producen resultados genéricos, mientras que prompts detallados como "aplica exactamente esta mejora en estas funciones" producen cambios precisos y controlados.
