import {getWeekday} from '../utilities/dates';

function CurrentDay ({localCity, forecast}) {
    const city = localCity;
    const day = forecast[0];
    const date = day.dt;
    const weekday = getWeekday(date);
    const pic = 'http://openweathermap.org/img/w/'+ day.icon + '.png';

    return (
            <div class="current-day">
            <h1 class="day-header">{weekday} in {city}</h1>
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

export default CurrentDay;