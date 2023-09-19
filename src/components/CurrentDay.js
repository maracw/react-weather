import {getWeekday} from '../utilities/dates';
import '../styles/CurrentDay.css'



function CurrentDay ({location, forecast, dateProp, selectedDay}) {


    console.log (forecast.dt);
    const city = location.name;
    const day = forecast;

    const date = day.dt;
    //had trouble using imported function with date object in CHROME
    //browser issue - works in firefox
    //redid the contents of the function as separate lines of code to get same effect
    //const weekday = date.getDay();
    //const dayNames = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //const dayName = dayNames[weekday];
    //original code
    const weekday = getWeekday(date); 

    const pic = 'http://openweathermap.org/img/w/'+ day.icon + '.png';

    if (selectedDay!=null){
        return (
        <div className="current-day-container mb-5">
            <div className="current-day">
                <header>
                    <h2 className='h2'> {weekday} in {city}</h2>
                    <img src={pic} alt={day.description}/>
                    <p className="h4"> {day.description} </p>
                </header>
              
                <div className="current-day-details">
                    <div className="temperature-breakdown mx-2">
                        <p>Morning Temperature: {day.morningTemp}&deg;F</p>
                        <p>Day Temperature: {day.dayTemp}&deg;F</p>
                        <p>Evening Temperature: {day.eveningTemp}&deg;F</p>
                        <p>Night Temperature: {day.nightTemp}&deg;F</p>
                    </div>
                    <div className="misc-details mx-2">
                        <p>Atmospheric Pressure: {day.pressure} hPa</p>
                        <p>Humidity: {day.humidity}%</p>
                        <p>Wind Speed: {day.wind} mph</p>
                    </div>
                </div>
                </div>
            </div>);
    }
    else {
        return <div>No day yet</div>
    }
   
}

export default CurrentDay;