export default class OpenWeather {
    constructor () {
        //class variables
        //independent pieces to construct url for fetch
        //this.scheme ='https';
        //this.subdomain ='api';
        //this.domain ='openweathermap.org';
        //this.path='data/'+ this.apiVersion + '/forecast';
        //this.queryString='';
        //this.apiKey = 'appid=' + process.env.REACT_APP_WEATHER_KEY;
        this.apiVersion='2.5';

        this.keyOnly = process.env.REACT_APP_WEATHER_KEY.substring(6);
       
        this.weatherQueryData = {
            units: 'imperial',
            lat : '44.0682',
            lon :'-123.0819',
            appid : this.keyOnly
        };

        this.locationQueryData = {
            postCode : '',
            country : ''
        };
       

        this.urlComponents = {
            scheme : 'https://',
            domain : 'api.openweathermap.org/',
            path: 'data/'+ this.apiVersion + '/forecast',
            queryString : ''
        }
        //methods that run on init
        
        this.buildWeatherUrl();

        //binding
      

    }

    //takes a js object with key value pairs, iterates over it
    //reduce array method

    setLocationValues (postCode, country) {
        this.locationQueryData.postCode=postCode;
        this.locationQueryData.country=country;
    }

    setWeatherQueryValues

    setQueryParams(type){
        
        //weather query 
        const weatherString = () => {
            let queryString ='';
            for (let key in this.weatherQueryParams){
                queryString+= encodeURIComponent(key) + '='
                + encodeURIComponent(this.weatherQueryParams[key]) + '&';
            }
             //take off the final '&'
            queryString = queryString.slice(0, queryString.length-1);
            return queryString;
        }
        //location query uses zip={value},US&appid={value}

        const locationString = () =
        const paramObj =(type) => {
            return type=='weather'? this.weatherQueryParams : this.locationQueryParams;
        };

        //check the value of the paramObj
        console.log('query object is set to: '+paramObj);

        //turning key value pairs into string
        for (let key in paramObj){
            queryString+= encodeURIComponent(key) + '='
            + encodeURIComponent(paramObj[key]) + '&';
        }

        //take off the final '&'
        queryString = queryString.slice(0, queryString.length-1);

        //messy way to handle the location data
        if(type=='zip')
            queryString =+ ',US'
        return queryString;
    }

    buildWeatherUrl () {
        //set the value of queryString by passing in type
        this.urlComponents.queryString = this.setQueryParams('weather');
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




