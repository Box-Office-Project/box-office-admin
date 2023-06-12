export function compareDate(aDate: Date, bDate: Date) {
  if (aDate === bDate) return 0;
  return aDate.getTime() < bDate.getTime() ? -1 : 1;
}

export function dateTimeParser(datetime: string) {
  const [date, time] = datetime.split("T");
  return `${date} ${time}:00`;
}

export const isShowing: (
  startDate: string,
  endDate: string
) => "예매중" | "마감" | "상영중" = (startDate, endDate) => {
  const timeNow = new Date();
  if (compareDate(timeNow, new Date(startDate)) < 0) {
    return "예매중";
  } else if (compareDate(new Date(endDate), timeNow) < 0) {
    return "마감";
  }
  return "상영중";
};
