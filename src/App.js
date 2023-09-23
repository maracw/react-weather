import { getLocation, getWeather,callOpenWeather } from "./utilities/api";
import OpenWeather from './utilities/openWeather';
import { useState } from "react";
import ZipForm from './components/ZipForm';
import CurrentDay from "./components/CurrentDay";
import WeatherList from "./components/WeatherList";
import parseForecast from "./utilities/weatherParsing";
import Header from "./components/Header";
import './styles/AppStyles.css';


function App () {
    const [location, setLocation] = useState([ { name: '', lat: '', lng:'' }]);
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const [data, setData] = useState(null);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let localCity = location.name;
    let forecastDay = null;

    const handleSubmit = async (zip) => {
        let localLat =  null;
        let localLng =null;
        let localForecast = null;

        let openWeather = new OpenWeather();
        const locationURL = openWeather.buildURL('http://', this.locationPath, 'zip='+ zip + ',US&');

        const useEffect =  (()=>{
            fetch (locationURL)
                .then (response =>response.json())
                .then (dataResponse => {
                    setData(dataResponse);
                    const updatedLocation  = {
                        name : dataResponse.name,
                        lat: dataResponse.lat,
                        lng: dataResponse.lon
                    };
                    setLocation(updatedLocation);
                })
                .catch ((error) => {
                    setError(error);
                })
                .finally (()=>{
                    setLoading(false);
                });
        },[]);



        try {

            /*
            const locationResponse = await openWeather.getLocation(zip);
            console.log('App says location response is : ' + locationResponse);
            //setLocation(locationResponse);
            //localLat = locationResponse.lat;
            //localLng = locationResponse.lng;
            */
            

            //const weatherResponse = await openWeather.getWeather(localLat,localLng);
            //const weatherResponse = await openWeather.getLocation(zip);
            const weatherResponse = await callOpenWeather(zip);

            setForecast(weatherResponse);
            console.log("set forecast");
            setSelectedDay(null);
            console.log("cleared selected day");

            //testing
            let forecastDay=forecast[0];
            console.log(forecast[0]);

        }
        catch
        {
            
            console.log(" App says : problem at calling get location.")
            //needs to stop here
            return false;
        };

         //within own try block with local lat and lng
        /*try{
            
            const weatherResponse = await openWeather.getWeather(localLat,localLng);
            setForecast(weatherResponse);
            console.log("set forecast");
            setSelectedDay(null);
            console.log("cleared selected day");

            //testing
            let forecastDay=forecast[0];
            console.log(forecast[0]);
        }
        catch{
            console.log("App says: error at setting forecast");
        };*/
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
    
    if (selectedDay!=null){
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
    else if (forecast.length>0){
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