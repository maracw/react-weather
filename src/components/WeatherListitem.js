
function WeatherListItem ({onDayClick, index, forecastDay}) {

const handleItemClick =() => {
    onDayClick(index);
}

   return (
   <div  className = "weather-item" onClick={handleItemClick}>
        <div>testing: index is {index} and {forecastDay.description} wind is {forecastDay.wind}</div>
        <div>date is </div>
   </div>);
}

export default WeatherListItem;