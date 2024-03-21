import styled from "styled-components";
import { Col } from 'antd'
export const WapperProducts = styled.div `
    // display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 20px;
    flex-wrap: wrap;
    display: -webkit-box;
    background: WHITE;
    padding: 15px;
    border-radius: 10px;
`

export const WapperNavbar = styled(Col)
`
    background: #fff; 
    margin-right: 10px; 
    padding: 10px;
    border-radius: 5px;
    height: fit-content;
    margin-top: 20px;
    width: 200px
`
export const WapperStar = styled.div `
color: rgb(253, 216, 54)
`