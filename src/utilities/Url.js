const URL_QUERY_DELIMITER ='?';
const URL_AMPERSAND = '&';
const URL_EQUALS_SIGN='=';
const URL_PROTOCOL_DELIMITER = '://';
const URL_PATH_DELIMITER = '/';
const URL_EMPTY_STRING = "";

class Url {
    href;
    protocol;
    scheme;
    domain;
    endpoint;
    params ={};

    constructor() {
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
    
    buildQueryString(params) {
        let kvp =[];
        for (let key in params){
                let value=params[key];
                let result= value!==null? [key, encodeURIComponent(value)].join(URL_EQUALS_SIGN) : key;
                kvp.push(result); 
        }
        return kvp.join(URL_AMPERSAND);
    }

    //overloaded toString acts on an instance of Url
    toString () {
        let queryStringAndDelimiter = this.params!==null? URL_QUERY_DELIMITER + this.buildQueryString(this.params) : URL_EMPTY_STRING;
        return this.scheme + this.domain + this.endpoint + queryStringAndDelimiter;
    }

    //parsing
    static newFromString (urlString) {
        //store the full url string 
        let href=urlString;

        //split at ? to separate the query
        let [upToQuery, queryString] = urlString.split(URL_QUERY_DELIMITER);

        //turn queryString into params object
        let params;
        if (queryString!==null){
            params = Url.parseAsWwwUrlFormEncoded(queryString);
        }
        
        //split the first part of the url by :// to separate out the protocol
        let [protocol, domainAndRest]=upToQuery.split(URL_PROTOCOL_DELIMITER);
       
        //use substring to find the first '/' that separates the domain from the path
        let domain=domainAndRest.substring(0, domainAndRest.indexOf(URL_PATH_DELIMITER));
        let endpoint=domainAndRest.substring(domain.length);
        
        //make new url object
        let url = new Url();
        url.setScheme (protocol + URL_PROTOCOL_DELIMITER);
        url.setDomain(domain);
        url.setEndpoint(endpoint);
        url.setParams(params);

        console.log(url);
        return url;

    }

    static parseAsWwwUrlFormEncoded (urlString) {
        let parts=urlString.split(URL_QUERY_DELIMITER);
        if (!parts.length==1){
            return;
        }
        let params = urlString.split(URL_AMPERSAND);
        let kvp ={};
        for (let i=0; i<params.length; i++){
                let[key, value] =params[i].split(URL_EQUALS_SIGN);
                try {
                   decodeURI(value);
                  } catch (e) {
                    console.error(e);
                  }
                kvp [key] = value;
        }
        return kvp;       
    } 
}

export default Url;