import {useState} from 'react';
import '../styles/ZipForm.css';

function ZipForm ({onSubmit}){

    //declare piece of state
    const [zip, setZip] = useState('');

    //event handler that sends the zip code value back to App.js
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const pattern = /^\d{5}$/;
        
        if (zip=="")
        {
            alert("please enter a zip code");

        }else if(pattern.test(zip))
        {
            console.log("valid zip entered");
            onSubmit(zip);
        }
        else{
            alert("invalid zip code entered");
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
        </div>
    );
}

export default ZipForm;