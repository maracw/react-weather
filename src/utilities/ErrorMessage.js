import { createElement } from 'react';

const PARENT_ELEMENT_ID = document.getElementById("openWeather-error");

class ErrorMessage {
    messageText;
    parentElementId;
    className;

    constructor() {
        this.parentElementId ="";
        this.messageText="test";
        console.log("constructed");
    }

    setMessageText(value) {
        this.messageText = value;
    }

    setParentElementId(value) {
        this.parentElementId = document.getElementById(value);
    }

    setClassName(value){
        this.className = value;
    }


    createErrorMessage() {
        this.clearErrorMessage();
        const div = document.createElement('div');
        div.innerHTML=this.messageText;

        if (!this.parentElementId){
            document.body.appendChild(div);
            div.classList.add(this.className);
            div.classList.add("p-3");
            div.setAttribute("id", "custom-weather-error");
        }
        else {
            this.parentElementId.appendChild(div);
            this.parentElementId.classList.add(this.className); 
            this.parentElementId.setAttribute("id", "custom-weather-error");  
        }      
    }

    clearErrorMessage(){
        const oldMessage = document.getElementById("custom-weather-error");
        if(!oldMessage){
            return;
        }
        else{
           oldMessage.innerHTML="";
           oldMessage.classList.remove(this.className);
        }
    }

    displayErrorMessage (){

    }
}

export default ErrorMessage;