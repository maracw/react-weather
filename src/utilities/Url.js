const URL_QUERY_DELIMITER ='?';
const URL_AMPERSAND = '&';
const URL_EQUALS_SIGN='=';

class Url {
    scheme;
    domain;
    endpoint;
    params ={};

    //constructor () {}
    constructor(scheme, domain, endpoint, params) {
        this.scheme = scheme;
        this.domain = domain;
        this.endpoint = endpoint;
        this.params = params;
    }
    //setters
    setScheme (value) {
        this.scheme = value;
    }

    setDomain (value) {
        this.domain=value;
    }

    setEndpoint (value) {
        this.endpoint=value;
    }

    setParams (obj) {
        this.params = obj;
    }

    //which of these can be null?
    static createURL(scheme, domain, endpoint, params){
        //if params is not null - transform the object into an string using ,for in and join 
        let queryString = params!==null? this.buildQueryString(params) : "";
        const result = scheme + domain + endpoint + URL_QUERY_DELIMITER + queryString;
        return result;
    }
    
    buildQueryString(params) {
        let kvp =[];
        for (let key in params){
                let value=params[key];
                let result= value!==null? [key, encodeURIComponent(value)].join(URL_EQUALS_SIGN) : key;
                kvp.push(result); 
        }
        return kvp.join(URL_AMPERSAND);
    }

    //overloaded toString
    toString () {
        let queryStringAndDelimiter = this.params!==null? URL_QUERY_DELIMITER + this.buildQueryString(this.params) : "";
        return this.scheme + this.domain + this.endpoint + queryStringAndDelimiter;
    }
    //in process

    createFromUrlString (urlString) {
        //return url object with the properties set (scheme, etc, params object is result of the parseAsWwwUrlformEncoded)   
        //this method adds new properties for the moment
        //store the full url string 
        this.href=urlString;

        //split at ? to separate the query
        let beforeAndAfterSearch = urlString.split('?');
        let notQueryString = beforeAndAfterSearch[0];
        let queryString = beforeAndAfterSearch[1];

        //turn queryString into params object
        if (queryString!==null){
            this.params = this.parseQueryString(queryString);
        }
        
        //split the first part of the url by :// to separate out the protocol
        let protocolAndRest=notQueryString.split('://');
        this.protocol=protocolAndRest[0];
        let domainAndRest = protocolAndRest[1];

        //use substring to find the first '/' that separates the domain from the path
        this.domain=domainAndRest.substring(0, domainAndRest.indexOf('/'));
        this.pathname= domainAndRest.substring(this.domain.length);
        console.log(this);
    }

    parseAsWwwUrlFormEncoded (urlString) {


    }
    parseQueryString(queryString) {

        //what about un-encoding text?

        let parts=queryString.split(URL_QUERY_DELIMITER);
        if (!parts.length==1){
            return;
        }
        let params = queryString.split(URL_AMPERSAND);
        let kvp ={};
        for (let i=0; i<params.length; i++){
                let[key, value] =params[i].split(URL_EQUALS_SIGN);
                kvp [key] = value;
        }
        return kvp;       
    } 
}

export default Url;