import React from "react";
import {Image} from 'antd';
import {WrapperSliderStyle} from './style'




const SliderComponent = ({arrImages, customSlidesToShow, customSlidesToScroll}) => {
    const slidesToShow = customSlidesToShow || 1;
    const slidesToScroll = customSlidesToScroll || 1;  
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        autoplay: true,
        autoplaySpeed: 3000
      };
    return(
      
        <WrapperSliderStyle {...settings}>
            {arrImages.map((images) => {
                return(
                    <Image key = {images} src={images} alt="slider" preview={false} width="100%" height="274px"/>
                )
            })}

        </WrapperSliderStyle>


     

    )
}

export default SliderComponent;