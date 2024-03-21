import {Checkbox, Form , Radio} from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { Lable, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from './style';

import { useSelector, useDispatch} from 'react-redux';
import {  removeALllOrderProduct, selectedOder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../Utils';
import Buttoncomponent from '../../components/ButtonComponents/Buttoncomponent';
import ModalComponents from "../../components/ModalComponents/ModalComponents";
import InputComponent from '../../components/InputComponents/InputComponent';

import { useUserMutation } from '../../hooks/userMutationHook';
import *as UserService  from '../../Service/UserService.js'
import *as orderService  from '../../Service/orderService'
import *as PaymentService  from '../../Service/PaymentService'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import *as message from '../../components/Message/Message'

import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";



const PaymentPage = () => {

    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [delivery, setDelivery] = useState('fast')
    const [payment, setPayment] = useState('later_money')
    const navigate = useNavigate()
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [sdkReady, setSdkReady] = useState(false)
   



   


    const [stateUserDetails, setStateUserDetails] = useState({
        name: '', 
        phone: '',
        address: '',
        city: ''
        
    })
    const [form] = Form.useForm();

    const handleCancelUpdate = () => {
        setIsOpenModalUpdateInfo(false)
        setStateUserDetails({
            name: '', 
            phone: '',
            address: '',
            city: '',
          
          })
          form.resetFields()
    }



 
    

    const mutationUpdate = useUserMutation(
        
        (data) => {
          console.log('data: ', data)
            const {
                 id, 
                 token,
                ...rests
                } = data
             const res = UserService.updateUser(
                    id, 
                    token,
                    {...rests},
             )
                return res;
              
        }    
        )
        const {isLoading, data} = mutationUpdate

    const mutationAddorder = useUserMutation(
        
        (data) => {
          console.log('data: ', data)
            const {
                //  id, 
                ...rests
                } = data
             const res = orderService.createOrder(
                    // id,   
                    {...rests},
             )
                return res;
              
        }    
        )
        const {isLoading: isLoadingAddOrder, isSuccess, isError, data: dataAdd} = mutationAddorder
        console.log('dataAdd: ', dataAdd)

        useEffect(() => {
            if(isSuccess && dataAdd?.status == 'OK'){
                const arrayOrdered = [];
                order.orderItemsSelected?.forEach(element => {
                    arrayOrdered.push(element.product)
                })
                dispatch(removeALllOrderProduct({listChecked: arrayOrdered}))
                message.success('Đặt hàng thành công');
                navigate('/orderSuccess', {
                    state:{
                        delivery,
                        payment,
                        order: order?.orderItemsSelected,
                        totalPriceMemo: totalPriceMemo,
                        
                    }
                })
            }else if(isError){
                message.error();
            }
    
          }, [isSuccess, isError])

   


    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
      }, [form, stateUserDetails])

      useEffect(() => {
        if(isOpenModalUpdateInfo){
            setStateUserDetails({
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city,
            })
        }
    }, [isOpenModalUpdateInfo])

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    
    const priceMemo = useMemo(() => {
        if (order && order?.orderItemsSelected && Array.isArray(order?.orderItemsSelected)) {
          const result = order.orderItemsSelected.reduce((total, cur) => {
            
            return cur?.discount ? total + ((cur?.price - ((cur?.price * cur?.discount) / 100)) * cur.amount) : total + (cur?.price * cur.amount);
           
          }, 0);
          return result;
        }
        return 0;
      }, [order]);
      

    const diliveryPriceMemo = useMemo(() => {
        if(priceMemo >= 200000 && priceMemo < 500000){
            return 10000
        }else if(priceMemo >= 500000 || order?.orderItemsSelected?.length === 0){
            return 0;
        }
        else{
            return 20000
        }

    }, [priceMemo])
  
    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) + Number(diliveryPriceMemo);

    }, [priceMemo, diliveryPriceMemo])

    const handleAddOrder = () => {
        if(user?.access_token && order?.orderItemsSelected && user?.name && user?.address && user?.city && user?.phone
            && priceMemo && user?.id){
                mutationAddorder.mutate({ token: user?.access_token, user: user?.id,
                    orderItems: order?.orderItemsSelected, fullName: user?.name, address: user?.address, 
                    city: user?.city ,phone: user?.phone,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: diliveryPriceMemo,
                    totalPrice: totalPriceMemo,
                  
                    })

            }
      

    }

    console.log('data: ', order, user)

    const handleUpdateInfoUser = () => {
        console.log('stateUserDetails: ', stateUserDetails)
        const {name, address, city, phone} = stateUserDetails
        if(name && address && city && phone){
            mutationUpdate.mutate({id: user.id, token: user?.access_token, ...stateUserDetails}, {
                onSuccess: () => {
                    dispatch(updateUser({name, address,city, phone}))
                    setIsOpenModalUpdateInfo(false)
                }
               
              })
        }
    

    }
    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        })

    }
    console.log('stateUserDetails: ', stateUserDetails)
    const handlePayment = (e) => {
        setPayment(e.target.value)

    }
    

    const addPaypalScript = async () => {
        const { data } = await PaymentService.getConfig()
        console.log('data: ', data)
      
        const script = document.createElement('script');
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)

        }
        document.body.appendChild(script);
        
    }

    useEffect(() => {
        // console.log('addPaypalScript: ', addPaypalScript)
        if(!window.paypal){
            addPaypalScript()
        }else{
            setSdkReady(true)
        }
        

    }, [])
   

    const onSuccessPaypal = (details, data) => {
        mutationAddorder.mutate({
             token: user?.access_token,   
             user: user?.id,
            orderItems: order?.orderItemsSelected, fullName: user?.name, address: user?.address, 
            city: user?.city ,phone: user?.phone,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: diliveryPriceMemo,
            totalPrice: totalPriceMemo,
            isPaid: true,
            paidAt: details?.update_time
                  
            })

        console.log('details, data', details, data)

    }
   

    return (
        
        <div style={{background: '#f5f5fa', width: '100%', height: '100vh'}}>
            <LoadingComponent isLoading={isLoading || isLoadingAddOrder}>
            <div style={{height: '100%', width: '1270px', margin: '0 auto', maxWidth: '100%'}}>
                <h3>Phương Thức Thanh Toán</h3>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <WrapperLeft>
                        <WrapperInfo>
                            <div>
                                <Lable>Chọn phương thức giao hàng</Lable>
                                <WrapperRadio value={delivery}>
                                    <Radio value="fast"><span style={{color: '#ea8500', fontWeight: 'bold'}}>FAST</span>Giao hàng tiết kiệm</Radio>
                                    {/* <Radio value="gojek"><span style={{color: '#ea8500', fontWeight: 'bold'}}>GO_JEK</span>Giao hàng tiết kiệm</Radio> */}
                               </WrapperRadio>
                            </div>
                        </WrapperInfo>

                        <WrapperInfo>
                            <div>
                                <Lable>Chọn phương thức thanh toán</Lable>
                                <WrapperRadio onChange={handlePayment} value={payment}>
                                    <Radio value="later_money">Thanh toán tiền khi nhận hàng</Radio>
                                    <Radio value="paypal">Thanh toán bằng paypal</Radio>
                                </WrapperRadio>
                            </div>
                        </WrapperInfo>
                    </WrapperLeft>

                    <WrapperRight>
                       
                        <div style={{width: '100%'}}>

                        <WrapperInfo>
                            <div >
                                <span>Địa Chỉ: </span>
                                <span style={{color: 'red', fontWeight: 'bold'}}>{`${user?.address} ${user?.city}`}</span>
                                <span onClick={handleChangeAddress} style={{cursor: 'pointer', fontSize: '15px', fontWeight: 'bold'}}>  Thay đổi</span>
                            </div>
                        </WrapperInfo>

                            <WrapperInfo>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>Tạm tính</span>
                                <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                            </div>
                        
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>Phí giao hàng</span>
                                <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(diliveryPriceMemo)}</span>
                            </div>

                            </WrapperInfo>

                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span style={{display:'flex', flexDirection: 'column'}}>
                                <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(Number(totalPriceMemo))}</span>
                                <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </WrapperTotal>

                            {payment === 'paypal' && sdkReady ? (
                                <div style={{width: '320px'}}>
                                     <PayPalButton
                                         amount= {Math.round(totalPriceMemo / 30000)}
                                         onSuccess={onSuccessPaypal}

                                      onError={() => {
                                        alert('Error')
                                      }}
                                     />
                                    
                                </div>
                                

                            ) : (
                                <Buttoncomponent
                                onClick={() => handleAddOrder()}
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '320px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    marginTop: '10px'
                                }}
                               
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                                textButton={'Đặt hàng'}>

                             </Buttoncomponent>

                            )}

                            
                        </div>
                    </WrapperRight>

                </div>
              

            </div>
            <ModalComponents title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
                {/* <LoadingComponent isLoading={isLoading}> */}
                <Form 
                 name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                autoComplete="on"
                form={form}
             >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              
            >
            <InputComponent value={stateUserDetails?.name} onChange={handleOnchangeDetails} name='name' />
            </Form.Item>


           <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
             >
           <InputComponent value={stateUserDetails?.phone} onChange={handleOnchangeDetails} name="phone"/>
           </Form.Item>


           <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
             >
           <InputComponent value={stateUserDetails?.address} onChange={handleOnchangeDetails} name="address"/>
           </Form.Item>


           <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please input your city!' }]}
             >
           <InputComponent value={stateUserDetails?.city} onChange={handleOnchangeDetails} name="city"/>
           </Form.Item>


          

           

           
            
            </Form>
                {/* </LoadingComponent> */}
            </ModalComponents>

            </LoadingComponent>

        </div>
       
       
    )
}

export default PaymentPage;