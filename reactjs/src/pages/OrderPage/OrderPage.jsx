import {Checkbox, Form , Button} from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperStyleHeaderDevivery, WrapperRight, WrapperStyleHeader, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'

import {WrapperInputNumber} from '../../components/ProductDetailPageComponents/style'
import { useSelector, useDispatch} from 'react-redux';
import { decreaseAmount, increaseAmount, removeALllOrderProduct, removeOrderProduct, selectedOder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../Utils';
import Buttoncomponent from '../../components/ButtonComponents/Buttoncomponent';
import ModalComponents from "../../components/ModalComponents/ModalComponents";
import InputComponent from '../../components/InputComponents/InputComponent';

import { useUserMutation } from '../../hooks/userMutationHook';
import *as UserService  from '../../Service/UserService.js'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import *as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import  StepComponent from '../../components/StepComponent/StepComponent'


const OrderPage = () => {

    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [listChecked, setListChecked] = useState([]);
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const navigate = useNavigate();
   

    const onChange = (e) => {
        if(listChecked.includes(e.target.value)){
            const newListChecked = listChecked.filter((item) => item !== e.target.value);
            setListChecked(newListChecked)
        }else{
            setListChecked([...listChecked, e.target.value])
        }
       
    }


    const handleOnchangeCheckAll = (e) => {
       
        if(e.target.checked){
            const newListChecked = []
            order?.orderItems?.forEach((item) =>{
                newListChecked.push(item?.product)

            })
            setListChecked(newListChecked)
        }else {
            setListChecked([])

        }

    }

    useEffect(() => {
        dispatch(selectedOder({listChecked}))

    }, [listChecked])

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
  

    
    const handleChangeCount = (type, idProduct, limited) => {
        
        if(type === 'increase'){
            if(!limited){
                dispatch(increaseAmount({idProduct}));

            }
            
        }else{
            if(!limited){
                dispatch(decreaseAmount({idProduct}));

            }
            
        }
        

    }

    const handleDelete = (idProduct) => {
        // console.log('idProduct: ', idProduct)

        dispatch(removeOrderProduct({idProduct}))
    }

    const handleRemoveAllOrder = () => {
        if(listChecked?.length > 1){
          dispatch(removeALllOrderProduct({listChecked}))
        }
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
   

    const handleAddCard = () => {
       
       if(!order?.orderItemsSelected?.length){
            message.error('vui lòng chọn sản phẩm');
        }else if(!user?.phone || !user.address || !user.name || !user.city){
            setIsOpenModalUpdateInfo(true)

        }else {
            navigate('/payment')
           
        }

    }

    

    const handleUpdateInfoUser = () => {
       
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
  

    const item = [
        {
            title: '20.000 VND',
            description: 'Dưới 200.000 VND'
          },
          {
            title: '10.000 VND',
            subTitle: 'Left 00:00:08',
            description: 'Từ 200.000 VND - 500.000 VND'
          },
          {
            title: '0 VND',
            description: 'Trên 500.000VND'
          },
    ]
    const filteredItems = order?.orderItems?.filter(
      order => order.userId === user.id
     );

   
    return (
        
        <div style={{background: '#f5f5fa', width: '100%', height: '100vh'}}>
            <div style={{height: '100%', width: '1270px', margin: '0 auto', maxWidth: '100%'}}>
                <h3>Giỏ hàng</h3>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <WrapperLeft>
                        <WrapperStyleHeaderDevivery>
                             <StepComponent items = {item} current=
                             {diliveryPriceMemo === 10000 ? 1 : diliveryPriceMemo === 20000 ? 2 
                             : order.orderItemsSelected.length === 0 ? 0 : 3}/>
                        </WrapperStyleHeaderDevivery>
                        
                        <WrapperStyleHeader>
                            <span style={{display: 'inline-block', width: '390px'}}>
                                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === filteredItems?.length}></Checkbox>
                                <span>Tất cả ({filteredItems?.length} sản phẩm)</span>
                            </span>

                            <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{cursor: 'pointer'}} onClick={handleRemoveAllOrder}/>
                            </div>
                        </WrapperStyleHeader>

                        <WrapperListOrder>
                       
                            {filteredItems?.map((order) => {
                               return(
                                <WrapperItemOrder key={order?.product}>
                                <div style={{width: '390px', display: 'flex', alignItems: 'center', gap: 4}}>
                                    <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                                    <img src={order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}} />
                                    <div 
                                    style={{width: '260px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'}}>{order?.name}</div>
                                </div>

                                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span>
                                        <span style={{fontSize: '13px', color: '#242424'}}>{order?.discount ? convertPrice(order?.price - ((order?.price * order?.discount) / 100)) : convertPrice(order?.price)}</span>
                                    </span>

                                    <WrapperCountOrder>
                                        <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}}
                                         onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
                                            <MinusOutlined style={{color: '#000', fontSize: '10px'}} />
                                        </button>

                                        <WrapperInputNumber defaultValue={order.amount} value={order?.amount} size='small'  min={1} max={order?.countInStock}/>
                                            <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}}
                                             onClick={() => handleChangeCount('increase', order?.product, order?.amount === order?.countInStock)}>
                                                <PlusOutlined style={{color: '#000', fontSize: '10px'}}/>
                                            </button>
                                    </WrapperCountOrder>

                                    <span style={{color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500}}>{order?.discount ? convertPrice((order?.price - ((order?.price * order?.discount) / 100)) * order?.amount) : convertPrice(order?.price * order?.amount)}</span>

                                    <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => handleDelete(order?.product)}/>
                                </div>
                            </WrapperItemOrder>
                               )
                           
                            })}
                       
                           
                        </WrapperListOrder>

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

                            <Buttoncomponent
                                onClick={() => handleAddCard()}
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
                                textButton={'Mua hàng'}>

                             </Buttoncomponent>
                        </div>
                    </WrapperRight>

                </div>
              

            </div>
            <ModalComponents title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
                <LoadingComponent isLoading={isLoading}>
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
                </LoadingComponent>
               </ModalComponents>

        </div>
       
       
    )
}

export default OrderPage;