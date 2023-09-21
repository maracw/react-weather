class OpenWeather {
    constructor () {
        //class variables
        //independent pieces to construct url for fetch
        this.scheme ='https';
        this.subdomain ='api';
        this.domain ='openwathermap.org';
        this.apiVersion='2.5';
        this.path='data/'+ this.apiVersion + '/forecast';
        this.queryString='';
       
        this.queryParameters = {
            units: 'imperial',
            lat: '',
            long:''
        }

        //methods that run on init
        this.buildQueryString();

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
        console.log(queryString);
    }


}



export default Class OpenWeather;
