import {getWeekday} from '../utilities/dates';

function WeatherListItem ({onDayClick, index, forecastDay}) {

const date = forecastDay.dt;
const weekday = getWeekday(date);

const handleItemClick =() => {
    onDayClick(index);
}

   return (
    <div className="weather-list-item" data-index={index} onClick={handleItemClick}>
      <h2>{weekday}</h2>
      <h3>{date.getMonth() + 1} / {date.getDate()}</h3>
      <h3>{forecastDay.minTemp.toFixed(1)}&deg;F &#124; {forecastDay.maxTemp.toFixed(1)}&deg;F</h3>
      <h4><span className="badge bg-secondary">See details</span></h4>
    </div>);
}

export default WeatherListItem;