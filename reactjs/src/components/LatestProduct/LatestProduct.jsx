import React, { useEffect } from "react";
import { useQuery } from 'react-query';
import Logo from '../../assets/image/Logo.png'
import { StarOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../Utils";
import * as ProductService from '../../Service/ProductService';


import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WapperCardStyle,
  WrapperOldPrice,
  WrapperSliderStyle,
  WapperContainer
} from "./style";


const LatestProduct = (props) => {
  const fetAllLatestProduct = async () => {
    const res = await ProductService.getLatestProduct();
    return res.data; 
  }

  const { isLoading, data: products } = useQuery({queryKey:['products'], queryFn: fetAllLatestProduct});
  // const customSlidesToShow = 6;
  // const customSlidesToScroll = 1;
  

  useEffect(() => {
    fetAllLatestProduct();
  }, [])
  
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
        navigate(`/Product-details/${id}`);
    
    }

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    };
   
  return (
    <WrapperSliderStyle {...settings}>
     {Array.isArray(products) && products?.map((product) => { 
        const { countInStock, description, image, name, price, rating, type, discount, selled, id = product?._id } = product;
        return (
          <WapperContainer>
            <WapperCardStyle
            key={id} 
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 195 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={image} />}
            onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
            disabled={countInStock === 0}
          >
            <img src={Logo} style={{ width: '68px', height: '14px', position: 'absolute', top: '-1px', left: '-1px', borderTopLeftRadius: '6px' }} alt="logo" />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
              <span style={{ paddingRight: '5px' }}>
                <span>{rating}</span><StarOutlined style={{ fontSize: '15px', color: 'yellow' }} />
              </span>
              <span style={{ borderLeft: '2px solid #C7C7C7', paddingLeft: '6px' }}>Đã bán {selled || 1000}+</span>
            </WrapperReportText>

            <WrapperOldPrice>
              <span style={{ marginRight: '8px' }}>{discount ? <span style={{ textDecoration: 'line-through' }}>{convertPrice(price)}</span> : ''}</span>
            </WrapperOldPrice>

            <WrapperPriceText>
              <span style={{ marginRight: '8px' }}>{discount ? convertPrice(price - ((price * discount) / 100)) : convertPrice(price)}</span>
              <WrapperDiscountText>- {discount || 0}%</WrapperDiscountText>
            </WrapperPriceText>
          </WapperCardStyle>

          </WapperContainer>
      
  
        );
      })}
   </WrapperSliderStyle>
  );
}

export default LatestProduct;
