import React, { useEffect, useMemo, useState } from "react";
import {Row, Col, Image,  Rate } from "antd";
import image1 from '../../assets/image/image1.webp';
import image2 from '../../assets/image/image2.webp';
import { MinusOutlined, PlusOutlined,} from '@ant-design/icons';
import {WrapperStyleImageSmall, WrapperStyleColImage, 
        WrapperStyleNameProduct, WrapperPriceProduct, 
        WrapperPriceTextProduct, WrapperPriceMapProduct,
        WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct } from './style'
import Buttoncomponent from "../ButtonComponents/Buttoncomponent";
import * as ProductService from '../../Service/ProductService';
import { useQuery } from 'react-query'
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import {addOrderProduct, resetOrder} from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../Utils";
import *as message from '../Message/Message';
import LikeButtonComponents from "../LikeButtonComponents/LikeButtonComponents";
import CommentComponent from "../CommentComponent/CommentComponent";

const MAX_DESCRIPTION_LENGTH = 100; 

const ProductDetailPageComponents = ({idProduct}) => {
    const [numProduct, setNumProduct] = useState(1);
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state?.order)
    
    // const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    console.log('user: ', user)
    const [showFullDescription, setShowFullDescription] = useState(false);
   
    
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)
    const navigate = useNavigate();
    const loaction = useLocation();
    const dispatch = useDispatch();
   
    
    const onChange = (value) => {
        setNumProduct(Number(value))

    }

    const fetchgetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if(id){
            const res = await ProductService.getDetailsProduct(id)
            return res.data;

        }
      
       
      }

      useEffect(() => {
        initFacebookSDK()
      }, [])
    
      useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item?.product === ProductDetails?._id)
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && ProductDetails?.countInStock > 0)){
            setErrorLimitOrder(false);
        }else if(ProductDetails?.countInStock === 0){
           
            setErrorLimitOrder(true);
        }
        
      },[numProduct])
    
    useEffect(() => {
        if(order?.isSucessOrder){
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])

    const handleChangeCount = (type, limited) => {
        console.log('type: ', type)
        if(type === 'increase'){
            if(!limited) {
                  setNumProduct(Number(numProduct + 1));
            }
            
        }else if(type === 'decreatse'){
            if(!limited) {
                setNumProduct(Number(numProduct - 1));

            }
           
        }

    } 
  
    const {isLoading, data: ProductDetails} = useQuery(['product-details', idProduct], fetchgetDetailsProduct, 
    {enabled: !!idProduct})
 

    const handleAddOderProduct = () => {
        if(!user?.id){
            navigate('/sign-in', {state: loaction?.pathname});
        }else{
           
            const orderRedux = order?.orderItems?.find((item) => item?.product === ProductDetails?._id)

            if((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && ProductDetails?.countInStock > 0 )){
            dispatch(addOrderProduct({
                orderItem: {
                    token: user?.access_token,
                    userId: user?.id,
                    name : ProductDetails?.name,
                    amount: numProduct,
                    image: ProductDetails?.image,
                    price: ProductDetails?.price,
                    product: ProductDetails?._id,
                    discount: ProductDetails?.discount,
                    countInStock: ProductDetails?.countInStock,
                }
            }))

            }else {
                setErrorLimitOrder(true);
            }

        }
    }

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
      };
    
      // const hiddenDescription = () => {
      //   setShowFullDescription(showFullDescription);
      // };

      const renderDescription = () => {
        
        if (showFullDescription || ProductDetails?.description.length <= MAX_DESCRIPTION_LENGTH) {
          return ProductDetails?.description?.split('-').map((item, index) => (
            <React.Fragment key={index}>
              {item}
              <br />
            </React.Fragment>
          ));
        }
    
        const truncatedDescription = ProductDetails?.description?.substring(0, MAX_DESCRIPTION_LENGTH);
        
        
        return (
          <>
            {truncatedDescription}
            <span onClick={toggleDescription} style={{ color: 'blue', cursor: 'pointer' }}>
              ...Xem thêm
            </span>
          </>
        );
      };



  


    return(
        <LoadingComponent isLoading={isLoading}>
        <Row style={{padding: '16px', background: '#fff', borderRadius: '4px', height: '100%'}}>
        <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
            <Image src={ProductDetails?.image} alt="image product" preview={false}/>

      
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }}>
            <WrapperStyleNameProduct>{ProductDetails?.name}</WrapperStyleNameProduct>
            <div>
            <Rate disabled defaultValue={ProductDetails?.rating} value={ProductDetails?.rating} />
         
            
            <span style={{fontSize: '15px', lineHeight: '24px', color: 'rgb(120, 120, 120)'}}> | {ProductDetails?.selled || 1000}+</span>
            </div>

            <WrapperPriceProduct>
                {/* <WrapperPriceTextProduct>{convertPrice(ProductDetails?.price)}</WrapperPriceTextProduct> */}
                <WrapperPriceTextProduct>{ProductDetails?.discount ? convertPrice(ProductDetails?.price - ((ProductDetails?.price * ProductDetails?.discount) / 100)) : convertPrice(ProductDetails?.price)}</WrapperPriceTextProduct>
                
            </WrapperPriceProduct>

            <WrapperPriceMapProduct>
                <span>Giao đến </span>
                <span className="address">{user?.address}</span>
             
            </WrapperPriceMapProduct>

            <LikeButtonComponents 
            dataHref = {process.env.REACT_APP_IS_LOCAL 
                        ? "https://developers.facebook.com/docs/plugins/" 
                        : window.location.href}/>
            
            <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5' }}>
                <div style={{fontSize: '20px', fontWeight: '500', paddingBottom: '10px'}}>Thông tin sản phẩm:</div>
                <div style={{fontSize: '15px', lineHeight: '25px'}}>{renderDescription()}</div>
                
            </div>
            <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                <p style={{fontSize: '15px', lineHeight: '1.6'}}>Số lượng</p>
                <WrapperQualityProduct>  
                    <button style={{border: 'none', background: '#fff', outline: 'none', cursor: 'pointer'}} onClick={() => handleChangeCount('decreatse', numProduct === 1)}>        
                    <MinusOutlined style={{color: '#000', fontSize: '16px'}}/>
                    </button>     
                    <WrapperInputNumber onChange={onChange} defaultValue={1} min={1} max={ProductDetails?.countInStock} value={numProduct}/>
                    <button style={{border: 'none', background: '#fff', outline: 'none', cursor: 'pointer'}} onClick={() => handleChangeCount('increase')}>
                    <PlusOutlined style={{color: '#000', fontSize: '16px'}} />
                    </button>
                
                </WrapperQualityProduct>
            </div>

            <div style={{display: 'flex', gap: '12px', marginTop: '16px'}}>
              
                {/* <Buttoncomponent 
                //   onClick={() => handleAddCard()}
                  styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '221px', 
                    border: 'none',
                    outline: 'none'
                  }} 
                  styleTextButton={{color: '#fff', fontWeight: '600'}}
                  textButton = {'Mua hàng'}>
                </Buttoncomponent> */}

                <div>
                <Buttoncomponent 
                  styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '230px', 
                    border: 'none',
                    outline: 'none'
                  }} 
                  onClick={handleAddOderProduct}
                  styleTextButton={{color: '#fff', fontWeight: '600'}}
                  textButton = {'Thêm vào giỏ hàng'}>
                </Buttoncomponent>
                {errorLimitOrder && 
                <div style={{color: 'red'}}>Sản phẩm đã hết hàng</div>
                }
                </div>
            </div>

            
        </Col>
          
       
      
       </Row>
      
       </LoadingComponent>
    )
}

export default ProductDetailPageComponents



