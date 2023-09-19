import {getWeekday} from '../utilities/dates';




function CurrentDay ({location, forecast, selectedDay}) {


    console.log (forecast.dt);
    const city = location.name;
    const day = forecast;

    const date = day.dt;
    //had trouble using imported function with date object
    //redid the contents of the function as separate lines of code to get same effect
    const weekday = date.getDay();
    const dayNames = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[weekday];
    //original code


    const pic = 'http://openweathermap.org/img/w/'+ day.icon + '.png';

    if (selectedDay!=null){
        return (
            <div class="current-day">
            <h1 class="day-header"> {dayName} in {city}</h1>
            <div class="weather">
            <p>
            <img src={pic} 
            alt={day.description}/>
                {day.description}
            </p>
          </div>
          <div class="details flex-parent">
            <div class="temperature-breakdown">
              <p>Morning Temperature: {day.morningTemp}&deg;F</p>
              <p>Day Temperature: {day.dayTemp}&deg;F</p>
              <p>Evening Temperature: {day.eveningTemp}&deg;F</p>
              <p>Night Temperature: {day.nightTemp}&deg;F</p>
            </div>
            <div class="misc-details">
              <p>Atmospheric Pressure: {day.pressure} hPa</p>
              <p>Humidity: {day.humidity}%</p>
              <p>Wind Speed: {day.wind} mph</p>
            </div>
          </div>
        </div>);
    }
    else {
        return <div>No day yet</div>
    }
   
}

export default CurrentDay;