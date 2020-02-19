import React from 'react'

import {
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap"

const renderFieldWithIcon = ({
    input : { name, value, onBlur, ...inputRest },
    icon,
    formGroupClassname,
    inputGroupClassname,
    addonType,
    placeholder,
    type,
    meta: {
        touched,
        error
    }
}) => {

    return (

        <FormGroup className={formGroupClassname || ''}>

            <InputGroup className={inputGroupClassname || ''}>
                
                <InputGroupAddon addonType={addonType || ''}>
                    <InputGroupText>
                            <i className={icon || ''} />
                    </InputGroupText>
                </InputGroupAddon>

                <Input 
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder || ''}
                    component="input"
                    {...inputRest}
                    onBlur={() => onBlur(value)}
                />

            </InputGroup>

            {touched && error && <div className="form-control-feedback" style={{'fontSize' : '80%','marginTop' : '0.25rem', 'width' : '100%', 'color' : '#dc3545'}} >{error}</div>}
            

        </FormGroup>

    )

}

export default renderFieldWithIcon