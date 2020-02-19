import React from 'react'

import {
    FormGroup,
    Input
} from "reactstrap"

const renderField = ({
    input : { name, value, onBlur, ...inputRest },
    placeholder,
    label,
    type,
    meta: {
        touched,
        error
    }
}) => {

    return (

        <FormGroup>

            <label
                className="form-control-label"
                htmlFor={name}
            >
                {label}
            </label>

            <Input 
                id={name}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder || ''}
                component="input"
                {...inputRest}
                onBlur={() => onBlur(value)}
            />

            {touched && error && <div className="form-control-feedback" style={{'fontSize' : '80%','marginTop' : '0.25rem', 'width' : '100%', 'color' : '#dc3545'}} >{error}</div>}
            
        </FormGroup>

    )

}

export default renderField