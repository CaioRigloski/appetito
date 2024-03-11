import { StaticImageData } from "next/image";

export default interface Item {
  name: string;
  description: string;
  image: StaticImageData;
}