import {useState} from 'react';

function ZipForm ({onSubmit}){
    const [zip, setZip] = useState('');
    const errorMsgDiv = document.getElementById("openWeather-error");
    const [units, setUnits] = useState('imperial');
    
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


    return (
        <div className="zip-form col-md-6">
            <form id="zipForm" className="d-flex flex-row" onSubmit={handleFormSubmit} >
                <div className="m-3">
                <div>
                    <select
                    value={units} // ...force the select's value to match the state variable...
                    onChange={e => setUnits(e.target.value)} // ... and update the state variable on any change!
                    >
                        <option value="imperial">Imperial</option>
                        <option value="metric">Metric</option>
                        <option value="standard">Standard</option>
                     </select>
                </div>
                    <div>
                        <label className="my-3">Enter a five digit Zipcode:</label>
                        <input 
                            className='form-control'
                            value={zip}
                            onChange={handleZipChange}
                        />
                    </div>
                    <div>

                    </div>
                    <button type="submit" className="my-3 btn btn-success"> Get the forecast!</button>
                </div>
            </form>
        </div>
    );
}

export default ZipForm;