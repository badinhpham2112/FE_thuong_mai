import { Checkbox, Radio } from "antd";
import styled from "styled-components";



export const WrapperContainer = styled.div `
  width: 100%;
`

export const WrapperListOrder = styled.div `

`

export const WrapperItemOrder = styled.div `
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
`






export const WrapperInfo = styled.div `
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;


`




export const Lable = styled.span `
  font-size: 12px;
  color: #000;
  font-weight: bold
`

export const WrapperRadio = styled(Radio.Group)
`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 500px;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display:flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`

export const WrapperValue = styled.div `
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225 ,255);
  padding: 10px;
  width: fit-content;
  border-radius: 5px;
  margin-top: 10px;
`

export const WrapperItemInfo = styled.div `
   padding: 17px 20px;
   border-bottom: 1px solid #f5f5f5;
   background: #fff;
   border-top-right-radius: 6px;
   border-top-left-radius: 6px;
`