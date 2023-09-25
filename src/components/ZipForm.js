import {useState} from 'react';
import '../styles/ZipForm.css';

function ZipForm ({onSubmit}){

    //declare piece of state
    const [zip, setZip] = useState('');

    //event handler that sends the zip code value back to App.js
    const handleFormSubmit = (event) => {
        event.preventDefault();
        let messageText ="";
        const pattern5DigitZip = /^\d{5}$/;

        //if zip is valid call onSubmit
        //if zip is not valid create element on screen (not a react component)
        if(pattern5DigitZip.test(zip)){
            onSubmit(zip);
        }
        else
        {
            //create div with message
            messageText = "Please enter a 5 digit US zip code to continue.";
        }   
    };

    //event handler to update zipcode as it is typed
    const handleChange = (event) => {
        setZip(event.target.value);
    };
    return (
        <div className="zip-form">
            <form id="zipForm" className="m-4 d-flex flex-row" onSubmit={handleFormSubmit}>
                <div className="m-3">
                    <label className="my-3">Enter a five digit Zipcode:</label>
                    <input 
                        className='form-control'
                        value={zip}
                        onChange={handleChange}
                    />
                    <button type="submit" className="my-3 btn btn-success"> Get the forcast!</button>
                </div>
            </form>
            <div id="error-msg"></div>
        </div>
    );
}

export default ZipForm;