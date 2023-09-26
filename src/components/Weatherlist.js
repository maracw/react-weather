import WeatherListItem from "./WeatherListitem";

function WeatherList ({onDayClick, forecast}) {
    const renderedWeatherItems = forecast.map ((item) => {
        return <WeatherListItem key = {item.dt} forecastDay={item} index = {forecast.indexOf(item)} onDayClick={onDayClick} />
    })
    
    return (
        <div className="weather-list">{renderedWeatherItems}</div>
    );
}

export default WeatherList;