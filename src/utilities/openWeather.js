export default class OpenWeather {
    constructor () {
        //class variables
        //independent pieces to construct url for fetch
        //this.scheme ='https';
        //this.subdomain ='api';
        //this.domain ='openweathermap.org';
        this.apiVersion='2.5';
        //this.path='data/'+ this.apiVersion + '/forecast';
        //this.queryString='';
        this.apiKey = process.env.REACT_APP_WEATHER_KEY + process.env.API_KEY_ONLY;
       
        this.queryParameters = {
            units: 'imperial',
            lat : '',
            long :'',
            appid : this.apiKey
        }
       

        this.urlComponents = {
            scheme : 'https://',
            subdomain :'api/',
            domain : 'openweathermap.org/',
            path: 'data/'+ this.apiVersion + '/forecast',
            queryString : '?' + this.buildQueryString()
        }
        //methods that run on init
        //this.buildQueryString();
        this.buildWeatherUrl();
        //"https://api.openweathermap.org/data/2.5/onecall?"
        //binding
        //const weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?
        //units=imperial&lat='+lat+'&lon='+lng+'&';

    }

    //takes a js object with key value pairs, iterates over it
    //reduce array method
    buildQueryString(){
        let queryString ='';
        for (let key in this.queryParameters){
            queryString+= encodeURIComponent(key) + '='
            + encodeURIComponent(this.queryParameters[key]) + '&';
        }
       
        return queryString;
    }


    buildWeatherUrl () {
        const values = Object.values(this.urlComponents);
        console.log (values);
    }
    
}




