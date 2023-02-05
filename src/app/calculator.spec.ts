import { Calculator } from './calculator';

describe('Calculator test', () => {
  it('multiply 2 * 3 should be 6', () => {
    const calculator = new Calculator();
    const result = calculator.multiply(2, 3);
    expect(result).toBe(6);
  });

  it('divide 2 / 3 should be 0.6666666666666666', () => {
    const calculator = new Calculator();
    const result = calculator.divide(4, 2);
    expect(result).toBe(2);
  });

  it('divide 2 / 0 should be null', () => {
    const calculator = new Calculator();
    const result = calculator.divide(2, 0);
    expect(result).toBeNull();
  });

    it('add 2 + 3 should be 5', () => {
        const calculator = new Calculator();
        const result = calculator.add(2, 3);
        expect(result).toBe(5);
    })

    it('subtract 2 - 3 should be -1', () => {
        const calculator = new Calculator();
        const result = calculator.subtract(2, 3);
        expect(result).toBe(-1);
    })
});
