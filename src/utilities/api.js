import axios from 'axios';
import parseForecast from './weatherParsing';
import OpenWeather from './openWeather';
 
//API Key in .env file
//
let openWeather = new OpenWeather();
const apiKey=process.env.REACT_APP_WEATHER_KEY;
const getLocation  = async (zip) => {
    const geoUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip='+zip+',US&';
    
        const response = await axios.get(geoUrl+apiKey);
        const location  = {
            name : response.data.name, 
            lat: response.data.lat,
            lng: response.data.lon
        }
       
        //await openWeather.getLatAndLongByZip(zip);
        //replacing with getLocation in openWeather that uses fetch
        await openWeather.getLocation(zip);
        
        //return
        return location;
    
    //needs a return value
    //not the right place for the cartch
   /* catch (error) {
        if (error.response) {
          // 5xx or 4xx error
          console.log("errors incoming");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return error.request.status;
        } else if (error.request) {
          // request never left
          console.log(error.request);
        } else {
         // anything else
          console.log('Error', error.message);
        }
        console.log(error.config);
      };*/

    
};
/*API addresses in openweather documentation and ES6 starting files do not match
URL that does not work with current version of parseWeather
'https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+lng+'&';
URL from ES^ starting files 
https://api.openweathermap.org/data/2.5/forecast?units=imperial& */ 
const getWeather = async (lat, lng) => {
  //openWeather.getWeather(lat,lng);
//const weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat='+lat+'&lon='+lng+'&';
  try { 
    /*
      const weatherResponse = await axios.get(weatherUrl+apiKey);
      console.log ("sent weather request");      
      const parsedWeather = parseForecast(weatherResponse.data.list,weatherResponse.data.timeZoneOffset);
      return parsedWeather;*/

      const weather = await openWeather.getWeather(lat, lng);
      return weather;
    }
    catch (error) {
        if (error.response) {
          // 5xx or 4xx error
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // request never left
          console.log(error.request);
        } else {
         // anything else
          console.log('Error', error.message);
        }
        console.log(error.config);
      };
}

export {getLocation , getWeather };