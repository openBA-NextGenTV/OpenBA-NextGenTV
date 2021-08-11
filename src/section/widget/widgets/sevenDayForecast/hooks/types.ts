export type ResultData = {
  city: string;
  state: string;
  headerTemp: number;
  headerImage: number;
  headerTitle: string;
  days: Day[];
};

export type Day = {
  dateTime: number;
  image: number;
  title: string;
  hiTemp: number;
  lowTemp: number;
  precipitation: number;
  wind: number;
  windDirection: string;
  humidity: number;
  ultraviolet: string;
};
