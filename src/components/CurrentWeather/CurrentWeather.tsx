import { Card } from "react-bootstrap";
import "./CurrentWeather.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Animation from `../../assets/animations/girl-day-rain.gif`;

const CurrentWeather = ({weather, date, relativeLocation}: any) => {

  const forecast = weather.shortForecast;
  const location = `${relativeLocation.properties.city}, ${relativeLocation.properties.state}`;

  //Import all files from Animation folder into files array
  const files: string[] =[];

  const importAnimations = (r:any) => {
    r.keys().forEach((f:string) => {

      const fileName = f.split('/').pop() as string;
      files.push(fileName);
    })
  }

  const animations = importAnimations(require.context(`${process.env.REACT_APP_ASSETS_FOLDER}/animations`,false,/[\s\S]*/));

  const getAnimation = () => {
    const name = files[0];
    const file = require(`${process.env.REACT_APP_ASSETS_FOLDER}/animations/${name}`);

    let animation = (<Card.Img variant="left" src={file} className="largeIcon" />)

    return animation;
  }
  return (
    <Card className="cardDetailedView">
      <Card.Body>
        <div className="row">
          <div className="col-4">
          <strong>{location}</strong> <br/>
            {getAnimation()}
            {weather.maxTemperature < 200 && weather.minTemperature < 200 ? (
              <div>
                <small className="bold">
                  {weather.maxTemperature}°{weather.minMaxTemperatureUnit} |{" "}
                  {weather.minTemperature}°{weather.minMaxTemperatureUnit}
                </small>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="col-8">
            <Card.Title>
              {date} ({weather.isDaytime ? "Day" : "Night"})
            </Card.Title>
            <Card.Text>{weather.detailedForecast}</Card.Text>
            <div className="row">
                <div className="col">
                <FontAwesomeIcon icon={['fas', 'cloud-rain']} /> Precipitation
                   <h5>{weather.probabilityOfPrecipitation.value ? weather.probabilityOfPrecipitation.value : "0%"}</h5>
                </div>
                <div className="col">
                <FontAwesomeIcon icon={['fas', 'droplet']} /> Humidity
                    <h5>{weather.relativeHumidity.value ? weather.relativeHumidity.value + "%": ""}</h5>
                </div>
                <div className="col">
                <FontAwesomeIcon icon={['fas', 'wind']} /> Wind Speed
                    <h5>{weather.windSpeed ? weather.windDirection + " " + weather.windSpeed : ""}</h5>
                </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrentWeather;
