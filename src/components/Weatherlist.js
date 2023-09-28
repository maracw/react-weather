import WeatherListItem from "./WeatherListitem";

function WeatherList ({onDayClick, forecast, cityName, currentUnits}) {
    const renderedWeatherItems = forecast.map ((item) => {
        return <WeatherListItem key = {item.dt} 
        forecastDay={item} 
        index = {forecast.indexOf(item)}
        currentUnits={currentUnits} 
        onDayClick={onDayClick} />
    });
    
   return (
    <div className="weather-list">
        <h2 className="mx-auto">Weather Forecast for {cityName}</h2>
        <div className="weather-list">{renderedWeatherItems}</div>
    </div>
    );
}

export default WeatherList;