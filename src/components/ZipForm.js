import {useState} from 'react';

function ZipForm ({onSubmit}){

    //declare piece of state
    const [zip, setZip] = useState('');

    //event handler that sends the zip code value back to App.js
    const handleFormSubmit = (event) => {
        event.preventDefault();

        onSubmit(zip);
    };

    //event handler to update zipcode as it is typed
    const handleChange = (event) => {
        setZip(event.target.value);
    };
    return (
        <div className="">
            <form onSubmit={handleFormSubmit}>
                <label>Enter Zipcode</label>
                <input 
                    value={zip}
                    onChange={handleChange}
                />
            </form>
            <div> You are searching for: {zip}</div>
        </div>
    );
}

export default ZipForm;