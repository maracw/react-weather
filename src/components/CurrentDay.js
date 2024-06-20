import {getWeekday} from '../utilities/dates';

function CurrentDay ({location, forecast, selectedDay, currentUnits}) {
    const day = forecast[selectedDay];
    const picSRC = 'http://openweathermap.org/img/w/'+ day.icon + '.png';

    //const displayUnits = currentUnits=="imperial"? "F" :"C";
    let displayUnits;
    if(currentUnits =="metric"){
        displayUnits="C";
    }
    else if (currentUnits=="imperial"){
        displayUnits="F";
    }
    else{
        displayUnits="K";
    }
    console.log(displayUnits + currentUnits);

   

    if (selectedDay!=null){
        return (
        <div className="current-day-container mb-5 col">
            <div className="current-day">
                <header>
                    <h2 className='h2'> {getWeekday(day.dt)} in {location.name}</h2>
                    <img src={picSRC} alt={day.description}/>
                    <p className="h4"> {day.description} </p>
                </header>
              
                <div className="current-day-details">
                    <div className="temperature-breakdown mx-2">
                        <p>Morning Temperature: {day.morningTemp}&deg;{displayUnits}</p>
                        <p>Day Temperature: {day.dayTemp}&deg;{displayUnits}</p>
                        <p>Evening Temperature: {day.eveningTemp}&deg;{displayUnits}</p>
                        <p>Night Temperature: {day.nightTemp}&deg;{displayUnits}</p>
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
        return <div></div>;
}

export default CurrentDay;