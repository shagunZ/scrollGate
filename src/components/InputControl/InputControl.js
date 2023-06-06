import React from "react"
import './InputControlmodule.css'
function InputControl(props){
    return (
        <div className="innercontainer">
            {props.label && <label>{props.label}</label>} 
            <input type="text" {...props} />       
        </div>
    )
}

export default InputControl