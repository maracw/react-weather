const URL_QUERY_DELIMITER ='?';
const URL_AMPERSAND = '&';
const URL_EQUALS_SIGN='=';

class Url {
    scheme;
    domain;
    endpoint;
    params ={};

    constructor () {

    }
    constructor(scheme, domain, endpoint, params) {
        this.scheme = scheme;
        this.domain = domain;
        this.endpoint = endpoint;
        this.params = params;
    }
    //setters
    setScheme (value) {
        this.scheme = scheme;
    }

    setDomain (value) {
        this.domain=value;
    }

    setEndPoint (value) {
        this.endpoint=value;
    }

    setParams (obj) {
        this.params = obj;
    }

    //which of these can be null?
    static createURL(scheme, domain, endpoint, params){
        //if params is not null - transform the object into an string using ,for in and join 
        let queryString = params!==null? this.buildQueryString(params) : "";
        const result = scheme + domain + endpoint + QUERY_DELIMITER + queryString;
        return result;
    }
    

    static buildQueryString(params) {
        let kvp =[];
        for (let key in params){
                let value=params[key];
                let result= value!==null? [key, encodeURIComponent(value)].join(URL_EQUALS_SIGN) : key;
                kvp.push(result); 
        }
        return kvp.join(URL_AMPERSAND);
    }

    //overloaded to string (not static)
    toString () {
        let queryString = params!==null? this.buildQueryString(params) : "";
        return this.scheme + this.domain + this.endpoint + QUERY_DELIMITER + queryString;
    }
    //in process

    parseAsWwwUrlFormEncoded (urlString) {

    }
    static parseQueryString(queryString) {
        //parseing string as "x-www-urlform-encoded"
        //parseAsWwwUrlformEncoded
        /*google doc contents*/
       //content type "x-www-urlform-encoded"
       //split by 

       //return url objects with the properties set (scheme, etc, params object is result of the parseAsWwwUrlformEncoded)
    } 
}

export default Url;