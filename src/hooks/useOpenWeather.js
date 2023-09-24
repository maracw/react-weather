import React, { useState, useEffect } from 'react';
import OpenWeather from '../utilities/openWeather';


function useOpenWeather(url) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    let openWeather = new OpenWeather();
    

    useEffect(() => {
        setLoading(true);
            fetch(url)
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

export default useOpenWeather;