export interface WeatherPeriod {
    detailedForecast: string;
    endTime: string;
    isDaytime: boolean;
    name: string;
    number: number;
    probabilityOfPrecipitation: {
      unitCode: string;
      value: number | null;
    };
    relativeHumidity: {
      unitCode: string;
      value: number | null;
    };
    shortForecast: string;
    startTime: string;
    temperature: number;
    temperatureUnit: string;
    windDirection: string;
    windSpeed: string;
    maxTemperature: number;
    minTemperature: number;
    minMaxTemperatureUnit: string;
  }