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
    
    //axios version
    async getLocationAxios(zip) {
        // let localLat =  null;
        // let localLon = null;
        let locationURL = this.buildURL('http://', this.locationPath, 'zip='+ zip + ',US&');
        const response = await axios.get(locationURL);
        this.locationData = response.data;
        
        const weatherResponse = await this.getWeatherAxios(this.locationData.lat, this.locationData.lon);
        const locationAndWeather = [this.locationData, weatherResponse];
        return locationAndWeather;
    }

    async getWeatherAxios(lat, lng) {
        let weatherURL = this.buildURL('http://', this.weatherPath, this.buildWeatherQueryString(lat, lng));
        const response = await axios.get(weatherURL);
        console.log(response);
        const timeZoneOffset = response.data.city.timezone;
        const parsedForecast = parseForecast(response.data.list, timeZoneOffset);
        console.log("parsed weather");
        console.log(parsedForecast);
        return parsedForecast;
    }

    async getLocationWithFetch (zip) {
        let locationURL = this.buildURL('http://', this.locationPath, 'zip='+ zip + ',US&');
        fetch (locationURL)
            .then (response =>response.json())
            .then (data => {
                console.log(data);
                return data;
            })//end of first fetch
            .catch (error => {
                alert('open weather says : There was a problem getting location info!');
                 
            });//end of catch for first fetch

    }

    async getWeatherWithFetch (lat, lng) {
        let weatherURL = this.buildURL('https://', this.weatherPath, this.buildWeatherQueryString(lat, lng));
        fetch (weatherURL)
            .then (response => response.json())
            .then (data =>{
                const timeZoneOffset = data.city.timezone;
                console.log("data from fetch call");
                console.log(data);
                const parsedForecast = parseForecast(data.list, timeZoneOffset);
                console.log("parsed weather");
                console.log(parsedForecast);
                return parseForecast;
            })//end of weather URL fetch
            .catch (error =>{
                alert('There was a problem getting weather info!');
            });//end of catch for weatherURL fetch
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




