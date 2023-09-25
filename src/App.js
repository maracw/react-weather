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
   
    const handleSubmit = async (zip) => {
        let localLat =  null;
        let localLon = null;
        let openWeather = new OpenWeather();

        const errorMsgDiv = document.getElementById("openWeather-error");
        errorMsgDiv.innerHTML='';
        errorMsgDiv.classList.remove("error-msg-red");

        try {
            const response = await openWeather.getLocationAxios(zip);
            setLocation(response[0]);
            setForecast(response[1]);
            setSelectedDay(null);
        }
        catch
        {  
            console.log(" App says : problem at calling get location.")
            errorMsgDiv.classList.add("error-msg-red");
            const messageText = document.createTextNode("There was a problem getting the forecast.");
            errorMsgDiv.appendChild(messageText);
            
        };  
    } 

    //onDayClick testing
    const handleDayClick = (index) =>{
        setSelectedDay(index);
    }
  
    if (selectedDay==null && forecast.length>0){
        return (
        <div className="row" id="weather-app">
            <div>
                <Header />
            </div>
            <div id="openWeather-error"  className="error-msg"></div>
            <div className="row d-flex flex-row align-items-start">
                <ZipForm onSubmit = {handleSubmit} />
                <div className='col-md-5'>
                    <WeatherList onDayClick={handleDayClick} forecast={forecast} cityName={location.name}/>     
                </div>       
            </div>
        </div>);
    }
    else if (forecast.length>0){
        return (
        <div  id="weather-app">
            <div>
                <Header />
            </div>
            <div id="openWeather-error" className="error-msg"></div>
            <div className="row d-flex flex-row align-items-start">
                <ZipForm  onSubmit = {handleSubmit} />
                <CurrentDay location={location} forecast={forecast} dateProp ="" selectedDay={selectedDay} />
            </div>
            
            <section>
                <div className="row">
                    <WeatherList onDayClick={handleDayClick} forecast={forecast} cityName={location.name}/>            
                </div>
            </section>
            
        </div>);
    }
    else 
        return (
        <div className="row" id="weather-app">
            <div>
                <Header />
            </div>
            <div className="row">
                <ZipForm onSubmit = {handleSubmit} />
            </div>
            <div id="openWeather-error"  className="error-msg"></div>
        </div>);
}

export default App;