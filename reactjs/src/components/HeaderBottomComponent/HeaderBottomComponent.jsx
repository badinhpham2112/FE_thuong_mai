import React from "react";
import {WrapperContainer, WrapperBody, WrapperContent1, WrapperContent2, WrapperContent3, WrapperContent4,
     WrapperTextContent2, WrapperTextContent1, WrapperTiTle, WrapperTime, WrapperTextContent3} from "./style";
import {PhoneFilled, MailFilled } from '@ant-design/icons';
const HeaderBottomComponent = () => {
    return(
        <WrapperContainer>
            <WrapperBody>
                <WrapperContent1>
                    <WrapperTextContent1>Sản phẩm nhằm mục đích học tập không mang tích chất buôn bán. 
                        Sản phẩm đã qua chỉnh sửa và thêm nhiều chi tiết để phù hợp và đẹp hơn</WrapperTextContent1>
                    <WrapperTextContent2>
                        <span><PhoneFilled style={{color: "rgb(26, 148, 255)", padding: '0px 5px 0px 0px'}} /></span> 
                        0328060240
                    </WrapperTextContent2>
                    <WrapperTextContent2>
                        <span><MailFilled style={{color: "rgb(26, 148, 255)", padding: '0px 5px 0px 0px'}}/></span>
                        phamdinhba09112002@gmail.com
                    </WrapperTextContent2>
                </WrapperContent1>


                <WrapperContent2>
                    <WrapperTiTle>Hỗ trợ khách hàng</WrapperTiTle>
                    <WrapperTextContent3>Trang chủ</WrapperTextContent3>
                    <WrapperTextContent3>Giới thiệu</WrapperTextContent3>
                    <WrapperTextContent3>sản phẩm</WrapperTextContent3>
                    <WrapperTextContent3>Liên hệ tin tức</WrapperTextContent3>
                </WrapperContent2>

                <WrapperContent3>
                    <WrapperTiTle>Chính sách</WrapperTiTle>
                    <WrapperTextContent3>Trang chủ</WrapperTextContent3>
                    <WrapperTextContent3>Giới thiệu</WrapperTextContent3>
                    <WrapperTextContent3>sản phẩm</WrapperTextContent3>
                    <WrapperTextContent3>Liên hệ tin tức</WrapperTextContent3>
                </WrapperContent3>

                <WrapperContent4>
                    <WrapperTiTle>Giờ mở cửa</WrapperTiTle>
                    <WrapperTime>Từ 8h đến 20h tất cả các ngày trong tuần(bao gồm cả ngày lễ tết)</WrapperTime>
                    <WrapperTiTle>Góp ý khiếu nại</WrapperTiTle>
                    <WrapperTextContent2>
                        <span><PhoneFilled style={{color: "rgb(26, 148, 255)", padding: '0px 5px 0px 0px'}} /></span> 
                        0328060240
                    </WrapperTextContent2>
                </WrapperContent4>
            </WrapperBody>

           
        </WrapperContainer>
    )
}

export default HeaderBottomComponent;