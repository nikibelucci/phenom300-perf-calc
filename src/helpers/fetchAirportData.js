import axios from "axios";

const fetchAirportData = async icaoCode => {
  try {
    const navData = await axios
      .get(`https://api.flightplandatabase.com/nav/airport/${icaoCode}`)
      .then(response => {
        //helper to find longest rwys in rwy array
        const maxRwyLength = Math.max.apply(
          Math,
          response.data.runways.map(rwy => rwy.length)
        );

        const maxLengthRwy = response.data.runways.filter(
          rwy => rwy.length == maxRwyLength
        );

        //return structured navData object

        return {
          icao: response.data.ICAO,
          iata: response.data.IATA,
          name: response.data.name,
          rwys: response.data.runways.map(rwy => {
            return {
              ident: rwy.ident,
              length: rwy.length.toFixed(0),
              surface: rwy.surface
            };
          }),
          elevation: response.data.elevation,
          longestRwy: maxLengthRwy.map(rwy => {
            return {
              ident: rwy.ident,
              length: rwy.length.toFixed(0),
              surface: rwy.surface
            };
          }),
          longestRwyLength: maxRwyLength.toFixed(0)
        };
      });

    const weatherData = await axios
      .get(`https://api.checkwx.com/metar/${icaoCode}/decoded`, {
        headers: { 
        "X-API-Key": process.env.WX_APIKEY ,
        "Access-Control-Allow-Origin": '*'
      }
      })
      .then(async response => {
        const icaoCodeChecker = icaoCode.toUpperCase();
        if (
          response.data.data.includes(
            `${icaoCodeChecker} METAR Currently Unavailable`
          ) || response.data.results === 0
        ) {
          const weatherAlternate = await axios
            .get(
              `https://api.checkwx.com/metar/${icaoCode}/radius/100/decoded`,
              {
                headers: { 
                "X-API-Key": process.env.WX_APIKEY,
                "Access-Control-Allow-Origin": '*'
              }
              }
            )
            .then(alternate => {
              return {
                isAlternate: true,
                distance: alternate.data.data[0].radius.miles * 0.868976242,
                icao: alternate.data.data[0].icao,
                metar: alternate.data.data[0].raw_text,
                temp: alternate.data.data[0].temperature.celsius,
                qnh: alternate.data.data[0].barometer.mb,
                wx_category: alternate.data.data[0].flight_category
              };
            });
          return {
            ...weatherAlternate
          };
        } else {
          return {
            icao: response.data.data[0].icao,
            metar: response.data.data[0].raw_text,
            temp: response.data.data[0].temperature.celsius,
            qnh: response.data.data[0].barometer.mb,
            wx_category: response.data.data[0].flight_category
          };
        }
      });

    const airportData = {
      navData,
      weatherData
    };
    //console.log("airportData", airportData);
    return airportData;
  } catch (error) {
    error => console.log(error);
  }
};

export default fetchAirportData;
