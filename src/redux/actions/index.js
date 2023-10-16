
export function updateLocation({lat,lon}) {
  return {
    type: "UPDATE_LOCATION",
    location: {
      lat: lat,
      lon: lon
    }
  }
}