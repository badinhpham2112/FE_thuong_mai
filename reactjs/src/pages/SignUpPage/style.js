import styled from "styled-components";
export const WrapperContainerLeft = styled.div `
    flex: 1;
    display: flex; 
    flex-direction: column;
    padding: 40px 45px 24px;
`
export const WrapperContainerRight = styled.div `
    width: 300px;
    background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-radius: 0px 20px 20px 0px;
    gap: 4px;
    margin-left: auto;
`

export const WrapperContainer = styled.div `
    display: flex; 
    align-items: center;
    justify-content: center; 
    background: rgba(0, 0, 0, 0.53); 
    height: 100vh;
`

export const WrapperContainerBorder = styled.div `
    width: 800px; 
    height: 445px; 
    border-radius: 10px; 
    background: #fff;
    display: flex;
`

export const WrapperContainerText = styled.p `
    font-size: 15px;
    line-height: 20px; 
    margin: 0;
    padding-right: 3px;
    padding-bottom: 25px;
    
`

export const WrapperContainerTextContent1 = styled.p `
    color: rgb(13, 92, 182); 
    font-size: 13px;
    margin: 20px 0 0;
    cursor: pointer; 
    display: inline-block;
`

export const WrapperContainerTextContent2 = styled.p `
    color: rgb(120, 120, 120); 
    font-size: 13px;
    margin: 10px 0 0;
`