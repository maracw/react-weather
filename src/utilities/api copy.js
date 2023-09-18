import axios from 'axios';
import parseForecast from './weatherParsing';
 
const apiKey ='appid=3587a1743721943c11ae0a69a66c18ff';

const getLocation  = async (zip) => {
    const geoUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip='+zip+',US&';
    try {
        const response = await axios.get(geoUrl+apiKey);

        console.log(response);
        const location  = {
            name : response.data.name, 
            lat: response.data.lat,
            lng: response.data.lon
        }
        
        return location;
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
/*API addresses in openweather documentation and ES6 starting files do not match
URL that does not work with current version of parseWeather
'https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+lng+'&';
URL from ES^ starting files 
https://api.openweathermap.org/data/2.5/forecast?units=imperial& */ 
const getWeather = async (lat, lng) => {
const weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat='+lat+'&lon='+lng+'&';
try {
  
        const weatherResponse = await axios.get(weatherUrl+apiKey);
        console.log ("sent weather request");
        //variable to hold promised object
        let simpleWeather = weatherResponse;
       //returns promise
        return weatherResponse;
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