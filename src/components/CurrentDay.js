import {getWeekday} from '../utilities/dates';

function CurrentDay ({location, forecast, selectedDay}) {
    const day = forecast[selectedDay];
    const picSRC = 'http://openweathermap.org/img/w/'+ day.icon + '.png';

    if (selectedDay!=null){
        return (
        <div className="current-day-container mb-5 col-md-5">
            <div className="current-day">
                <header>
                    <h2 className='h2'> {getWeekday(day.dt)} in {location.name}</h2>
                    <img src={picSRC} alt={day.description}/>
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
    else 
        return <div></div>
}

export default CurrentDay;