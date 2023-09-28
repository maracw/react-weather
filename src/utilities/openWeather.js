import axios from "axios";
import parseForecast from './weatherParsing';
import MyURL from "./MyURL";

const SCHEME ='http://';
const OPENWEATHER_FORECAST_ENDPOINT = '/data/2.5/forecast';
const OPENWEATHER_LOCATION_ENDPOINT = '/geo/1.0/zip';
const OPENWEATHER_DOMAIN = 'api.openweathermap.org';
const OPENWEATHER_API_KEY_VALUE =process.env.REACT_APP_WEATHER_KEY;

export default class OpenWeather {
    constructor () {}

    async getLatLng(zip) {
        let params ={
            zip: zip+',US',
            appid: OPENWEATHER_API_KEY_VALUE
        };
        let locationURL = MyURL.createURL(SCHEME, OPENWEATHER_DOMAIN, OPENWEATHER_LOCATION_ENDPOINT, params);
        const response =  await fetch(locationURL);
        const data = await response.json();    
        return  {name: data.name, lat: data.lat, lon: data.lon};
    }

    async getForecast (lat, lng, units) {
        let params = {
            units: units, 
            lat: lat, 
            lon: lng,
            appid: OPENWEATHER_API_KEY_VALUE,
        }
        let weatherURL = MyURL.createURL(SCHEME, OPENWEATHER_DOMAIN,OPENWEATHER_FORECAST_ENDPOINT, params);
        const response = await fetch(weatherURL);
        const data = await response.json();
        return parseForecast(data.list, data.city.timezone);
    }
}




