import { describe, it, expect } from '@jest/globals';
import { findPairWithSum } from '../src/findPairWithSum';

describe('findPairWithSum', () => {
  describe('Entradas válidas', () => {
    it('debería encontrar el par [2, 8] que suma 10 en el array de ejemplo', () => {
      const result = findPairWithSum([2, 5, 8, 14, 0], 10);
      expect(result.found).toBe(true);
      expect(result.pair).toEqual(expect.arrayContaining([2, 8]));
    });

    it('debería encontrar par con números negativos', () => {
      const result = findPairWithSum([-2, 5, -8, 11], 3);
      expect(result.found).toBe(true);
      expect(result.pair).toEqual(expect.arrayContaining([-2, 5]));
    });

    it('debería encontrar par con cero', () => {
      const result = findPairWithSum([0, 5, 2, 8], 5);
      expect(result.found).toBe(true);
      expect(result.pair).toEqual(expect.arrayContaining([0, 5]));
    });

    it('debería encontrar par con números duplicados', () => {
      const result = findPairWithSum([1, 1, 2, 3], 2);
      expect(result.found).toBe(true);
      expect(result.pair).toEqual([1, 1]);
    });
  });

  describe('Casos límite', () => {
    it('debería retornar no encontrado para array vacío', () => {
      const result = findPairWithSum([], 10);
      expect(result.found).toBe(false);
      expect(result.pair).toEqual([]);
    });

    it('debería retornar no encontrado para array con un elemento', () => {
      const result = findPairWithSum([5], 10);
      expect(result.found).toBe(false);
      expect(result.pair).toEqual([]);
    });

    it('debería retornar no encontrado cuando ningún par suma el objetivo', () => {
      const result = findPairWithSum([1, 2, 3, 4], 10);
      expect(result.found).toBe(false);
      expect(result.pair).toEqual([]);
    });

    it('debería manejar entrada no-array correctamente', () => {
      const result = findPairWithSum(null as any, 10);
      expect(result.found).toBe(false);
      expect(result.pair).toEqual([]);
    });
  });

  describe('Rendimiento', () => {
    it('debería manejar arrays grandes eficientemente', () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => i);
      const target = 15000; // Suma de 7000 + 8000
      const startTime = process.hrtime();
      
      const result = findPairWithSum(largeArray, target);
      
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const totalTime = seconds * 1000 + nanoseconds / 1000000; // Convertir a milisegundos
      
      expect(result.found).toBe(true);
      expect(totalTime).toBeLessThan(100); // Debería completarse en menos de 100ms
    });
  });
});
