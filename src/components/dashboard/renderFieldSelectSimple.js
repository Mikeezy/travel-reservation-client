import React from 'react'
import Select2 from 'react-select'
import {
    FormGroup
} from "reactstrap"

const renderFieldSelectSimple = ({
    input : { name, value, onBlur,onChange},
    placeholder,
    label,
    options,
    searchableValue,
    disableValue,
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

            <Select2 
                placeholder={placeholder || ''}
                options={options}
                name={name}
                isSearchable={typeof searchableValue === 'undefined' ? true : searchableValue}
                isDisabled={typeof disableValue === 'undefined' ? false : disableValue}
                value={value}
                noOptionsMessage={(inputValue) => "Aucun resultat !"}
                onChange={(value) => onChange(value)}
                onBlur={() => onBlur()}
                id={name}
            />

            {touched && error && <div className="form-control-feedback" style={{'fontSize' : '80%','marginTop' : '0.25rem', 'width' : '100%', 'color' : '#dc3545'}} >{error}</div>}
            
        </FormGroup>

    )

}

export default renderFieldSelectSimple