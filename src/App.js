import { useState } from "react";
import ZipForm from './components/ZipForm';
import CurrentDay from "./components/CurrentDay";
import WeatherList from "./components/Weatherlist";
import Header from "./components/Header";
import OpenWeather from "./utilities/openWeather";
import './styles/AppStyles.css';


function App () {

    const [location, setLocation] = useState([ { name: '', lat: '', lng:'' }]);
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const errorMsgDiv = document.getElementById("openWeather-error");
    let openWeather = new OpenWeather();

    const handleSubmit = async (zip) => {
        try {
            const response = await openWeather.getWeatherByZipAxios(zip);
            setLocation(response[0]);
            setForecast(response[1]);
        }
        catch
        {
            console.log(" App says : problem getting weather info!.")
            errorMsgDiv.classList.add("error-msg-red");
            const messageText = document.createTextNode("There was a problem getting the forecast.");
            errorMsgDiv.appendChild(messageText);
            return false;
        };
    } 

    //onDayClick testing
    const handleDayClick = (index) =>{
        setSelectedDay(index);
    }

    //conditional to handle jsx returned by App
    if (selectedDay==null && forecast.length>0){
        return (<div className="row" id="weather-app">
            <div><Header /></div>
            <div id="openWeather-error"  className="error-msg"></div>
            <div className="row d-flex flex-row align-items-start">
                <ZipForm onSubmit = {handleSubmit} />
                <div className='col-md-5'>
                    <WeatherList onDayClick={handleDayClick} forecast={forecast} cityName={location.name}/>     
                </div>       
            </div>
        </div>);}
    else if (forecast.length>0){
        return (<div  id="weather-app">
            <div><Header /></div>
            <div id="openWeather-error" className="error-msg"></div>
            <div className="row d-flex flex-row align-items-start">
                <ZipForm  onSubmit = {handleSubmit} />
                <CurrentDay location={location} forecast={forecast} selectedDay={selectedDay} />
            </div>
            <section>
                <div className="row">
                    <WeatherList onDayClick={handleDayClick} forecast={forecast} cityName={location.name}/>            
                </div>
            </section>
        </div>);}
    else 
        return (<div className="row" id="weather-app">
            <div id="openWeather-error"  className="error-msg"></div>
            <div><Header /></div>
            <div className="row"><ZipForm onSubmit = {handleSubmit} /></div>
        </div>);
    
}

export default App;