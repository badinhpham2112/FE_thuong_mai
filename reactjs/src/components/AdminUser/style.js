import styled from "styled-components";
import { Upload } from 'antd';

export const WrapperHeader = styled.h1 `
        font-size: 14px;
        color: #000;
`

export const WrapperUploadFile = styled(Upload)
`
  & .ant-upload-list-item-container {
        display: none;
    }
`