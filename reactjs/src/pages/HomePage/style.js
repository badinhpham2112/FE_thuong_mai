import styled from "styled-components";
import Buttoncomponent from "../../components/ButtonComponents/Buttoncomponent";
export const WapperTypeProduct = styled.div `
display: flex;
align-items: center;
gap: 24px;
justify-content: flex-start;
height: 44px;
`

export const WapperButtonMore = styled(Buttoncomponent)
`
    &:hover{
        color: #fff;
        background: rgba(13, 92, 182, 0.12) !important;
        opacity: 1 !important;
        span{
            color: #fff;
        }

    }
   width: 100%;
   text-align: center;
   cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'}
   
   
`
export const WapperProducts = styled.div `
    display: flex;
    gap: 16px;
    margin-top: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    
`

export const WapperProductLatest = styled.div `
    margin-top: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    
`


export const WapperProductlist = styled.div `
    display: flex;
    align-items: center;
    margin-top: 15px;
    
`

export const WapperProductline = styled.span `   
    flex-grow: 1;
    height: 2px;
    background-color: black;
    
`

export const WapperProductText = styled.span `   
    margin: 0 10px;
    white-space: nowrap;
    font-size: 18px;
    font-weight: 500;
    background-color: #ffa08c;
    border-radius: 20px;
    padding: 5px;
    
    
`