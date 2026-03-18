#!/usr/bin/env node

/**
 * Basic calculator operations supported by this CLI:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x)
 * - division (/)
 * - modulo (%)
 * - power (^)
 * - square root (sqrt)
 */

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(n);
}

function normalizeOperation(operation) {
  const operations = {
    "+": "addition",
    add: "addition",
    addition: "addition",
    "-": "subtraction",
    subtract: "subtraction",
    subtraction: "subtraction",
    "*": "multiplication",
    x: "multiplication",
    multiply: "multiplication",
    multiplication: "multiplication",
    "/": "division",
    divide: "division",
    division: "division",
    "%": "modulo",
    mod: "modulo",
    modulo: "modulo",
    "^": "power",
    pow: "power",
    power: "power",
    sqrt: "squareRoot",
    squareroot: "squareRoot",
    "square-root": "squareRoot"
  };

  return operations[operation];
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}". Please provide a valid number.`);
  }

  return parsedValue;
}

function printUsage() {
  console.log("Usage: node src/calculator.js <operation> <a> [b]");
  console.log(
    "Supported operations: addition (+), subtraction (-), multiplication (*, x), division (/), modulo (%), power (^), squareRoot (sqrt)"
  );
  console.log("Use one operand for squareRoot and two operands for the other operations.");
}

function runCli(argv) {
  if (argv.length < 2 || argv.length > 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [rawOperation, rawA, rawB] = argv;
  const operation = normalizeOperation(rawOperation);

  if (!operation) {
    console.error(`Unsupported operation: "${rawOperation}".`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  const operandCount = operation === "squareRoot" ? 1 : 2;

  if (argv.length !== operandCount + 1) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const a = parseNumber(rawA, operandCount === 1 ? "operand" : "first operand");

  const operationHandlers = {
    addition,
    subtraction,
    multiplication,
    division,
    modulo,
    power,
    squareRoot
  };

  const result =
    operandCount === 1
      ? operationHandlers[operation](a)
      : operationHandlers[operation](a, parseNumber(rawB, "second operand"));

  console.log(result);
}

if (require.main === module) {
  runCli(process.argv.slice(2));
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot
};
