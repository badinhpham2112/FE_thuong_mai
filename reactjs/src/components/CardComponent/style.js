import styled from "styled-components";
import { Card } from 'antd';


export const WapperCardStyle = styled(Card)
`
    width: 200px;
    & img{
        height: 200px;
        width: 200px

    },
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' :  'prointer'}
`

export const StyleNameProduct = styled.div `
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    color: rgb(39, 39, 42);
    margin: 0px;
    word-break: break-word;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const WrapperReportText = styled.div `
    display: flex;
    align-items: center;
    color: rgb(128, 128, 137);
    line-height: 150%;
    font-size: 12px;
    padding-left: 4px;
    margin-top: 10px;
`

export const WrapperPriceText = styled.div `
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    margin-top: 6px;
    color: rgb(255, 66, 78);
    display: flex;
    -webkit-box-align: center;
    align-items: center;

   
`

export const WrapperDiscountText = styled.span `
    padding: 0px 2px;
    line-height: 16px;
    font-size: 12px;
    font-weight: 500;
    margin-left: 4px;
    color: rgb(255, 66, 78);
    margin-top: 3px;
   
`

export const WrapperOldPrice = styled.div `
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    margin-top: 6px;
    color: rgb(255, 66, 78);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(180, 180, 180);
    border-radius: 5px

   
`