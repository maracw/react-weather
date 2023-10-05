import { useState, useEffect } from "react";
import OpenWeather from "./utilities/OpenWeather";
import ZipForm from './components/ZipForm';
import CurrentDay from "./components/CurrentDay";
import WeatherList from "./components/WeatherList";
import Header from "./components/Header";
import parseForecast from "./utilities/weatherParsing";
import './styles/AppStyles.css';
import ErrorDisplay from "./components/ErrorDisplay";



function App () {
    const [location, setLocation] = useState( { name: '', lat: '', lon:'' });
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [currentZip, setCurrentZip] = useState(null);
    const [currentUnits, setCurrentUnits] = useState ('imperial');
    const [hasError, setHasError] = useState(false);
    const [errorText, setErrorText] = useState("");
    
    let openWeather = new OpenWeather();
    //connected to the submit button on ZipForm
    //when user changes zipcode app will fetch new lat and lon values
    //then app will fetch weather data
    useEffect(() => {
    if (currentZip==null) 
    {
        return
    }
        async function fetchData() {
            try {
                let location = await openWeather.getLatLng(currentZip);
                setLocation(location);
                let forecast = await openWeather.getForecast(location.lat, location.lon, currentUnits);
                setForecast(forecast);
            }
            catch(error) {
                if(currentZip!=null)
                {
                    setErrorText("There was a problem getting the forecast or location information at line 45.");
                    setHasError(true); 
                }
            };
        }
        fetchData();
}, [ currentZip ]);


    //connected to the submit button on ZipForm
    //when user changes units without changing location
    //app will fetch weather data from lat and lon in location state
    useEffect(()=>{
        async function fetchWeatherDataOnly() {
            if(location.lat =='' || location.lon ==''){
                return;
            }
            try {
                let forecast = await openWeather.getForecast(location.lat, location.lon, currentUnits);
                setForecast(forecast);
            }
            catch(error) {
                if(currentZip!=null)
                {
                    setErrorText("There was a problem getting the forecast.");
                    setHasError(true); 
                }
            };
        }
        fetchWeatherDataOnly();
    },[currentUnits]);

    
    //updates currentZip and currentUnits state which may trigger the useEffect functions
    const handleSubmit = async (zip, units) => {
        setHasError(false);
        setCurrentZip(zip);
        setCurrentUnits(units);
        setSelectedDay(null); 
    } 

    const handleDayClick = (index) =>{
        setSelectedDay(index);
    }
    //conditional to build page contents
    let sectionContent = "";
    if (hasError){
        sectionContent= <div>
            <div id="openWeather-error"  className="error-msg">
                <ErrorDisplay message={errorText}/>
            </div>
            <ZipForm onSubmit = {handleSubmit} />
        </div>
    }
    else if (selectedDay==null && forecast.length>0){
       sectionContent = <div className="row d-flex flex-row align-items-start">
            <ZipForm onSubmit = {handleSubmit} />
            <div className='col-md-5'>
                <WeatherList onDayClick={handleDayClick} 
                    forecast={forecast} 
                    cityName={location.name}
                    currentUnits={currentUnits}/>     
       </div>
       </div>;
    }
    else if (forecast.length>0){
        sectionContent = <div>
            <div className="row d-flex flex-row align-items-start">
                <ZipForm  onSubmit = {handleSubmit} />
                <CurrentDay location={location} 
                    forecast={forecast} 
                    selectedDay={selectedDay} 
                    currentUnits={currentUnits} />
            </div>
            <div className="row d-flex justify-content-around">
                <div className='col-md-10'>
                    <WeatherList onDayClick={handleDayClick} 
                        forecast={forecast} 
                        cityName={location.name}
                        currentUnits={currentUnits}/>     
                </div>
            </div>
        </div>;  
    }
    else {
        sectionContent =<div className="row">
        <ZipForm onSubmit = {handleSubmit} />
    </div>;
    }

    return (<div className="row" id="weather-app">
        <div><Header /></div>
        <section>{sectionContent}</section>
    </div>);
}

export default App;