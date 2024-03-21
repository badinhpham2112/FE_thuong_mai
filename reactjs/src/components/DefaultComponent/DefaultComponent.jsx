import React from "react";
import HeaderConponents from "../HeaderComponents/HeaderConponents";

const DefaultComponent = ({children}) => {
    return(
        <div>
            <HeaderConponents/>
            {children}
        </div>
    )
}

export default DefaultComponent;