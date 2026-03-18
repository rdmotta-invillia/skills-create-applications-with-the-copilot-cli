'use strict';

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
} = require('../calculator');

// ─── addition ───────────────────────────────────────────────────────────────

describe('addition', () => {
  test('2 + 3 = 5', () => {
    expect(addition(2, 3)).toBe(5);
  });

  test('adds negative numbers', () => {
    expect(addition(-1, -2)).toBe(-3);
  });

  test('adds decimal numbers', () => {
    expect(addition(0.1, 0.2)).toBeCloseTo(0.3);
  });

  test('adds zero', () => {
    expect(addition(5, 0)).toBe(5);
  });
});

// ─── subtraction ────────────────────────────────────────────────────────────

describe('subtraction', () => {
  test('10 - 4 = 6', () => {
    expect(subtraction(10, 4)).toBe(6);
  });

  test('result can be negative', () => {
    expect(subtraction(3, 7)).toBe(-4);
  });

  test('subtracts decimals', () => {
    expect(subtraction(5.5, 2.2)).toBeCloseTo(3.3);
  });
});

// ─── multiplication ──────────────────────────────────────────────────────────

describe('multiplication', () => {
  test('45 * 2 = 90', () => {
    expect(multiplication(45, 2)).toBe(90);
  });

  test('multiply by zero', () => {
    expect(multiplication(99, 0)).toBe(0);
  });

  test('multiply negative numbers', () => {
    expect(multiplication(-3, -4)).toBe(12);
  });
});

// ─── division ───────────────────────────────────────────────────────────────

describe('division', () => {
  test('20 / 5 = 4', () => {
    expect(division(20, 5)).toBe(4);
  });

  test('division yields decimal result', () => {
    expect(division(7, 2)).toBe(3.5);
  });

  test('division by zero throws an error', () => {
    expect(() => division(10, 0)).toThrow('Division by zero is not allowed.');
  });
});

// ─── modulo ─────────────────────────────────────────────────────────────────

describe('modulo', () => {
  test('10 modulo 3 = 1', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('modulo with even divisor returns 0', () => {
    expect(modulo(8, 4)).toBe(0);
  });

  test('modulo with negative dividend', () => {
    expect(modulo(-7, 3)).toBe(-1);
  });

  test('modulo by zero throws an error', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero is not allowed.');
  });
});

// ─── power (exponentiation) ──────────────────────────────────────────────────

describe('power', () => {
  test('2 power 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('any number power 0 = 1', () => {
    expect(power(99, 0)).toBe(1);
  });

  test('power with fractional exponent (square root)', () => {
    expect(power(9, 0.5)).toBe(3);
  });

  test('negative base with integer exponent', () => {
    expect(power(-2, 3)).toBe(-8);
  });
});

// ─── squareRoot ──────────────────────────────────────────────────────────────

describe('squareRoot', () => {
  test('square root of 16 = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('square root of 2 is approximately 1.414', () => {
    expect(squareRoot(2)).toBeCloseTo(1.414, 3);
  });

  test('square root of 0 = 0', () => {
    expect(squareRoot(0)).toBe(0);
  });

  test('square root of a negative number throws an error', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed.');
  });
});
