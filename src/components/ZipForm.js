import {useEffect, useState} from 'react';
import ErrorMessage from '../utilities/ErrorMessage';

function ZipForm ({onSubmit}){
    const [zip, setZip] = useState('');
    const [units, setUnits] = useState('imperial');
    const [hasError, setHasError] = useState(false);
    
    //event handler that sends the zip code value back to App.js
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setHasError(false);
        const pattern5DigitZip = /^\d{5}$/;

        //if zip is valid call onSubmit
        //if zip is not valid create a child element on screen (not a react component)
        if(pattern5DigitZip.test(zip)){
            onSubmit(zip, units);
        }
        else
        {
            setHasError(true); 
        }   
    };

    useEffect(()=>{
        if(hasError){
            let zipError = new ErrorMessage();
            zipError.setMessageText("Please enter a 5 digit US zip code to continue.");
            zipError.setClassName("error-msg-red");
            zipError.createErrorMessage();
        }
       
    }, [hasError]);

    //event handler to update zipcode as it is typed
    const handleZipChange = (event) => {
        setZip(event.target.value);
    };


    return (
        <div className="zip-form col-md-6">
             <div id="zip-error"></div>
            <form id="zipForm" className="d-flex flex-row" onSubmit={handleFormSubmit} >
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
                        <select
                            value={units} 
                            onChange={e => setUnits(e.target.value)}
                            >
                            <option value="imperial">Imperial</option>
                            <option value="metric">Metric</option>
                            <option value="standard">Science!</option>
                        </select>
                    </div>
                    <button type="submit" className="my-3 btn btn-success"> Get the forecast!</button>
                </div>
            </form>
            <div id="zip-form-error"></div>
        </div>
    );
}

export default ZipForm;