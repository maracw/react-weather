import { useState, useEffect } from "react";
import OpenWeather from './utilities/OpenWeather';
import ZipForm from './components/ZipForm';
import CurrentDay from "./components/CurrentDay";
import WeatherList from "./components/WeatherList";
import Header from "./components/Header";
import parseForecast from "./utilities/weatherParsing";
import './styles/AppStyles.css';

function App () {
    const [location, setLocation] = useState( { name: '', lat: '', lon:'' });
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [currentZip, setCurrentZip] = useState("95616");

    const [hasError, setHasError] = useState(false);
    const errorMsgDiv = document.getElementById("openWeather-error");
    
    let openWeather = new OpenWeather();
    
    useEffect(() => {
    if (currentZip==null) 
    {
        return
    }
        async function fetchData() {
            try {
                let location = await openWeather.getLatLng(currentZip);
                setLocation(location);
                let forecast = await openWeather.getForecast(location.lat, location.lon);
                setForecast(forecast);
            }
            catch(error) {
                if(currentZip!=null)
                {
                    setHasError(true);
                    console.log(" App says : problem getting weather info!.")
                    errorMsgDiv.classList.add("error-msg-red");
                    const messageText = document.createTextNode("There was a problem getting the forecast.");
                    errorMsgDiv.appendChild(messageText);
                }
            };
        }
        fetchData();
}, [ currentZip ]);
    

    //updates currentZip state which triggers the useEffect function
    const handleSubmit = async (zip) => {
        setCurrentZip(zip);
        setSelectedDay(null); 
    } 

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