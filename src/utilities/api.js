import axios from 'axios';
import {parseForecast} from './weatherParsing';
 
const apiKey = 'appid=3587a1743721943c11ae0a69a66c18ff';

const getLocation  = async (zip) => {
    const geoUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip='+zip+',US&';
    
    const response = await axios.get(geoUrl+apiKey);
    console.log(response);
    const location  = {
        name : response.data.name, 
        lat: response.data.lat,
        lng: response.data.lon
    }
    
    return location;
    
}

const getWeather = async (lat, lng) => {

    const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+lng+'&';
    const weatherResponse = axios.get(weatherUrl+apiKey)

   console.log (weatherResponse);
    //https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
    //return <div> Get Weather</div>
    return weatherResponse;
}

export {getLocation , getWeather };