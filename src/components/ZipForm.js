import {useState} from 'react';

function ZipForm ({onSubmit}){
    const [zip, setZip] = useState('');
    const [units, setUnits] = useState('');
    const [formUnits, setFormUnits] =useState('');
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
            onSubmit(zip, formUnits);
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
        const test = event.target.value;
        setFormUnits(test);
        alert({formUnits}+'is units and ' + {test} + "is select value");
    };
    const handleCheckChange = (event) => { 
        setFormUnits(event.target.value);
        console.log('The checkbox was toggled: '+ formUnits);       
      }; 
    return (
        <div className="zip-form col-md-6">
            <form id="zipForm" className="d-flex flex-row" onSubmit={handleFormSubmit}>
                <div className="m-3">
                <div>
                    <div className='input-group'>
                        <input type="radio" name="units-radio" value="imperial" id="imperial" 
                            checked ={formUnits ==="imperial"}
                            onChange={handleCheckChange}/>
                        <label htmlFor="imperial">Imperial</label>
                    </div>
                    <div className='input-group'>
                        <input type="radio" name="units-radio" value="metric" id="metric" 
                            checked ={formUnits ==="metric"}
                            onChange={handleCheckChange}/>
                        <label htmlFor="metric">Metric</label>
                    </div>
                    <div>
                        <input type="radio" name="units-radio" value="null" id="null" 
                            checked ={formUnits ==="null"}
                            onChange={handleCheckChange}/>
                        <label htmlFor="null">None</label>
                    </div>
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
                    <select className="form-select"
                        value={formUnits}
                        onSelect={handleUnitsChange}
                        >
                        <option value="metric">Metric</option>
                        <option value="imperial">Imperial</option>
                        <option value="none">None</option>
                    </select> 
                    </div>
                    <button type="submit" className="my-3 btn btn-success"> Get the forecast!</button>
                </div>
            </form>
        </div>
    );
}

export default ZipForm;