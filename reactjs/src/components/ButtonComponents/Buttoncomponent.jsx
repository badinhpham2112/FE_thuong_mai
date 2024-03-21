import React from "react";
import {Button} from 'antd';


const Buttoncomponent = ({size, styleButton, styleTextButton, disabled, textButton, ...rests}) => {
    return(
        
        <Button 
        style = {{
            ...styleButton,
            background: disabled ? '#ccc' : styleButton.background
        }}
        size = {size} 
        {...rests}

         >
        <span style={styleTextButton}>{textButton}</span>
        </Button>

        
       
    )
}

     

export default Buttoncomponent;