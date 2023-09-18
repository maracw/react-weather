import { getLocation } from "./utilities/api";
import { getWeather } from "./utilities/api";
import { useState } from "react";
import ZipForm from './components/ZipForm';
import CurrentDay from "./components/CurrentDay";
import WeatherList from "./components/Weatherlist";
import parseForecast from "./utilities/weatherParsing";

function App () {

    const [location, setLocation] = useState([ { name: '', lat: '', lng:'' }]);
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const handleSubmit = async (zip) => {
        let localLat =  null;
        let localLng =null;
        let localForecast = null;
        try {
            const locationResponse = await getLocation(zip);
            setLocation( {
                name: locationResponse.name,
                lat: locationResponse.lat,
                lng: locationResponse.lng
                });
            localLat = locationResponse.lat;
            localLng = locationResponse.lng;
            
            console.log('location set');
        }
        catch
        {
            console.log("problem at calling get location.")
        };

         //within own try block with local lat and lng
        try{

            const weatherResponse = await getWeather(localLat,localLng);
            const simpleWeather =weatherResponse.data.list;
            const timeZoneOffset = weatherResponse.data.timeZoneOffset;
            const parsedWeather = parseForecast(simpleWeather,timeZoneOffset);
           
            setForecast(parsedWeather);
            console.log("set forecast");
        }
        catch{
            console.log("error at setting forecast");
        };
    } 

    
    return (
        <div>
            <ZipForm onSubmit = {handleSubmit} />
            <div>City: {location.name}</div>
           <WeatherList />
        </div>
    );
}

export default App;