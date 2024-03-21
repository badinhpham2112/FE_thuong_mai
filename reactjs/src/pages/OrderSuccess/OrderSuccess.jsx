import {Checkbox, Form , Radio} from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemInfo } from './style';


import { useSelector, useDispatch} from 'react-redux';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../Utils';



const OrderSuccess = () => {

    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
   
    const location = useLocation();
    console.log('location: ', location)
    const {state} = location
   


    return (
        
        <div style={{background: '#f5f5fa', width: '100%', height: '100vh'}}>
            <LoadingComponent isLoading={false}>
            <div style={{height: '100%', width: '1270px', margin: '0 auto', maxWidth: '100%'}}>
                <h3>Đặt hàng thành công</h3>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <WrapperContainer>
                        <WrapperInfo>
                            <div>
                                <Lable>phương thức giao hàng</Lable>
                                
                                    <WrapperValue>
                                        <span style={{color: '#ea8500', fontWeight: 'bold'}}>{orderContant.delivery[state?.delivery]}</span>Giao hàng tiết kiệm

                                    </WrapperValue>
                             
                            </div>
                        </WrapperInfo>

                        <WrapperInfo>
                            <div>
                                <Lable>Chọn phương thức thanh toán</Lable>
                             
                                <WrapperValue>
                                        {orderContant.payment[state?.payment]}
                                </WrapperValue>
                            </div>
                        </WrapperInfo>

                        <WrapperItemInfo>
                            {state?.order?.map((order) => {
                                return(
                                    <WrapperItemOrder key={order.name}>
                                  <div style={{width: '390px', display: 'flex', alignItems: 'center', gap: 4}}>
                                      <img src={order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}} />
                                      <div 
                                      style={{width: '260px',
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              whiteSpace: 'nowrap'}}>{order?.name}</div>
                                  </div>
  
                                  <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                                      <span>
                                          <span style={{fontSize: '13px', color: '#242424'}}>{order?.discount ? convertPrice((order?.price - ((order?.price * order?.discount) / 100))) : convertPrice(order?.price)}</span>
                                      </span>
  
                                      <span>
                                          <span style={{fontSize: '16px', color: '#242424', color: 'red'}}> x {order?.amount}</span>
                                      </span>

                                      
                                  </div>
                              </WrapperItemOrder>

                                )
                                  

                            })}
                          
                               
                        </WrapperItemInfo>
                        <div style={{marginTop: '15px', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}>
                            <span style={{fontSize: '16px', color: '#242424', color: 'red'}}>Tổng tiền {convertPrice(state?.totalPriceMemo)}</span>
                        </div>
                                    
                    </WrapperContainer>

                </div>
              

            </div>
           

            </LoadingComponent>

        </div>
       
       
    )
}

export default OrderSuccess;