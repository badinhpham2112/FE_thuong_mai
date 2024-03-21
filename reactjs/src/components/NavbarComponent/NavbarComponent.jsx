import React, { useEffect, useState } from "react";
import {WapperLableTex, WapperTextValue, WapperContent, WapperTextPrice} from "./style";
import { Checkbox, Rate } from 'antd';
import TypeProduct from "../TypeProduct/TypeProduct";
import {useQuery} from 'react-query'
import * as ProductService from '../../Service/ProductService' 


const NavbarComponent = () => {
    let onChange = { }
    
    const [typeProducts, setTypeProducts] = useState([])
    const fetAllTypeProduct = async () => {
        const  res = await ProductService.getAllTypeProduct();
        if(res?.status === 'OK'){
          setTypeProducts(res?.data)
        }
    }
    
    useEffect(() => {
        fetAllTypeProduct();
      }, [])
      const {isLoading, data: products, isPreviousData} = useQuery(['products'], {retry: 3, retryDelay: 1000, keepPreviousData: true})
    const renderContent = (type, options) => {
        switch(type){
            case 'text':
                return options.map((option) => {
                     return (
                        <WapperTextValue>{option}</WapperTextValue> 
                    )
                })
            case 'checkbox': 
                 return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection:'column' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox value={option.value}>{option.label}</Checkbox>
                            )
                        })}

                  </Checkbox.Group>
                 )


             case 'star': 
                 return (
                   
                        options.map((option) => {
                            return (
                                <div style={{display: 'flex', gap: '4px'}}>
                                <Rate style={{fontSize: '12px'}} disabled defaultValue={option} />
                                <span>{`Từ ${option} sao`}</span>
                                </div>
                               
                            )
                        })

                 
                 )

                 case 'price': 
                 return (
                   
                        options.map((option) => {
                            return(
                                <WapperTextPrice>{option}</WapperTextPrice>
                            )
                        })
                 )

                 
                 
            default:
                return{}
        }
    }
    return(
        <div>
            <WapperLableTex>Tất cả mặt hàng</WapperLableTex>
             
            <WapperContent>
            {typeProducts.map((item) => {
                return(
                    <TypeProduct name={item} key = {item} />
                )
                })}
            </WapperContent>
            
        </div>
        
    )
}

export default NavbarComponent;