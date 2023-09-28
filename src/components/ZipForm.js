import {useState} from 'react';

function ZipForm ({onSubmit}){
    const [zip, setZip] = useState('');
    const [units, setUnits] = useState(null);
    const errorMsgDiv = document.getElementById("openWeather-error");

    //event handler that sends the zip code value back to App.js
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if(errorMsgDiv!=null){
            errorMsgDiv.innerHTML='';
            errorMsgDiv.classList.remove("error-msg-red");
        }

        const pattern5DigitZip = /^\d{5}$/;

        //if zip is valid call onSubmit
        //if zip is not valid create a child element on screen (not a react component)
        if(pattern5DigitZip.test(zip)){
            onSubmit(zip, units);
        }
        else
        {
            errorMsgDiv.classList.add("error-msg-red");
            const messageText = document.createTextNode("Please enter a 5 digit US zip code to continue.");
            errorMsgDiv.appendChild(messageText);
        }   
    };

    //event handler to update zipcode as it is typed
    const handleZipChange = (event) => {
        setZip(event.target.value);
    };

    const handleUnitsChange = (event) => {
        setUnits (event.target.value);
    }
    
    return (
        <div className="zip-form col-md-6">
            <form id="zipForm" className="d-flex flex-row" onSubmit={handleFormSubmit}>
                <div className="m-3">
                    <div>
                        <label className="my-3">Enter a five digit Zipcode:</label>
                        <input 
                            className='form-control'
                            value={zip}
                            onChange={handleZipChange}
                        />
                    </div>
                    <div>
                    <select class="form-select"
                        onChange={handleUnitsChange}
                        value={units}>
                        <option value="metric">Metric</option>
                        <option value="imperial">Imperial</option>
                        <option value="null">None</option>
                    </select> 
                    </div>
                    <button type="submit" className="my-3 btn btn-success"> Get the forecast!</button>
                </div>
            </form>
        </div>
    );
}

export default ZipForm;