#!/usr/bin/env node

/**
 * Basic calculator operations supported by this CLI:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x)
 * - division (/)
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
    division: "division"
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
  console.log("Usage: node src/calculator.js <operation> <a> <b>");
  console.log("Supported operations: addition (+), subtraction (-), multiplication (*, x), division (/)");
}

function runCli(argv) {
  if (argv.length !== 3) {
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

  const a = parseNumber(rawA, "first operand");
  const b = parseNumber(rawB, "second operand");

  const operationHandlers = {
    addition,
    subtraction,
    multiplication,
    division
  };

  const result = operationHandlers[operation](a, b);
  console.log(result);
}

if (require.main === module) {
  runCli(process.argv.slice(2));
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division
};
