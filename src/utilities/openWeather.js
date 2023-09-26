import axios from "axios";
import parseForecast from './weatherParsing';

export default class OpenWeather {
    constructor () {
        //class variables to construct url for fetch
        this.domain ='api.openweathermap.org';

        this.weatherPath = '/data/2.5/forecast?';
        this.locationPath = '/geo/1.0/zip?';

         //value starts with 'appid='
        this.apiKeyString = process.env.REACT_APP_WEATHER_KEY;
    }
    async getLatLng(zip) {
        let locationURL = this.buildURL('http://', this.locationPath, 'zip='+ zip + ',US&');
        const response =  await fetch(locationURL);
        //gets back http response
        const data = await response.json();    
        //await reading the response body
        return  {name: data.name, lat: data.lat, lon: data.lon};
    }

    buildURL = (scheme, path, queryString) => {
        return scheme + this.domain + path + queryString + this.apiKeyString;
    }

    //takes a js object with key value pairs, iterates over it
    //could be made to be more generic by passing in an object instead of lat and lng
    buildWeatherQueryString (lat, lon) {
        const data = {
            units: "imperial", lat, lon
        }
        let queryString ='';
            for (let key in data){
                queryString+= encodeURIComponent(key) + '='
                + encodeURIComponent(data[key]) + '&';
            }
            return queryString;
    }

    //no methods in this class to make api requests directly
    //fetch must be called in useEffect hook in App component
    //see ocdla-axios for methods in this class using axios instead of useEffect
}




