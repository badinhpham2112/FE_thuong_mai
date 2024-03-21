import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {WapperTypeProduct, WapperButtonMore, WapperProducts, WapperProductlist, WapperProductline, WapperProductText, WapperProductLatest} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slide01 from '../../assets/image/Slide01.png';
import slider02 from '../../assets/image/Slider02.png';
import slider04 from '../../assets/image/Slider04.png';
import slider05 from '../../assets/image/Slider05.png';
import slider06 from '../../assets/image/Slider06.png';
import CardComponent from "../../components/CardComponent/CardComponent";
import {useQuery} from 'react-query'
import * as ProductService from '../../Service/ProductService' 
import { useSelector} from 'react-redux';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useDebounce } from "../../hooks/useDebounce";
import LatestProduct from "../../components/LatestProduct/LatestProduct";
import { FacebookFilled } from '@ant-design/icons';

const HomePage = () => {
  const searchProduct = useSelector((state) => state.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([])
 
    
  const fetchProductAll = async (context) => {

     
      const limit = context?.queryKey && context?.queryKey[1];
      const search = context?.queryKey && context?.queryKey[2];
      const res = await ProductService.getAllProduct(search, limit)
        return res;
   
      
    }

    const fetAllTypeProduct = async () => {
      const res = await ProductService.getAllTypeProduct();
      if(res?.status === 'OK'){
        setTypeProducts(res?.data)
      }
   
    
    } 
 
    useEffect(() => {
      fetAllTypeProduct();
    }, [])
    const {isLoading, data: products, isPreviousData} = useQuery(['products', limit, searchDebounce], fetchProductAll, {retry: 3, retryDelay: 1000, keepPreviousData: true})
  
    return(
      <LoadingComponent isLoading={isLoading || loading}>
        
         <div style={{ width: '1270px', margin: '0 auto', maxWidth: '100%'}}>
              <WapperTypeProduct>
                {typeProducts.map((item) => {
                return(
                    <TypeProduct name={item} key = {item} />
                )
                })}
              </WapperTypeProduct>
          </div>

          <div className="body" style={{width:'100%', backgroundColor: '#efefef'}}>
             <div id="container" style={{height: '100%', width: '1270px', margin: '0 auto', maxWidth: '100%'}}>
                   <SliderComponent arrImages = {[slide01, slider02, slider04, slider05, slider06]} />
                    
                   <WapperProductlist>
                      <WapperProductline></WapperProductline>
                      <WapperProductText>* Sản phẩm mới nhất *</WapperProductText>
                      <WapperProductline></WapperProductline>
                   </WapperProductlist>
                  
                   <WapperProductLatest>
                      <LatestProduct/>
                   </WapperProductLatest>  
                   
                   <WapperProductlist>
                      <WapperProductline></WapperProductline>
                      <WapperProductText>* Tất cả sản phẩm *</WapperProductText>
                      <WapperProductline></WapperProductline>
                   </WapperProductlist>

                   <WapperProducts>
                    {products?.data?.map((product) => {
                      return(
                         <CardComponent 
                         key={product._id} countInStock={product.countInStock} 
                         description={product.description} image = {product.image} 
                         name={product.name} price = {product.price} 
                         rating = {product.rating} type = {product.type}
                         discount={product.discount} selled = {product.selled} 
                         id={product._id}
                        />
                      )
                    })}
                      
                  </WapperProducts>
              <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '20px 0'}}>
              <WapperButtonMore textButton={isPreviousData ? 'Load More' : "Xem Thêm"} type = "outline" styleButton={{
                border: `${products?.total === products?.data?.length ? '#ccc' : '1px solid rgb(11, 116,229)'}`, 
                color: 'rgb(11, 116, 229)',
                width: '240px', height: '38px', 
                borderRadius: '4px'
              }}
              disabled={products?.total === products?.data?.length || products.totalPage === 1}
                styleTextButton={{fontWeight: 500, color: products?.total === products?.data?.length && '#fff'}}
                onClick={() => setLimit((prev) => prev + 6)}
                />
              </div>
          </div>
        </div>
        
      </LoadingComponent>
        
       
    )
}

export default HomePage