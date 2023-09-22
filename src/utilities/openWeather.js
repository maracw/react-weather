import axios from "axios";

export default class OpenWeather {
    constructor () {
        //class variables
        //independent pieces to construct url for fetch
        this.domain ='api.openweathermap.org';

        this.weatherPath = '/data/2.5/forecast?';
        this.locationPath = '/geo/1.0/zip?';

         //value starts with 'appid='
        this.apiKeyString = process.env.REACT_APP_WEATHER_KEY;

        this.weatherQueryData = {
            units: 'imperial',
            lat : '',
            lon :''
        };

        this.locationQueryData = {
            postCode : ''
        };

        //used to hold returned value for name from location call
        this.locationName='';
    }
       
    //a generic way
   buildURL = (scheme, path, queryString) => {
        return scheme + this.domain + path + queryString + this.apiKeyString;
    }

    //works with axios
    async getLatAndLongByZip (zip) {
        let locationURL = this.buildURL('http://', this.locationPath, 'zip='+ zip + ',US&');
        const response = await axios.get(locationURL);
        console.log(response);
    }

    async getWeather(lat, lng) {
        let weatherURL = this.buildURL('https://', this.weatherPath, this.buildWeatherQueryString(lat, lng));
        const response = await axios.get(weatherURL);
        console.log(response);
    }

    //location query uses zip={value},US&appid={value}
    //can't reuse the for loop in buildWeatherQueryString
    //this is short enough to keep in buildLocationUrl, but it is a separate step
    //this would be useful if country is different
    /*buildLocationQueryString(zip) {
        //set the values
        this.locationQueryData.postCode=zip;
        return 'zip='+zip+ ',US&';
    }*/


    //takes a js object with key value pairs, iterates over it
    //reduce array method
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




