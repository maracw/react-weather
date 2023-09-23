import { useEffect, useState } from "react";

//for useEffect

export default function OpenWeatherUseEffect (zip) {
    const [data, setData] = useState(null);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect (()=>{
        fetch ('')
            .then (response =>response.json())
            .then (data => {
                setData(data);
            })
            .catch ((error) => {
                setError(error);
            })
            .finally (()=>{
                setLoading(false);
            });
    },[]);
    
}
