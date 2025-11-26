/**
 * My fancy calculator.
 */
export class Calculator {
  constructor() {
    console.log("Calculator created");
  }

  getNumber(number) {
    return parseFloat(number);
  }

  /**
   * Adds to numbers.
   *
   * @param {string|number} sum1 the first summand
   * @param {string|number} sum2 the second summand
   * @returns {number} the sum
   */
  add(sum1, sum2) {
    return this.getNumber(sum1) + this.getNumber(sum2);
  }

  /**
   * Substracts two numbers.
   *
   * @param {string|number} minuend the minuend
   * @param {string|number} subtrahend the subtrahend
   * @returns {number} the result
   */
  minus(minuend, subtrahend) {
    return this.getNumber(minuend) - this.getNumber(subtrahend);
  }
}

console.log("calculator.js");
