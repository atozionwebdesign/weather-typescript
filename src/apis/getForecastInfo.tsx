export async function getForecastInfo(latLon: { lat: string; lon: string }) {
  const config = {
    method: "GET",
  };

  try {
    return window
      .fetch(
        `${process.env.REACT_APP_FORECAST_API_URL}${latLon.lat},${latLon.lon}`,
        config
      )
      .then(async (response) => {
        if (response.ok) {
          const url = await response.json();
          const relativeLocation = url.properties.relativeLocation;

          let sData = await fetch(url.properties.observationStations);
          const stations = await sData.json();

          const station = stations.observationStations[0];
          let cdata = await fetch(`${station}/observations/latest`);
          const currentData = await cdata.json();

          console.log(url);
          let tdata = await fetch(url.properties.forecastGridData);
          const tempData = await tdata.json();

          let fdata = await fetch(url.properties.forecast);
          const forecastData = await fdata.json();

          return Promise.resolve({
            tdata: tempData,
            fdata: forecastData,
            cdata: currentData,
            relativeLocation: relativeLocation,
          });
        } else {
          const errorMessage = await response.text();
          return Promise.reject(new Error(errorMessage));
        }
      });
  } catch {
    return "Data not available";
  }
}
