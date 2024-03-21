import styled from "styled-components";
import { Image, Col, InputNumber } from 'antd'
export const WrapperStyleImageSmall = styled(Image)
`
height: 64px!important;
width: 64px!important;
// margin-right: 12px;
border-radius: 5px;
position: relative;
cursor: pointer;
overflow: hidden;
`

export const WrapperStyleColImage = styled(Col)
`
flex-basis: unset;
display: flex;

`

export const WrapperStyleNameProduct = styled.h1 `
color: #000;
font-size: 24px;
line-height: 32px;
font-weight: 400;
margin: 0 0 4px;
`

export const WrapperPriceProduct = styled.div `
background-color: rgb(250, 250, 250);
border-radius: 5px
`

export const WrapperPriceTextProduct = styled.h1 `
font-size: 32px;
line-height: 40px;
margin-right: 8px;
font-weight: 500;
color: rgb(255, 66, 78);
padding : 10px
`

export const WrapperPriceMapProduct = styled.div `
span.address{
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
},
span.address-change{
    color: rgb(11, 116, 229);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
}
`
export const WrapperQualityProduct = styled.div `
display: flex;
-webkit-box-align: center;
align-items: center;
margin-top: 8px;
border: 1px solid #efefef;
width: 100px;
height: 30px;
justify-content: center;
border-radius: 4px;
`



export const WrapperInputNumber = styled(InputNumber)
`
   
    width: 40px;
    border-top: none;
    border-bottom: none;
    border-radius: initial;
    .ant-input-number-handler-wrap{
        display: none;
    }

`