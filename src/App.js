//import { getLocation, getWeather } from "./utilities/api";
import OpenWeather from './utilities/openWeather';
import { useState } from "react";
import ZipForm from './components/ZipForm';
import CurrentDay from "./components/CurrentDay";
import WeatherList from "./components/WeatherList";
import parseForecast from "./utilities/weatherParsing";
import Header from "./components/Header";
import './styles/AppStyles.css';


function App () {

    const [location, setLocation] = useState([ { name: '', lat: '', lon:'' }]);
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    //let localCity = location.name;
    let forecastDay = null;

    const handleSubmit = async (zip) => {
        let localLat =  null;
        let localLon = null;
        let localForecast = null;

        let openWeather = new OpenWeather();

        try {
            const forecastResponse = await openWeather.getLocationAxios(zip);
            setForecast(forecastResponse);
            console.log("set forecast");
            setSelectedDay(null);
            console.log("cleared selected day");

        }
        catch
        {  
            console.log(" App says : problem at calling get location.")
            //needs to stop here
            return false;
        };

         
  
    } 

    //onDayClick testing
    const handleDayClick = (index) =>{
        setSelectedDay(index);
    }

    if(selectedDay==null){
        return (
            <div className="row">
                <div>
                    <Header />
                </div>
                 <div className="row">
                    <ZipForm onSubmit = {handleSubmit} />
                </div>
            </div>
            );
    }
    else if (selectedDay!=null){
        const forecastDay = forecast[selectedDay];
        const date = forecastDay.dt;
        return (
            <div className="">
                <div>
                    <Header />
                </div>
                <div className="row">
                    <ZipForm onSubmit = {handleSubmit} />
                </div>
                <div className="row">
                <WeatherList onDayClick={handleDayClick} forecast={forecast}/>            
                </div>
                <div className="row">
                <CurrentDay location={location} forecast={forecastDay} dateProp ={date} selectedDay={selectedDay} />
                </div>
            </div>);
    }
    else {
        return (
            
            <div className="row">
                <div>
                    <Header />
                </div>
                <div className="row">
                    <ZipForm onSubmit = {handleSubmit} />
                </div>
                <div className="row">
                <WeatherList onDayClick={handleDayClick} forecast={forecast}/>            
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="row">
                <div>
                    <Header />
                </div>
                 <div className="row">
                    <ZipForm onSubmit = {handleSubmit} />
                </div>
            </div>

    );
    }
    
}

export default App;