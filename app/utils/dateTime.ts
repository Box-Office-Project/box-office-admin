export function compareDate(aDate: Date, bDate: Date) {
  if (aDate === bDate) return 0;
  return aDate.getTime() < bDate.getTime() ? -1 : 1;
}
