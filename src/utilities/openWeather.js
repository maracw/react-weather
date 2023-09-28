import axios from "axios";
import parseForecast from './weatherParsing';
import URL from './MyURL';
import MyURL from "./MyURL";

const SCHEME ='http://';
const OPENWEATHER_FORECAST_ENDPOINT = '/data/2.5/forecast';
const OPENWEATHER_LOCATION_ENDPOINT = '/geo/1.0/zip';
const OPENWEATHER_DOMAIN = 'api.openweathermap.org';
const OPENWEATHER_API_KEY_VALUE =process.env.REACT_APP_WEATHER_KEY;

export default class OpenWeather {
    constructor () {}

    async getLatLng(zip) {
        let params1 ={
            zip: zip+',US',
            appid: OPENWEATHER_API_KEY_VALUE
        };

        let params = {
            zip: zip+',US',
        };
        //new class
        let locationURL1 = MyURL.createURL(SCHEME, OPENWEATHER_DOMAIN, OPENWEATHER_LOCATION_ENDPOINT, params1);
        console.log('result from call on static MyURL method : '+locationURL1);
        //orig
        let locationURL2 =OpenWeather.buildURL(OPENWEATHER_LOCATION_ENDPOINT,params);
        console.log('result from call on static OpenWeather method : '+locationURL2);
        const response =  await fetch(locationURL2);
        const data = await response.json();    
        return  {name: data.name, lat: data.lat, lon: data.lon};
    }

    async getForecast (lat, lng) {
        let params = {
            units: "imperial", 
            lat: lat, 
            lon: lng,
            appid: OPENWEATHER_API_KEY_VALUE,
        }
        let weatherURL = MyURL.createURL(SCHEME, OPENWEATHER_DOMAIN,OPENWEATHER_FORECAST_ENDPOINT, params);
        const response = await fetch(weatherURL);
        const data = await response.json();
        return parseForecast(data.list, data.city.timezone);
    }
    static buildURL (path, params) {
      const queryString = params!=null? OpenWeather.buildWeatherQueryString(params) : null;
      return 'http://' + OPENWEATHER_DOMAIN + path +'?'+ queryString;
    }

    static buildWeatherQueryString (params) {
        params.appid = OPENWEATHER_API_KEY_VALUE;
        let kvp =[];
        for (let key in params){
            //builds array of key value pairs
            let value= params[key];
            let tern = value==null?  key : [key, encodeURIComponent(value)].join('=');
            kvp.push(tern);
        }            
        return kvp.join('&');
    } 
}




