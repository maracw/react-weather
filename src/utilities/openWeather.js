import axios from "axios";
import {default as parseForecast} from './weatherParsing';
import {default as MyURL} from "./Url";

const SCHEME ='http://';
const LOCATION_VERSION ='1.0';
const FORECAST_VERSION = '2.5';
const OPENWEATHER_FORECAST_ENDPOINT = '/data/'+ FORECAST_VERSION +'/forecast';
const OPENWEATHER_LOCATION_ENDPOINT = '/geo/'+ LOCATION_VERSION +'/zip';
const OPENWEATHER_DOMAIN = 'api.openweathermap.org';
const OPENWEATHER_API_KEY_VALUE =process.env.REACT_APP_WEATHER_KEY;

export default class OpenWeather {
    constructor () {}

    async getLatLng(zip) {
        let params ={
            zip: zip+',US',
            appid: OPENWEATHER_API_KEY_VALUE
        };

        let url = new MyURL();
        url.setScheme(SCHEME);
        url.setDomain(OPENWEATHER_DOMAIN);
        url.setEndpoint(OPENWEATHER_LOCATION_ENDPOINT);
        url.setParams(params);
  
        const response =  await fetch(url.toString());
        const data = await response.json(); 
        return  {name: data.name, lat: data.lat, lon: data.lon};
    }

    async getForecast (lat, lng, units) {
        if (units ==="standard"){
            units = null;
        }
        let params = {
            units: units, 
            lat: lat, 
            lon: lng,
            appid: OPENWEATHER_API_KEY_VALUE
        }
        let url = new MyURL();
        url.setScheme(SCHEME);
        url.setDomain(OPENWEATHER_DOMAIN);
        url.setEndpoint(OPENWEATHER_FORECAST_ENDPOINT);
        url.setParams(params);
        const response = await fetch(url.toString());
        const data = await response.json();
        return parseForecast(data.list, data.city.timezone);
    }
}




