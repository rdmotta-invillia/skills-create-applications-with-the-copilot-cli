/**
 * Calculator CLI - Node.js CLI Calculator
 *
 * Supported operations:
 *   - addition:       add two numbers (a + b)
 *   - subtraction:    subtract b from a (a - b)
 *   - multiplication: multiply two numbers (a * b)
 *   - division:       divide a by b (a / b) — throws on division by zero
 *   - modulo:         remainder of a divided by b (a % b) — throws on division by zero
 *   - power:          raise base to exponent (base ^ exponent)
 *   - squareRoot:     square root of n — throws on negative input
 */

'use strict';

/**
 * Returns the sum of a and b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function addition(a, b) {
  return a + b;
}

/**
 * Returns the difference of a minus b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function subtraction(a, b) {
  return a - b;
}

/**
 * Returns the product of a and b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function multiplication(a, b) {
  return a * b;
}

/**
 * Returns the quotient of a divided by b.
 * Throws an error if b is zero.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function division(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

/**
 * Returns the remainder of a divided by b (modulo operation).
 * Throws an error if b is zero.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

/**
 * Returns base raised to the power of exponent.
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Returns the square root of n.
 * Throws an error if n is negative.
 * @param {number} n
 * @returns {number}
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(n);
}

// ─── CLI helpers ────────────────────────────────────────────────────────────

/**
 * Maps CLI operation aliases/symbols to canonical function names.
 * @param {string} op
 * @returns {string|null}
 */
function normalizeOperation(op) {
  const map = {
    '+': 'addition',
    add: 'addition',
    addition: 'addition',
    '-': 'subtraction',
    subtract: 'subtraction',
    subtraction: 'subtraction',
    '*': 'multiplication',
    x: 'multiplication',
    multiply: 'multiplication',
    multiplication: 'multiplication',
    '/': 'division',
    divide: 'division',
    division: 'division',
    '%': 'modulo',
    mod: 'modulo',
    modulo: 'modulo',
    '^': 'power',
    pow: 'power',
    power: 'power',
    exponentiation: 'power',
    sqrt: 'squareRoot',
    squareroot: 'squareRoot',
    squareRoot: 'squareRoot',
    'square-root': 'squareRoot',
  };
  return map[op.toLowerCase()] || map[op] || null;
}

/**
 * Parses a CLI argument as a finite number.
 * @param {string} value
 * @param {string} label
 * @returns {number}
 */
function parseNumber(value, label) {
  const n = Number(value);
  if (!isFinite(n)) {
    throw new Error(`Invalid number for ${label}: "${value}"`);
  }
  return n;
}

function printUsage() {
  console.log(`
Usage: node src/calculator.js <operation> <a> [b]

Operations:
  addition (+)        add a + b
  subtraction (-)     a - b
  multiplication (*,x) a * b
  division (/)        a / b
  modulo (%, mod)     a % b
  power (^, pow)      a ^ b
  squareRoot (sqrt)   sqrt(a)

Examples:
  node src/calculator.js addition 2 3
  node src/calculator.js / 20 5
  node src/calculator.js sqrt 16
`);
}

/**
 * Runs the CLI using the provided argument list (defaults to process.argv).
 * @param {string[]} argv
 */
function runCli(argv) {
  const args = (argv || process.argv).slice(2);

  if (args.length < 1) {
    printUsage();
    process.exit(1);
  }

  const opName = normalizeOperation(args[0]);
  if (!opName) {
    console.error(`Unknown operation: "${args[0]}"`);
    printUsage();
    process.exit(1);
  }

  let result;

  try {
    if (opName === 'squareRoot') {
      if (args.length < 2) {
        console.error('squareRoot requires one operand.');
        process.exit(1);
      }
      const a = parseNumber(args[1], 'a');
      result = squareRoot(a);
    } else {
      if (args.length < 3) {
        console.error(`${opName} requires two operands.`);
        process.exit(1);
      }
      const a = parseNumber(args[1], 'a');
      const b = parseNumber(args[2], 'b');

      switch (opName) {
        case 'addition':
          result = addition(a, b);
          break;
        case 'subtraction':
          result = subtraction(a, b);
          break;
        case 'multiplication':
          result = multiplication(a, b);
          break;
        case 'division':
          result = division(a, b);
          break;
        case 'modulo':
          result = modulo(a, b);
          break;
        case 'power':
          result = power(a, b);
          break;
      }
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  console.log(result);
}

module.exports = { addition, subtraction, multiplication, division, modulo, power, squareRoot };

if (require.main === module) {
  runCli(process.argv);
}
