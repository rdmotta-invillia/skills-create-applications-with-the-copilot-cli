const {
  addition,
  subtraction,
  multiplication,
  division
} = require("../calculator");

describe("calculator basic operations", () => {
  describe("addition", () => {
    test("adds the example values from the reference image", () => {
      expect(addition(2, 3)).toBe(5);
    });

    test("adds negative and positive numbers", () => {
      expect(addition(-7, 10)).toBe(3);
    });

    test("adds decimal values", () => {
      expect(addition(2.5, 1.5)).toBe(4);
    });
  });

  describe("subtraction", () => {
    test("subtracts the example values from the reference image", () => {
      expect(subtraction(10, 4)).toBe(6);
    });

    test("returns a negative result when the second operand is larger", () => {
      expect(subtraction(3, 8)).toBe(-5);
    });

    test("subtracts decimal values", () => {
      expect(subtraction(5.5, 2.25)).toBe(3.25);
    });
  });

  describe("multiplication", () => {
    test("multiplies the example values from the reference image", () => {
      expect(multiplication(45, 2)).toBe(90);
    });

    test("multiplies by zero", () => {
      expect(multiplication(99, 0)).toBe(0);
    });

    test("multiplies negative numbers", () => {
      expect(multiplication(-3, 4)).toBe(-12);
    });
  });

  describe("division", () => {
    test("divides the example values from the reference image", () => {
      expect(division(20, 5)).toBe(4);
    });

    test("returns decimal quotients", () => {
      expect(division(7, 2)).toBe(3.5);
    });

    test("throws an error when dividing by zero", () => {
      expect(() => division(10, 0)).toThrow("Division by zero is not allowed.");
    });
  });
});
