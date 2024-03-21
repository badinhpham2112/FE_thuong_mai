import React from "react";
import Logo from '../../assets/image/Logo.png'

import {StyleNameProduct, WrapperReportText, WrapperPriceText, WrapperDiscountText, WapperCardStyle, WrapperOldPrice} from "./style";
import {StarOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../Utils";





    const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, discount, selled, id} =props;
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/Product-details/${id}`);

    }
    
    return(
        <WapperCardStyle
        hoverable
        headStyle={{with: '200px', height: '200px'}}
        style={{ width: 195 }}
        bodyStyle={{padding: '10px'}}
        cover={<img alt="example" src={image} 
       />}
       onClick={() => countInStock !==0 && handleDetailsProduct(id)}
       disabled={countInStock===0}
      >
        <img src={Logo} style={{width: '68px', height: '14px', position: 'absolute', top: '-1px', left: '-1px', borderTopLeftRadius: '6px'}}/>
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReportText>
            <span style={{paddingRight: '5px'}}>
            <span>{rating}</span><StarOutlined style={{fontSize: '15px', color: 'yellow'}} />
            </span> 
            <span style={{borderLeft: '2px solid #C7C7C7', paddingLeft: '6px'}}>Đã bán {selled ||1000}+</span>

        </WrapperReportText>

        <WrapperOldPrice>
           <span style={{marginRight: '8px'}}>{discount ?  <span style={{textDecoration: 'line-through'}}>{convertPrice(price)}</span> : ''}</span> 
        </WrapperOldPrice>

        <WrapperPriceText>
           <span style={{marginRight: '8px'}}>{discount ? convertPrice(price - ((price * discount) / 100)) : convertPrice(price)}</span> 
        <WrapperDiscountText>- {discount || 0}%</WrapperDiscountText>
        </WrapperPriceText>
        </WapperCardStyle>

      
    )
}

export default CardComponent;