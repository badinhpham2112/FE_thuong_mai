import React from "react";
import {Input} from 'antd';
import {WrapperInputStyle} from './style'


const InputForm  = (props) => {
    const {placeholder = 'Nhập text', ...rests } = props;
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
        
    }
    return(  
        <>
            <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput}>
       
            </WrapperInputStyle>


        </>
        
    )
}

export default InputForm;