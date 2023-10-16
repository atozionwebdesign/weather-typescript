import { useState, useEffect } from "react";
import Card from "react-bootstrap/card";
import Carousel from "react-multi-carousel";
import { store } from "../../store";
/**********APIs & Helpers************/
import { getForecastInfo } from "../../apis/getForecastInfo";
/****** STYLES ******/
import "./WeatherContent.css";
import "react-multi-carousel/lib/styles.css";
/****** ICONS/Images ******/
import Sunny from "../../assets/icons/clear-day.svg";
import Rain from "../../assets/icons/rain.svg";
import Thunderstorm from "../../assets/icons/thunderstorms-rain.svg";
import Cloudy from "../../assets/icons/cloudy.svg";
import PartlyCloudyDay from "../../assets/icons/partly-cloudy-day.svg";
import PartlyCloudyNight from "../../assets/icons/partly-cloudy-night.svg";
import ClearDay from "../../assets/icons/clear-day.svg";
import ClearNight from "../../assets/icons/clear-night.svg";
import Cloud from "../../assets/images/cloud.png";
/****** CHILD COMPONENTS // INTERFACES *****/
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import { WeatherPeriod } from "../../models/WeatherPeriod";
import { Image } from "react-bootstrap";

const WeatherContent = () => {
  const [forecast, setForecast] = useState<WeatherPeriod[]>([]);
  const [currentForecast, setCurrentForecast] = useState<WeatherPeriod>();
  const [relativeLocation, setRelativeLocation] = useState();

  useEffect(() => {
    callForecastInfo();
  }, [currentForecast]);

  const callForecastInfo = () => {
    const location = store.getState().location;
    try {
      if (!currentForecast) {
        getForecastInfo({ lat: location.lat, lon: location.lon }).then(
          (value: any) => {
            setForecastInfo(value.tdata, value.fdata, value.relativeLocation);
          }
        );
      }
    } catch {
      return "Data not available";
    }
  };

  const subscribe = store.subscribe(callForecastInfo);

  const setForecastInfo = (tdata: any, fdata: any, relativeLocation: any) => {
    setRelativeLocation(relativeLocation);

    let forecastData = fdata.properties.periods;

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

    let forecast = forecastData.map((p: WeatherPeriod) => {
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
        let temps = convertToFarenheit(maxTemp, minTemp);
        maxTemp = temps.max;
        minTemp = temps.min;
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
          unitCode: p.relativeHumidity.unitCode,
          value: p.relativeHumidity.value,
        },
        shortForecast: p.shortForecast,
        startTime: p.startTime,
        temperature: p.temperature,
        temperatureUnit: p.temperatureUnit,
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

  const convertToFarenheit = (max: number, min: number) => {
    let temps = {
      max: max * (9 / 5) + 32,
      min: min * (9 / 5) + 32,
    };

    return temps;
  };

  const formatDate = (p: WeatherPeriod) => {
    let date = p.startTime;
    const d = new Date(date).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return d;
  };

  const iconSwitch = (p: WeatherPeriod) => {
    let sForecast = p.shortForecast;
    let icon = <img alt="icon" />;

    sForecast?.includes("Thunderstorms")
      ? (icon = (
          <img
            className="icon card-img-top"
            src={Thunderstorm}
            alt="Thunderstorms"
          />
        ))
      : sForecast?.includes("Rain")
      ? (icon = <img className="icon card-img-top" src={Rain} alt="Rain" />)
      : sForecast?.includes("Cloudy")
      ? sForecast?.includes("Partly Cloudy")
        ? p.isDaytime
          ? (icon = (
              <img
                className="icon card-img-top"
                src={PartlyCloudyDay}
                alt="Partly Cloudy"
              />
            ))
          : (icon = (
              <img
                className="icon card-img-top"
                src={PartlyCloudyNight}
                alt="Partly Cloudy"
              />
            ))
        : (icon = (
            <img className="icon card-img-top" src={Cloudy} alt="Cloudy" />
          ))
      : sForecast?.includes("Sunny") && p.isDaytime
      ? (icon = <img className="icon card-img-top" src={Sunny} alt="Sunny" />)
      : !p.isDaytime
      ? (icon = (
          <img
            className="icon card-img-top"
            src={ClearNight}
            alt="Clear Night"
          />
        ))
      : (icon = (
          <img className="icon card-img-top" src={ClearDay} alt="Clear Day" />
        ));

    return icon;
  };


  const formatLocation = (obj: any) => {
    return `Forecast for ${obj.properties.city}, ${obj.properties.state}`;
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1264 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    laptop: {
      breakpoint: { max: 1264, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="weather-content">
      <div className="detail-div">
        <Image src={Cloud} className="cloud-left" />
        {currentForecast !== undefined ? (
          <>
            <CurrentWeather
              key={currentForecast.number}
              weather={currentForecast}
              date={formatDate(currentForecast)}
              relativeLocation={relativeLocation}
            />
            <h4>
              <strong>{formatLocation(relativeLocation)}</strong>
            </h4>
          </>
        ) : (
          "Data Loading"
        )}
        <Image src={Cloud} className="cloud-right" />
      </div>

      <Carousel
        additionalTransfrom={0}
        responsive={responsive}
        showDots={false}
        keyBoardControl={true}
        slidesToSlide={4}
        swipeable={true}
        draggable={true}
        infinite={true}
      >
        {forecast.map((period) => (
          <Card
            className="cardSimpleView"
            key={period.number}
            onClick={() => updateCurrentForecast(period.number)}
          >
            <Card.Body className="cardBody">
              <div>
                <small>{formatDate(period)}</small>
              </div>
              {iconSwitch(period)}
              <Card.Title>{period.name}</Card.Title>
              <Card.Text>
                {period.temperature + period.temperatureUnit}
              </Card.Text>
              <Card.Text>{period.shortForecast}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default WeatherContent;
