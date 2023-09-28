class MyURL {
    scheme;
    domain;
    endpoint;
    params ={};

    constructor(scheme, domain, endpoint, params) {
        this.scheme = scheme;
        this.domain = domain;
        this.endpoint = endpoint;
        this.params = params;
    }

    //Create a URL class in JavaScript that uses these methods to create a URL String;
    //which of these can be null?
    static createURL(scheme, domain, endpoint, params){
        //if params is not null - transform the object into an string using ,for in and join 
        let queryString = params!==null? this.buildQueryString(params) : "";
        return scheme + domain + endpoint +'?' + params;
    }

    static buildQueryString(params) {
        let kvp =[];
        for (let key in params){
                let value=params[key];
                let result= value!==null? [key, encodeURIComponent(value)].join('=') : key;
                kvp.push(result); 
        }
        return kvp.join('&');
    }

    //take a string and parse it into its various URL components
    static componentsFromURL(url) {

    }
}

export default MyURL;