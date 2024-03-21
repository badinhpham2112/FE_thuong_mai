import React, {useEffect, useState} from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import {Row, Col, Pagination} from 'antd'
import {WapperProducts, WapperNavbar} from './style';
import { useLocation } from "react-router-dom";
import * as ProductService from '../../Service/ProductService.js';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useSelector} from 'react-redux';
import { useDebounce } from "../../hooks/useDebounce";
import ProductDetailPageComponents from "../../components/ProductDetailPageComponents/ProductDetailPageComponents";

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500);
    const {state} = useLocation();
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(false)
    const [panigate, setpanigate] = useState({
        page: 0,
        limit: 10,
        total: 1
    })

 
    const fetchProductType = async (type, page, limit) => {
        setLoading(true)
       const res = await ProductService.getProductType(type, page, limit);
       if(res?.status === 'OK'){
        setLoading(false)
        setProduct(res?.data)
        setpanigate({...panigate, total: res?.totalPage})
       }else{
        setLoading(false)
        

       }
       console.log('res: ', res)
        
    }

    
    useEffect(() => {
        if(state){
            fetchProductType(state, panigate.page, panigate.limit)
        }
       

    }, [state, panigate.page, panigate.limit])

    const onchange = (current, pageSize) =>{
        console.log('page', current, pageSize)
        setpanigate({...panigate, page: current -1, limit: pageSize})
    }

    console.log('searchProduct: ', searchProduct)

    

    console.log('loading: ', loading)
    return(
        <LoadingComponent isLoading={loading}>
        <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 64px)'}}>
            <div style={{width: '1270px', margin: '0 auto', height: '100%', maxWidth: '100%'}}>
            <Row style={{flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)'}}>
            <WapperNavbar span={4}>
            <NavbarComponent/>
            </WapperNavbar>
            <Col span={20} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <WapperProducts>

                {products?.filter((pro) =>{
                    if(searchDebounce === '') {
                        return pro
                    }else if(pro?.name.toLowerCase().includes(searchDebounce.toLowerCase())){
                        return pro
                    }
                })?.map((product) =>{
                    return(
                      
                          <CardComponent
                        key={product._id} countInStock={product.countInStock} 
                        description={product.description} image = {product.image} 
                        name={product.name} price = {product.price} 
                        rating = {product.rating} type = {product.type}
                        discount={product.discount} selled = {product.selled} 
                        id={product._id}/>

                        
                       
                      
                    )
                })}
           
            </WapperProducts>
            <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onchange} style={{textAlign: 'center', marginTop: '10px'}}/>

            </Col>
           
        </Row>
       
            </div>
       
        </div>
        </LoadingComponent>
    )
}

export default TypeProductPage