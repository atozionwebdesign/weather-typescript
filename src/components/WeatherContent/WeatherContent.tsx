import { useState, useEffect } from "react";
import { Table, Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { store } from "../../store";
/**********APIs & Helpers************/
import { getForecastInfo } from "../../apis/getForecastInfo";
/****** STYLES ******/
import "./WeatherContent.css";
import "react-multi-carousel/lib/styles.css";

/****** ANIMATIONS   ******/
import * as partlyCloudyNight from "../../assets/animations/weather/partly-cloudy-night.json";
import * as partlyCloudyDay from "../../assets/animations/weather/partly-cloudy-day.json";
import * as thunderstorms from "../../assets/animations/weather/thunderstorms.json";
import * as rain from "../../assets/animations/weather/rain.json";
import * as sunny from "../../assets/animations/weather/sunny.json";
import * as cloudy from "../../assets/animations/weather/cloudy.json";
import * as clearNight from "../../assets/animations/weather/clear-night.json";
import * as clearDay from "../../assets/animations/weather/clear-day.json";
/****** CHILD COMPONENTS // INTERFACES *****/
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import { WeatherPeriod } from "../../models/WeatherPeriod";
import { Image } from "react-bootstrap";

const WeatherContent = () => {
  const [forecast, setForecast] = useState<WeatherPeriod[]>([]);
  const [currentForecast, setCurrentForecast] = useState<WeatherPeriod>();
  const [relativeLocation, setRelativeLocation] = useState();

  interface StringIndexedObject {
    [key: string]: { icon: JSX.Element; animation: any };
  }

  const graphics: StringIndexedObject = {
    thunderstorms: {
      icon: (
        <img
          src={require("../../assets/icons/weather/thunderstorms.svg").default}
          alt=""
          className="icon"
        />
      ),
      animation: thunderstorms,
    },
    rain: {
      icon: (
        <img
          src={require("../../assets/icons/weather/rain.svg").default}
          alt=""
          className="icon"
        />
      ),
      animation: rain,
    },
    partlyCloudyDay: {
      icon: (
        <img
          src={
            require("../../assets/icons/weather/partly-cloudy-day.svg").default
          }
          alt=""
          className="icon"
        />
      ),
      animation: partlyCloudyDay,
    },
    partlyCloudyNight: {
      icon: (
        <img
          src={
            require("../../assets/icons/weather/partly-cloudy-night.svg")
              .default
          }
          alt=""
          className="icon"
        />
      ),
      animation: partlyCloudyNight,
    },
    cloudy: {
      icon: (
        <img
          src={require("../../assets/icons/weather/cloudy.svg").default}
          alt=""
          className="icon"
        />
      ),
      animation: cloudy,
    },
    sunny: {
      icon: (
        <img
          src={require("../../assets/icons/weather/sunny.svg").default}
          alt=""
          className="icon"
        />
      ),
      animation: sunny,
    },
    clearNight: {
      icon: (
        <img
          src={require("../../assets/icons/weather/clear-night.svg").default}
          alt=""
          className="icon"
        />
      ),
      animation: clearNight,
    },
    clearDay: {
      icon: (
        <img
          src={require("../../assets/icons/weather/clear-day.svg").default}
          alt=""
          className="icon"
        />
      ),
      animation: clearDay,
    },
  };

  useEffect(() => {
    callForecastInfo();
  }, [currentForecast]);

  const callForecastInfo = () => {
    const location = store.getState().location;
    try {
      if (!currentForecast) {
        getForecastInfo({ lat: location.lat, lon: location.lon }).then(
          (value: any) => {
            setForecastInfo(
              value.tdata,
              value.fdata,
              value.relativeLocation,
              value.cdata
            );
          }
        );
      }
    } catch {
      return "Data not available";
    }
  };

  const subscribe = store.subscribe(callForecastInfo);

  const setForecastInfo = (
    tdata: any,
    fdata: any,
    relativeLocation: any,
    cdata: any
  ) => {
    setRelativeLocation(relativeLocation);

    let forecastData = fdata.properties.periods;
    let currentForecast = cdata.properties;
    let currentTemp = {
      unit: currentForecast.temperature.unitCode.at(-1),
      value: currentForecast.temperature.value,
    };

    if (currentTemp.unit === "C") {
      currentTemp.value = convertToFarenheit(currentTemp.value);
      currentTemp.unit = "F";
    }

    let maxTemps = {
      unit: tdata.properties.maxTemperature.uom,
      values: tdata.properties.maxTemperature.values,
    };

    let minTemps = {
      unit: tdata.properties.minTemperature.uom,
      values: tdata.properties.minTemperature.values,
    };

    let maxTempsValues = maxTemps.values;
    let maxTempsUnit = maxTemps.unit.at(-1);
    let minTempsValues = minTemps.values;
    let minTempsUnit = minTemps.unit.at(-1);

    // let currentTime = currentForecast.timestamp;

    let forecast = forecastData.map((p: WeatherPeriod) => {
      let temp = () => {
        if (p.number === 1) {
          return currentTemp;
        } else {
          return {
            unit: p.temperatureUnit,
            value: p.temperature,
          };
        }
      };

      let pDate = p.startTime.substring(0, p.startTime.indexOf("T"));

      let i = maxTempsValues.find((x: any) => {
        return x.validTime.substring(0, x.validTime.indexOf("T")) === pDate;
      });

      let maxTemp = i.value;

      let j = minTempsValues.find((y: any) => {
        return y.validTime.substring(0, y.validTime.indexOf("T")) === pDate;
      });

      let minTemp;
      j ? (minTemp = j.value) : (minTemp = 1000);

      if (maxTempsUnit === "C" || minTempsUnit === "C") {
        maxTemp = convertToFarenheit(maxTemp);
        minTemp = convertToFarenheit(minTemp);
      }

      maxTemp = Math.round(maxTemp);
      minTemp = Math.round(minTemp);

      return {
        detailedForecast: p.detailedForecast,
        endTime: p.endTime,
        isDaytime: p.isDaytime,
        name: p.name,
        number: p.number,
        probabilityOfPrecipitation: {
          unitCode: p.probabilityOfPrecipitation.unitCode,
          value: p.probabilityOfPrecipitation.value,
        },
        relativeHumidity: {
          // uom: p.relativeHumidity.uom,
          // value: p.relativeHumidity.value,
        },
        shortForecast: p.shortForecast,
        startTime: p.startTime,
        temperature: Math.round(Number(temp().value)),
        temperatureUnit: temp().unit,
        windDirection: p.windDirection,
        windSpeed: p.windSpeed,
        maxTemperature: maxTemp,
        minTemperature: minTemp,
        minMaxTemperatureUnit: "F",
      } as WeatherPeriod;
    });

    setForecast(forecast);
    setCurrentForecast(forecast[0]);
  };

  const updateCurrentForecast = (i: number) => {
    i = i - 1;
    setCurrentForecast(forecast[i]);
  };

  const convertToFarenheit = (t: number) => {
    let temp = t * (9 / 5) + 32;

    return temp;
  };

  const formatDate = (p: WeatherPeriod) => {
    let date = p.startTime;
    const d = new Date(date).toLocaleDateString("en-us", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return d;
  };

  const iconSwitch = (p: WeatherPeriod) => {
    let sForecast = p.shortForecast;
    let graphic = "";

    sForecast?.includes("Thunderstorms")
      ? (graphic = "thunderstorms")
      : sForecast?.includes("Rain")
      ? (graphic = "rain")
      : sForecast?.includes("Cloudy")
      ? sForecast?.includes("Partly Cloudy")
        ? p.isDaytime
          ? (graphic = "partlyCloudyDay")
          : (graphic = "partlyCloudyNight")
        : (graphic = "cloudy")
      : sForecast?.includes("Sunny") && p.isDaytime
      ? (graphic = "sunny")
      : !p.isDaytime
      ? (graphic = "clearNight")
      : (graphic = "clearDay");

    return graphic;
  };

  return (
    <div className="weather-content">
      <div className="content">
        {currentForecast !== undefined ? (
          <>
            <CurrentWeather
              key={currentForecast.number}
              weather={currentForecast}
              date={formatDate(currentForecast)}
              relativeLocation={relativeLocation}
              animation={graphics[iconSwitch(currentForecast)].animation}
            />
          </>
        ) : (
          "Data Loading"
        )}
      </div>
      <div id="forecastTableDiv">
        <Table id="forecastTable">
          <tbody>
            {forecast.map((period) => (
              <tr
                onClick={() => updateCurrentForecast(period.number)}
                className={
                  currentForecast?.number === period.number ? "selected" : ""
                }
              >
                <td style={{ width: "10%" }}>
                  <p className="p-small">
                    {formatDate(period).slice(
                      0,
                      formatDate(period).lastIndexOf(",")
                    )}
                  </p>
                </td>

                <td style={{ width: "10%" }}>
                  {period.maxTemperature < 200 &&
                  period.minTemperature < 200 ? (
                    <p style={{ marginTop: 0 }}>
                      <strong>
                        {period.maxTemperature}°{period.minMaxTemperatureUnit}
                      </strong>{" "}
                      <span className="p-small">
                        | {period.minTemperature}°{period.minMaxTemperatureUnit}
                      </span>
                    </p>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {graphics[iconSwitch(period)].icon}
                  <p className="p-small" style={{ display: "inline-block" }}>
                    {period.shortForecast}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default WeatherContent;
