import axios from "axios";
import parseForecast from './weatherParsing';

export default class OpenWeather {
    constructor () {
        //class variables -independent pieces to construct url for fetch
        this.domain ='api.openweathermap.org';

        this.weatherPath = '/data/2.5/forecast?';
        this.locationPath = '/geo/1.0/zip?';

         //value starts with 'appid='
        this.apiKeyString = process.env.REACT_APP_WEATHER_KEY;

        //this may not need to be here
        //could create an object in buildWeatherQueryString
        this.weatherQueryData = {
            units: 'imperial',
            lat : '',
            lon :''
        };
        this.locationData ={
            name: '',
            lat: '',
            lon: ''
        };

    }
       
    //works with axios
   
    //axios version
    async getWeatherByZipAxios(zip) {

    let locationURL = this.buildURL('http://', this.locationPath, 'zip='+ zip + ',US&');
    const response = await axios.get(locationURL);
    this.locationData = response.data;
    const weather = await this.getWeatherAxios(response.data.lat, response.data.lon);
    return [this.locationData, weather];
    }

    async getWeatherAxios1(lat, lon) {
        let weatherURL = this.buildURL('https://', this.weatherPath, this.buildWeatherQueryString(lat, lon));
        const response = await axios.get(weatherURL);
        const weather = parseForecast(response.data.list, response.city.timezone);
        return weather;
    }

    async getWeatherAxios(lat, lng) {
        let weatherURL = this.buildURL('https://', this.weatherPath, this.buildWeatherQueryString(lat, lng));
        const response = await axios.get(weatherURL);
        console.log(response);
        const timeZoneOffset = response.data.city.timezone;
        const parsedForecast = parseForecast(response.data.list, timeZoneOffset);
        console.log("parsed weather");
        console.log(parsedForecast);
        return parsedForecast;
    }
    //a generic way
    buildURL = (scheme, path, queryString) => {
        return scheme + this.domain + path + queryString + this.apiKeyString;
    }

    //takes a js object with key value pairs, iterates over it
    //could be made to be more generic by passing in an object instead of lat and lng
    buildWeatherQueryString (lat, lng) {;
        this.weatherQueryData.lat = lat;
        this.weatherQueryData.lon = lng;
        let queryString ='';
            //encodeURIComponent might not be needed because lat and lng will be numbers
            //but if this is to be more generic then it is useful
            for (let key in this.weatherQueryData){
                queryString+= encodeURIComponent(key) + '='
                + encodeURIComponent(this.weatherQueryData[key]) + '&';
            }
            return queryString;
    }
 
}




