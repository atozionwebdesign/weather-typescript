export async function getForecastInfo(latLon:{lat:string,lon:string}) {
  const config = {
    method: "GET",
  };

  try {
    return window
      .fetch(`${process.env.REACT_APP_FORECAST_API_URL}${latLon.lat},${latLon.lon}`, config)
      .then(async (response) => {
        if (response.ok) {
          const url = await response.json();
          const relativeLocation = url.properties.relativeLocation;

          let tdata = await fetch(url.properties.forecastGridData);
          tdata = await tdata.json();

          let fdata = await fetch(url.properties.forecast);
          fdata = await fdata.json();

          return Promise.resolve({ tdata:tdata, fdata:fdata, relativeLocation: relativeLocation });
        } else {
          const errorMessage = await response.text();
          return Promise.reject(new Error(errorMessage));
        }
      });
  } catch {
    return "Data not available";
  }
}
