import WeatherListItem from "./WeatherListitem";
import '../styles/WeatherList.css';

function WeatherList ({onDayClick, forecast, cityName}) {
    //create array of react components
    //mapping function to transform the forecast array into a new array of WeatherListItems

    const renderedWeatherItems = forecast.map ((item) => {
        return <WeatherListItem key = {item.dt} forecastDay={item} index = {forecast.indexOf(item)} onDayClick={onDayClick} />
    });
    
    //return the rendered components in single div
   return (
    <div className="weather-list">
        <h2 className="mx-auto">4 Day Forecast in {cityName}</h2>
        <div className="weather-list">{renderedWeatherItems}</div>
    </div>
    );

}

export default WeatherList;