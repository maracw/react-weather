import { getLocation, getWeather,callOpenWeather } from "./utilities/api";
import OpenWeather from './utilities/openWeather';
import { useState, useEffect } from 'react';

function useOpenWeather(zip) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    let openWeather = new OpenWeather();
    

    useEffect(() => {
        setLoading(true);
        const locationURL = openWeather.buildURL('http://', openWeather.locationPath, 'zip='+ zip + ',US&');
        console.log('useOpenWeather says api call is :' + locationURL);
        fetch(locationURL, opts)
            .then((response) => {
            setResponse(response.data)
            setLoading(false)
        })
            .catch(() => {
                setHasError(true)
                setLoading(false)
            })
    }, [ url ])
    return response;
}