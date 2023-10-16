export async function getGeoInfo(query:string) {
    const config = {
      method: "GET",
    };

    try {
      return window
        .fetch(`${process.env.REACT_APP_GEOCODING_API_URL}?q=${query}`, config)
        .then(async (response) => {
          if (response.ok) {
            return Promise.resolve(response.json())
          } else {
            const errorMessage = await response.text();
            return Promise.reject(new Error(errorMessage));
          }
        });
    } catch {
      return "Data not available";
    }
  }
