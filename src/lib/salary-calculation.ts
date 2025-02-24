import { PaymentInterval } from '@/users/users.interface';

export function calculateSalaryPerSecond(
  amount: number,
  paymentInterval: PaymentInterval,
  workedHoursPerWeek: number,
): number {
  const MONTHS_PER_YEAR = 12;
  const SECONDS_PER_HOUR = 3600;
  const workedHoursPerMonth = workedHoursPerWeek * 4;
  switch (paymentInterval) {
    case PaymentInterval.Hour: {
      return amount / SECONDS_PER_HOUR;
    }
    case PaymentInterval.Month: {
      return amount / workedHoursPerMonth / SECONDS_PER_HOUR;
    }
    case PaymentInterval.Year: {
      const workedHoursPerYear = workedHoursPerMonth * MONTHS_PER_YEAR;
      return amount / workedHoursPerYear / SECONDS_PER_HOUR;
    }
  }
}
