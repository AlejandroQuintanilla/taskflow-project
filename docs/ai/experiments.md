# Experimentos con IA en programación

En este documento se comparan soluciones a problemas de programación resueltos primero sin IA y después con IA, analizando tiempo invertido, calidad del código y comprensión del problema.

---

## Metodología

Para cada problema se siguió este proceso:
1. Intentar resolverlo sin ninguna ayuda de IA
2. Resolverlo con ayuda de Claude o Cursor
3. Comparar ambas soluciones en tiempo, calidad y comprensión

---

## Experimento 1 — Factorial de un número

### Sin IA

Se intentó resolver el problema pensando en la lógica paso a paso. La solución tardó unos 10 minutos y usó un bucle básico:

```javascript
function factorial(n) {
  let resultado = 1;
  for (let i = 1; i <= n; i++) {
    resultado = resultado * i;
  }
  return resultado;
}
```

Funciona para números positivos pero no contempla casos como `n = 0` o números negativos.

### Con IA

Prompt usado:
```
Escribe una función JavaScript que calcule el factorial de un número,
teniendo en cuenta casos edge como 0 y números negativos
```

Solución generada en menos de 10 segundos:

```javascript
function factorial(n) {
  if (n < 0) return null; // factorial no definido para negativos
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
```

### Comparación

| Criterio | Sin IA | Con IA |
|----------|--------|--------|
| Tiempo | ~10 minutos | ~10 segundos |
| Casos edge cubiertos | No | Sí |
| Enfoque | Iterativo | Recursivo |
| Comprensión del problema | Alta | Alta |

**Conclusión:** La IA generó una solución más robusta y elegante usando recursión. Sin IA la solución funcionaba pero era más limitada.

---

## Experimento 2 — Comprobar si un número es primo

### Sin IA

Se sabía que un número primo solo es divisible por 1 y por sí mismo, pero la implementación tardó unos 15 minutos y tenía un bucle que revisaba todos los números hasta n:

```javascript
function esPrimo(n) {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
```

Funciona pero es ineficiente para números grandes.

### Con IA

Prompt usado:
```
Escribe una función JavaScript eficiente que compruebe si un número es primo,
explicando por qué la solución es más rápida que revisar todos los divisores
```

Solución generada:

```javascript
function esPrimo(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
```

La IA explicó que solo hace falta revisar hasta la raíz cuadrada de n porque si n tiene un divisor mayor que su raíz cuadrada, el divisor complementario será menor.

### Comparación

| Criterio | Sin IA | Con IA |
|----------|--------|--------|
| Tiempo | ~15 minutos | ~10 segundos |
| Eficiencia | O(n) | O(√n) |
| Comprensión del algoritmo | Básica | Mejorada |
| Casos edge | Parcial | Completo |

**Conclusión:** La IA no solo generó código más eficiente sino que explicó el razonamiento matemático detrás, lo que ayudó a entender mejor el problema.

---

## Experimento 3 — Invertir un string

### Sin IA

Este problema parecía más sencillo. Se tardó unos 5 minutos:

```javascript
function invertirString(str) {
  let resultado = '';
  for (let i = str.length - 1; i >= 0; i--) {
    resultado += str[i];
  }
  return resultado;
}
```

### Con IA

Prompt usado:
```
Escribe una función JavaScript que invierta un string de la forma más concisa posible
```

Solución generada:

```javascript
function invertirString(str) {
  return str.split('').reverse().join('');
}
```

### Comparación

| Criterio | Sin IA | Con IA |
|----------|--------|--------|
| Tiempo | ~5 minutos | ~5 segundos |
| Líneas de código | 6 | 1 |
| Legibilidad | Media | Alta |
| Comprensión | Alta | Alta |

**Conclusión:** Aquí la diferencia fue en la concisión. La solución manual funcionaba bien pero la IA mostró una forma mucho más idiomática de hacerlo en JavaScript usando métodos de array.

---

## Experimentos aplicados al proyecto TaskFlow

### Experimento 4 — Función syncState sin IA

Antes de usar IA se repetía manualmente `saveTasks()`, `renderTasks()` y `updateStats()` en cada función que modificaba tareas. Se tardó un tiempo considerable en darse cuenta de la repetición y no se llegó a refactorizar.

### Con IA

Cursor identificó el patrón repetido y propuso crear `syncState()` en segundos, aplicando el cambio en todas las funciones afectadas de una sola vez.

**Conclusión:** La IA detectó patrones de repetición que a simple vista no eran evidentes, ahorrando tiempo y mejorando la mantenibilidad del código.

### Experimento 5 — Protección de loadTasks sin IA

La función `loadTasks` usaba `JSON.parse` sin ninguna protección. No se había pensado en el caso de datos corruptos en localStorage hasta que la IA lo señaló como un riesgo.

### Con IA

Cursor propuso envolver el parse en un `try/catch` que devuelve un array vacío si los datos están corruptos, evitando que la app se rompa en producción.

**Conclusión:** La IA anticipó casos de error que en el desarrollo manual no se habían considerado, mejorando la robustez de la aplicación.

---

## Conclusión general

| Aspecto | Sin IA | Con IA |
|---------|--------|--------|
| Velocidad | Lenta | Muy rápida |
| Casos edge | Frecuentemente olvidados | Generalmente cubiertos |
| Calidad del código | Funcional | Más eficiente y legible |
| Comprensión | Se aprende haciendo | Se aprende con la explicación |
| Riesgo | Bajo | Medio (hay que revisar siempre) |

La IA acelera el desarrollo y mejora la calidad del código, pero es imprescindible revisar siempre lo que genera. En ningún caso se debe aceptar código sin entenderlo.
