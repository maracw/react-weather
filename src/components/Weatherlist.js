import WeatherListItem from "./WeatherListitem";
import '../styles/WeatherList.css';

function WeatherList ({onDayClick, forecast}) {
    //create array of react components
    //mapping function to transform the forecast array into a new array of WeatherListItems

    const renderedWeatherItems = forecast.map ((item) => {
        return <WeatherListItem key = {item.dt} forecastDay={item} index = {forecast.indexOf(item)} onDayClick={onDayClick} />
    })
    
    //return the rendered components in single div
    return (
        <div className="weather-list">{renderedWeatherItems}</div>
    );

}

export default WeatherList;