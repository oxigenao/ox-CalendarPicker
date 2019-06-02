export function getFirstDayOfMonth(month, year): number {
  return new Date(year, month, 1).getDay() - 1;
}

export function getLastDayOfMonth(month, year): number {
  return new Date(year, month + 1, 1).getDay() - 2;
}
