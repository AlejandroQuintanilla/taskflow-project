# Comparativa entre asistentes de IA

En este documento se recogen los resultados de comparar ChatGPT y Claude en distintas tareas de programación: explicación de conceptos, detección de errores y generación de código.

---

## Metodología

Se usaron los mismos prompts en ambos asistentes para poder comparar las respuestas en igualdad de condiciones. Las pruebas se dividieron en tres bloques: explicación de conceptos técnicos, detección de bugs y generación de código.

---

## Bloque 1 — Explicación de conceptos

### Prompts utilizados

- `Explícame qué es un closure en JavaScript con un ejemplo práctico`
- `Explícame qué es el event loop en JavaScript y cómo afecta a la ejecución asíncrona`
- `Explícame qué es el hoisting en JavaScript con ejemplos de variables y funciones`

### Resultados

| Criterio | ChatGPT | Claude |
|----------|---------|--------|
| Claridad | Buena | Muy buena |
| Profundidad | Media | Alta |
| Ejemplos | Sí, básicos | Sí, detallados |
| Diagramas o esquemas | No | Sí |

### Conclusión

Claude fue notablemente más completo en este bloque. Sus explicaciones incluían diagramas y ejemplos muy bien detallados que facilitaban entender los conceptos. ChatGPT también explicó bien los conceptos pero de forma más superficial y sin recursos visuales adicionales.

---

## Bloque 2 — Detección de errores

### Prompts utilizados

**Función 1 — Error de tipos:**
```javascript
function sumar(a, b) {
  return a + b
}
console.log(sumar(2, "3"))
```

**Función 2 — Error de índice:**
```javascript
function calcularMedia(numeros) {
  let suma = 0
  for (let i = 0; i <= numeros.length; i++) {
    suma += numeros[i]
  }
  return suma / numeros.length
}
```

**Función 3 — Error con arrow function y this:**
```javascript
const usuario = {
  nombre: "Alejandro",
  saludar: () => {
    console.log("Hola, soy " + this.nombre)
  }
}
usuario.saludar()
```

### Resultados

| Criterio | ChatGPT | Claude |
|----------|---------|--------|
| Detección del bug | ✅ Correcto | ✅ Correcto |
| Explicación del error | Clara y directa | Muy detallada |
| Solución propuesta | Sí | Sí |

### Conclusión

Ambos asistentes detectaron correctamente los tres errores. La diferencia estuvo en la explicación: ChatGPT fue más directo y fácil de seguir a primera vista, mientras que Claude profundizó mucho más en el porqué del error, lo cual es más útil para aprender aunque requiere más tiempo de lectura.

---

## Bloque 3 — Generación de código

### Prompts utilizados

- `Escribe una función JavaScript que reciba un array de números y devuelva solo los números pares ordenados de menor a mayor`
- `Escribe una función JavaScript que reciba un string y devuelva true si es un palíndromo y false si no lo es`
- `Escribe una función JavaScript que reciba un array de objetos con las propiedades nombre y edad, y devuelva el objeto con la persona más joven`

### Resultados

| Criterio | ChatGPT | Claude |
|----------|---------|--------|
| Código funcional | ✅ Sí | ✅ Sí |
| Ejemplos de uso | Sí | Sí |
| Diferencias en implementación | Sí, distintos enfoques | Sí, distintos enfoques |
| Explicación del código | Sí | Sí, más detallada |

### Conclusión

Ambos asistentes generaron código funcional e incluyeron ejemplos de uso. Las implementaciones diferían en algunos casos pero los resultados eran correctos en ambos. Claude añadió explicaciones más detalladas sobre cada parte del código, lo cual ayuda a entender mejor la solución.

---

## Conclusión general

Tras comparar ambos asistentes en los tres bloques, la valoración es la siguiente:

- **Claude** destaca por la profundidad y el nivel de detalle de sus respuestas. Sus explicaciones incluyen diagramas, ejemplos muy elaborados y un desglose completo de cada concepto. Es la mejor opción cuando se quiere aprender o entender algo a fondo.

- **ChatGPT** destaca por la claridad y la concisión. Sus respuestas son más directas y fáciles de leer de un vistazo. Es útil cuando se necesita una respuesta rápida sin tanta información extra.

En resumen, Claude es más completo y detallado, mientras que ChatGPT es más directo. Dependiendo del contexto, uno puede ser más útil que el otro.
