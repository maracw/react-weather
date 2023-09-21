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
        //this.apiKey = 'appid=' + process.env.REACT_APP_WEATHER_KEY;
        this.keyOnly = process.env.REACT_APP_WEATHER_KEY.substring(6);
       
        this.queryParameters = {
            units: 'imperial',
            lat : '44.0682',
            lon :'-123.0819',
            appid : this.keyOnly
        };
       

        this.urlComponents = {
            scheme : 'https://',
            domain : 'api.openweathermap.org/',
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
        //take off the final '&'
        queryString = queryString.slice(0, queryString.length-1);
        return queryString;
    }


    buildWeatherUrl () {
        let values = Object.values(this.urlComponents);
        //let weatherUrl = values.reduce (whole, part) => {
        let weatherUrl = values.reduce((whole, part) =>{
            return whole+part;
        })
        console.log (values);
        console.log(weatherUrl);

        return weatherUrl;
    }
    
}




