import React from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'
import 'moment/locale/fr'


const renderField = ({
    input,
    label,
    placeholder,
    dateFormat,
    timeFormat,
    meta: {
        touched,
        error
    }
}) => {

    return (

        <>

            <label
                className="form-control-label"
                htmlFor={input.name}
            >
                {label}
            </label>

            <Datetime
                id={input.name}
                {...input}
                placeholder={placeholder || ''}
                dateFormat={dateFormat}
                timeFormat={timeFormat ? timeFormat : false}
                selected={input.value ? moment(input.value, `${dateFormat} ${timeFormat ? timeFormat : ''}`) : null}
                viewMode={'days'}
                onChange={(value) => input.onChange(moment(value).format(`${dateFormat} ${timeFormat ? timeFormat : ''}`))}
                onBlur={() => input.onBlur()}
                
            />

            {touched && error && <div className="form-control-feedback" style={{'fontSize' : '80%','marginTop' : '0.25rem', 'width' : '100%', 'color' : '#dc3545'}} >{error}</div>}
            
        </>

    )

}

export default renderField