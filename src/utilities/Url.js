

class Url {
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

    //which of these can be null?
    static createURL(scheme, domain, endpoint, params){
        //if params is not null - transform the object into an string using ,for in and join 
        let queryString = params!==null? this.buildQueryString(params) : "";
        const result = scheme + domain + endpoint +'?' + queryString;
        return result;
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

    //overloaded to string (not static)
    //use this to get the string

    //in process
    static parseQueryString(queryString) {
        //parseing string as "x-www-urlform-encoded"
        //parseAsWwwUrlformEncoded
        /*google doc contents*/
       //content type "x-www-urlform-encoded"
       //split by 

       //return url objects with the properties set (scheme, etc, params object is result of the parseAsWwwUrlformEncoded)
    } 

    //add consts
}

export default Url;