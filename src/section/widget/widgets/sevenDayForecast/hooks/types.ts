export type ResultData = {
  location: string;
  headerTemp: number;

  headerIconCode?: number;
  headerIconUrl?: string;

  headerTitle: string;
  days: Day[];
};

export type Day = {
  dateTime: number;

  dayIconCode?: string;
  nighIconCode?: string;
  dayIconUrl?: string;
  nighIconUrl?: string;

  title?: string;
  hiTemp: number;
  lowTemp: number;
  precipitation?: number;
  wind: number;
  windDirection: string;
  humidity: number;
  ultraviolet?: string;
};
