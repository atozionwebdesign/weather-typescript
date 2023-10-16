const INITIAL_STATE = {
    location: {
        lat: "38.46565191929177",
        lon: "-77.44120781036537"
    },
  }

  const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
      case 'UPDATE_LOCATION':
        return {
            location: action.location
        };
        default : return {
            ...state
        }
    }
  }

export default rootReducer;