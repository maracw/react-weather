import { getLocation } from "./utilities/api";
import { getWeather } from "./utilities/api";
import { useState } from "react";
import ZipForm from './components/ZipForm';
import CurrentDay from "./components/CurrentDay";
import WeatherList from "./components/WeatherList";
import parseForecast from "./utilities/weatherParsing";

function App () {

    const [location, setLocation] = useState([ { name: '', lat: '', lng:'' }]);
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    let localCity = location.name;
    let forecastDay = null;

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
            setForecast(weatherResponse);
            console.log("set forecast");
            setSelectedDay(null);
            console.log("cleared selected day");

            //testing
            let forecastDay=forecast[0];
            console.log(forecast[0]);
        }
        catch{
            console.log("error at setting forecast");
        };
    } 
//            <CurrentDay localCity ={localCity} forecastDay={forecastDay[0]}/>
    //<CurrentDay localCity ={localCity} forecast={forecast}/>
    return (
        <div>
            <ZipForm onSubmit = {handleSubmit} />
            <div>City: {location.name}</div>
            <WeatherList />
            <CurrentDay localCity ={localCity} forecast={forecast}/>
            
        </div>
    );
}

export default App;