import Hour from "./hour.interface";

export type Ante = "AM"
export type Post = "PM"

export default interface BookingDate {
  month?: string;
  dayName?: string;
  day?: number;
  hour?: Hour
  period?: Ante | Post
}