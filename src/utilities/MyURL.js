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

    //in process
    static parseQueryStringFromURL(url) {
        //get the text after the search operator
        let queryString = url.split('?')[1];
        let queryString2 = url.substring(url.indexOf('?')+1);
        //get an array of kvp
        let kvp = queryString.split('&');
        
        let params={};

        params = kvp.map((el)=>{
            let arr = el.split('='); 
            let key=arr[0];
            let value =arr[1];
            return {key : value}; 
        })

        let params2 ={};
        params2 = kvp.map((el)=>{
            let arr = el.split('=');
            return [arr[0], arr[1]];
        })
        console.log(params);
        console.log(params2);
    } 
}

export default MyURL;