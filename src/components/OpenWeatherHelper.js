import { useState } from 'react';
import { getLocation, getWeather,callOpenWeather } from "../utilities/api";
import OpenWeather from '../utilities/openWeather';
import useOpenWeather from '../hooks/useOpenWeather';

function OpenWeatherHelper ({zip}) {

    const [locationResponse, setLocationResponse] = useState([ { name: '', lat: '', lng:'' }])
    console.log("using custom hook useFetch to get zip response");
    console.log("first- make url");
    let openWeather = new OpenWeather();
    const locationURL = openWeather.buildURL('http://', openWeather.locationPath, 'zip='+ zip + ',US&');
    console.log('OpenWeather says api call is :' + locationURL);

    const response = useOpenWeather(zip);

    setLocationResponse(response);

    console.log('App says location response is : ' + locationResponse);

    return locationResponse;
}

export default OpenWeatherHelper;