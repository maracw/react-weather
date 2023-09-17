import { getLocation } from "./utilities/api";
import { getWeather } from "./utilities/api";
import { useState } from "react";
import ZipForm from './components/ZipForm';
import CurrentDay from "./components/CurrentDay";

function App () {

    const [location, setLocation] = useState([ { name: '', lat: '', lng:'' }]);
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const handleSubmit = async (zip) => {
        try {
            const locationResponse = await getLocation(zip);
            setLocation( {
                name: locationResponse.name,
                lat: locationResponse.lat,
                lng: locationResponse.lng
                });
            console.log('location set');
        }
        catch
        {
            console.log("problem at calling get location.")
        };

        try{
            const weatherResponse = await getWeather(location.lat,location.lng);
            setForecast(weatherResponse);
        }
        catch{
            console.log("error at getting weather");
        };
    } 

    
    return (
        <div>
            <ZipForm onSubmit = {handleSubmit} />
            <div>City: {location.name}</div>
           
        </div>
    );
}

export default App;