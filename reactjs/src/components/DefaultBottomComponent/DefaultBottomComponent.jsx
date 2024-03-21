import React from "react";
import HeaderBottomComponent from "../HeaderBottomComponent/HeaderBottomComponent";

const DefaultBottomComponent = ({children}) => {
    return(
        <div>
            <HeaderBottomComponent/>
            {children}
        </div>
     
    )
}

export default DefaultBottomComponent;