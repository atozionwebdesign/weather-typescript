import Lottie from "react-lottie";
import { Card } from "react-bootstrap";
import "./CurrentWeather.css";
import { defaultLottieOptions } from "../../utils/Helpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Animation from `../../assets/animations/girl-day-rain.gif`;

const CurrentWeather = ({
  weather,
  date,
  relativeLocation,
  animation,
}: any) => {
  const forecast = weather.shortForecast;
  const location = `${relativeLocation.properties.city}, ${relativeLocation.properties.state}`;

  return (
    <Card
      className="cardDetailedView gradient-border fadeIn"
      key={weather.number}
    >
      <Card.Body>
        <div
          className="row"
          style={{
            textAlign: "left",
            padding: "10px 0 0 0",
            height: "40px",
            flex: "none",
          }}
        >
          <div className="col-5" style={{ flex: "auto" }}>
            <Card.Title>{location}</Card.Title>
          </div>
          <div className="col-7" style={{ textAlign: "right", flex: "auto" }}>
            {/* <strong> */}{" "}
            <p className="p-small" style={{ marginBottom: 0 }}>
              {date} | {weather.isDaytime ? "Day" : "Night"}
            </p>
            {/* </strong> */}
          </div>
        </div>

        <div className="row" style={{ flex: "1 1 auto" }}>
          <div className="col-3">
            <div id="lottieDiv"
              style={{
                height: "25vh",
                margin: "0 auto",
                width: "15vw",
                textAlign: "center",
              }}
            >
              <Lottie options={defaultLottieOptions(animation)} />
            </div>
            {/* <p className="p-small">{weather.shortForecast}</p> */}
          </div>
          <div className="col-9" style={{ textAlign: "right" }}>
            <h1 style={{ marginBottom: 0 }}>
              {weather.temperature}°{weather.temperatureUnit}
            </h1>
            {weather.maxTemperature < 200 && weather.minTemperature < 200 ? (
              <div style={{ marginTop: 0 }}>
                <p className="bold p-small" style={{ marginBottom: 0 }}>
                  {weather.maxTemperature}°{weather.minMaxTemperatureUnit} |{" "}
                  {weather.minTemperature}°{weather.minMaxTemperatureUnit}
                </p>
              </div>
            ) : (
              ""
            )}
            <Card.Text>{weather.detailedForecast}</Card.Text>
            <div style={{ textAlign: "right" }}>
              {/* <div> */}
              <FontAwesomeIcon
                icon={["fas", "cloud-rain"]}
                style={{ display: "inline-block" }}
              />{" "}
              <p style={{ display: "inline-block", marginRight: "20px" }}>
                {weather.probabilityOfPrecipitation.value
                  ? `${weather.probabilityOfPrecipitation.value}%`
                  : "0%"}
              </p>
              {/* </div> */}
              {/* <div> */}
              <FontAwesomeIcon icon={["fas", "wind"]} />{" "}
              <p style={{ display: "inline-block" }}>
                {weather.windSpeed
                  ? weather.windDirection + " " + weather.windSpeed
                  : ""}
              </p>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrentWeather;
