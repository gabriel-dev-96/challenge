/**
 * Interfaz para el resultado de la función findPairWithSum
 */
export interface IPairResult {
  found: boolean;
  pair: number[];
}

/**
 * Encuentra el primer par de números en un array que suman un valor objetivo
 * Complejidad Temporal: O(n) donde n es la longitud del array de números
 * Complejidad Espacial: O(n) para almacenar los números vistos
 * 
 * @param numbers - Array de enteros para buscar
 * @param target - Suma objetivo a encontrar
 * @returns Objeto que contiene el estado de búsqueda y el par de números (si se encuentra)
 */
export function findPairWithSum(numbers: number[], target: number): IPairResult {
  // Validación de entrada
  if (!Array.isArray(numbers) || numbers.length < 2) {
    return { found: false, pair: [] };
  }

  // Conjunto para almacenar números vistos para búsqueda O(1)
  const seen = new Set<number>();

  for (const num of numbers) {
    const complement = target - num;

    // Si hemos visto el complemento, hemos encontrado nuestro par
    if (seen.has(complement)) {
      return {
        found: true,
        pair: [complement, num]
      };
    }

    // Almacenar el número actual
    seen.add(num);
  }

  // No se encontró ningún par
  return { found: false, pair: [] };
}
