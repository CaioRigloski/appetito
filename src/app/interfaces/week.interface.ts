export type weekInfo = {
  day: number;
  date: number;
}

export default interface Week {
  index: number;
  dateInfo?: weekInfo[];
}