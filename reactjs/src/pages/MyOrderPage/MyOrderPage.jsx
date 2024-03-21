import React, { useEffect } from "react";
import { useQuery } from 'react-query';
import *as orderService  from '../../Service/orderService'
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import Buttoncomponent from "../../components/ButtonComponents/Buttoncomponent";
import { convertPrice } from "../../Utils";
import { useUserMutation } from "../../hooks/userMutationHook";
import *as message from '../../components/Message/Message';



const MyOrderPage = () => {
    
    const location = useLocation();
    const {state} = location;
    const navigate = useNavigate()
   
    const fetchMyOrder = async() => {
        const res = await orderService.getAllOrder(state?.id, state?.token);
        return res.data
    }

    const user = useSelector((state) => state.user)
    
    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder}, {
        enabled: state?.id && state?.token
    })
    const {isLoading , data } = queryOrder;

   

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: state?.token
        })


    }

    const mutationCancel = useUserMutation(
        (data) => {
            const {id, token ,orderItems, userId} = data
            const res = orderService.CancelOrder(id, token ,orderItems, userId)
            return res;
        }
        
    )
   
    const {isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel} = mutationCancel;
    console.log(isSuccessCancel)
    useEffect(() => {
        if(isSuccessCancel){
          message.success()
        }else if(isErrorCancle){
          message.error()
        }
      }, [isSuccessCancel, isErrorCancle])


    const handleCanceOrder =(order) => {
        mutationCancel.mutate({id: order._id, token:state?.token ,orderItems: order?.orderItems, userId: user.id}, {
            onSuccess: () => {
                queryOrder.refetch()
            }
        })

    }
    
    
    // useEffect(() => {
    //     if(isSuccessCancel && dataCancel?.status === 'OK'){
    //       message.success()
    //     } else if(isSuccessCancel && dataCancel?.status === 'ERR'){
    //       message.error(dataCancel?.message)
    //     }else if(isErrorCancle){
    //       message.error()
    //     }
    //   }, [dataCancel, isSuccessCancel, isErrorCancle])



      const renderProduct = (data) => {
        return data?.map((order) => {
            return <WrapperHeaderItem key={order?._id}> 
            <img src={order?.image} 
            style={{
            width: '70px', 
            height: '70px', 
            objectFit: 'cover',
            border: '1px solid rgb(238, 238, 238)',
            padding: '2px'
             }}
             />
            <div style={{
             width: 260,
            overflow: 'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap',
            marginLeft: '10px'
            }}>{order?.name}</div>
                <span style={{ fontSize: '13px', color: '#242424',marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
        })
    }
    

    return(
        <LoadingComponent isLoading={isLoading || isLoadingCancel}> 
            
                <WrapperContainer>
                    <div style={{background: '#f5f5fa', width: '100%', height: '100%', paddingBottom: '60px'}}>
                        <div style={{height: '100%', width: '1270px', margin: '0 auto', maxWidth: '100%'}}>
                            <h4>Đơn hàng của tôi</h4>

                            <WrapperListOrder>
                            
                                {Array.isArray(data) && data?.map((order) => {
                                    console.log('data : ', data)
                                    return(
                                        <WrapperItemOrder key={order?._id}>
                                              <WrapperStatus>
                                                   <span style={{fontSize: '14px', fontWeight: 'bold'}}>Trạng thái</span>
                                                        <div>
                                                            <span style={{color: 'rgb(255, 66, 78)'}}>Giao hàng: </span>
                                                            <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order.isDelivered ? 'Đã giao hàng': 'Chưa giao hàng'}`}</span>
                                                        </div>

                                                        <div>
                                                            <span style={{color: 'rgb(255, 66, 78)'}}>Thanh toán: </span>
                                                            <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'}`}</span>
                                                        </div>
                                                </WrapperStatus>

                                                {renderProduct(order?.orderItems)}


                                                <WrapperFooterItem>
                                                    <div>
                                                        <span style={{color: 'rgb(255, 66, 78)'}}>Tổng tiền: </span>
                                                        <span 
                                                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)',fontWeight: 700 }}
                                                        >{convertPrice(order?.totalPrice)}</span>
                                                        </div>
                                                        <div style={{display: 'flex', gap: '10px'}}>

                                                        <Buttoncomponent
                                                        onClick={() => handleCanceOrder(order)}
                                                        size={40}
                                                        styleButton={{
                                                        height: '36px',
                                                        border: '1px solid #9255FD',
                                                        borderRadius: '4px'
                                                        }}
                                                        textButton={'Hủy đơn hàng'}
                                                        styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                                                         >

                                                        </Buttoncomponent>
                                                        <Buttoncomponent
                                                        onClick={() => handleDetailsOrder(order?._id)}
                                                        size={40}
                                                        styleButton={{
                                                        height: '36px',
                                                        border: '1px solid #9255FD',
                                                        borderRadius: '4px'
                                                         }}
                                                        textButton={'Xem chi tiết'}
                                                        styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                                                        >
                                                        </Buttoncomponent>
                                                    </div>

                                                </WrapperFooterItem>
                            

                                        </WrapperItemOrder>

                                    )
                                   
                                })}
                            </WrapperListOrder>
                        </div>
                    </div>

                </WrapperContainer>
               

        </LoadingComponent>
       
    )
}

export default MyOrderPage
