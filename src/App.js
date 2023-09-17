import { getLocation } from "./utilities/api";
import { getWeather } from "./utilities/api";
import { useState } from "react";
import ZipForm from './components/ZipForm';

function App () {
    //const [zipcode, setZipcode] = useState('97402');
    //const [lat, setLat] = useState(0);
    //const [lng, setLng] = useState(0);
    const [city, setCity] = useState('');

    //non-state global variables
    let lat = 0;
    let lng = 0; 



    const handleSubmit = async (zip) => {
        try {
            const locationResponse = await getLocation(zip);

            //setLat(locationResponse.lat);
            //setLng(locationResponse.lng);
            lat = locationResponse.lat;
            lng = locationResponse.lng;
            setCity(locationResponse.name);
            console.log("call weather");
            try{
                const weatherResponse = await getWeather(lat,lng);
                console.log(weatherResponse);
            }
            catch{
                console.log("error at getting weather")
            }
        }
        catch
        {
            console.log("problem at calling get location.")
        }
        
        

    } 

    return (
        <div>
            <ZipForm onSubmit = {handleSubmit} />
            <div>City: {city}</div>
        </div>
    );
}

export default App;