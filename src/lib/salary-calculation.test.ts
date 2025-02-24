import { calculateSalaryPerSecond } from './salary-calculation';
import { PaymentInterval } from '@/users/users.interface';

describe('calculateSalaryPerSecond', () => {
  it('should calculate salary per second for hourly payment interval', () => {
    const amount = 3600; // $3600 per hour
    const paymentInterval = PaymentInterval.Hour;
    const workedHoursPerWeek = 40;
    const result = calculateSalaryPerSecond(
      amount,
      paymentInterval,
      workedHoursPerWeek,
    );
    expect(result).toBe(1); // $1 per second
  });

  it('should calculate salary per second for monthly payment interval', () => {
    const amount = 7200; // $7200 per month
    const paymentInterval = PaymentInterval.Month;
    const workedHoursPerWeek = 40;
    const result = calculateSalaryPerSecond(
      amount,
      paymentInterval,
      workedHoursPerWeek,
    );
    expect(result).toBeCloseTo(0.0125, 4); // $0.0125 per second
  });

  it('should calculate salary per second for yearly payment interval', () => {
    const amount = 86400; // $86400 per year
    const paymentInterval = PaymentInterval.Year;
    const workedHoursPerWeek = 40;
    const result = calculateSalaryPerSecond(
      amount,
      paymentInterval,
      workedHoursPerWeek,
    );
    expect(result).toBeCloseTo(0.0125, 5); // $0.04167 per second
  });
});
