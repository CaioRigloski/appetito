export type weekInfo = {
  day: number;
  date: number;
  monthNumber?: number;
  monthName?: string;
}

export default interface Week {
  index: number;
  dateInfo?: weekInfo[];
}