import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Container, Form, FormControl, InputGroup, FloatingLabel} from 'react-bootstrap';

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    setValue: PropTypes.func.isRequired,
};

Input.defaultProps = {
    className: "m-2",
    type: "text",
    title: "",
    placeholder: null,
    value: null,
    setValue: (v) => {},
};

export default function Input({className, type, title, placeholder, value, setValue}) {
    const [focused, setFocused] = useState(false);

    function renderInput() {
        return(
            <FormControl type={type==="number"?"number":"text"} placeholder={placeholder==null ?`${title===""?"Betrag":title} eingeben` : placeholder}
                value={ type!=="number" ? value : value == null ? " " : focused?value.toString():value.toFixed(2) }
                onChange={event => {
                    if(type!=="number") return setValue(event.target.value);
                    
                    let newValue = parseFloat(event.target.value);
                    setValue(isNaN(newValue)?null:Math.max(Math.floor(newValue*100+0.01)/100,0));
                }}
                onKeyPress={event => {
                    if(type!=="number") return;
                    if(!/[0-9|,|.]/.test(event.key)) event.preventDefault();
                }}
                onBlur={()=>{setFocused(false);}}
                onFocus={()=>{setFocused(true);}}
            />
        )
    }

    return(
        <Form.Group controlId={title} className={className}>
            {/* { <Form.Label>{title}</Form.Label> } */}
            <InputGroup>
                {title!=="" ? <FloatingLabel className="col" controlId="floatingInput" label={title}>{renderInput()}</FloatingLabel> : renderInput()}
                { type==="number" && <InputGroup.Text className="col-auto">  €</InputGroup.Text> }
            </InputGroup>
        </Form.Group>
    );
}