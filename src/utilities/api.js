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
    console.log(location);
    
}

function getWeather () {
    return <div> Get Weather</div>
}

export {getLocation , getWeather };