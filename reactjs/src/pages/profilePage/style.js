import styled from "styled-components";
import { Upload } from 'antd';

export const WrapperContainer = styled.div `
        width: 1270px;
        margin: 0 auto;
        max-width: 100%;
        margin-bottom: 55px;
`
export const WrapperHeader = styled.h1 `
        color: #000;
        font-size: 20px;
        margin: 4px 0;
`

export const WrapperContentProfile = styled.div `
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        width: 475px;
        margin: 0 auto;
        padding: 30px;
        border-radius: 10px;
        gap: 30px;
        align-items: center;
}
`

export const WrapperLabel = styled.label `
        color: #000;
        font-size: 16px;
        line-height: 15px;
        font-weight: 600;
        width: 60px;
        text-align: left;

`

export const WrapperInput = styled.div `
        display: flex;
        align-items: center;
        gap: 20px
`
export const WrapperUploadFile = styled(Upload)
`
  & .ant-upload-list-item-container {
        display: none;
    }
`