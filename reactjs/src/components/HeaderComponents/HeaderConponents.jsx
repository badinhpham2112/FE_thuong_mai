import React, { useEffect, useState } from "react";
import { Col, Badge, Input, Popover } from 'antd';
import {WrapperHeader, WrapperTextHeader, WrapperHeaderAccout,  WrapperHeaderSmall, WrapperContentPopup, WrapperTextHeaderSmall } from "./style"
import {UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonSearch/ButtonInputSearch";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import * as UserService from '../../Service/UserService';
import { resetUser } from '../../redux/slides/userSlide';
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { SearchProduct } from "../../redux/slides/productSlide";
import { addOrderProduct } from "../../redux/slides/orderSlide";
// import { removeALllOrderProduct, resetAllOrders } from "../../redux/slides/orderSlide";

const Search = Input.Search;


const HeaderConponents = ({isHiddenSearch = false, isHiddenCart = false}) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [loading, setLoading] =  useState(false)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const order = useSelector((state) => state.order)
    const [isOpenPopup ,setIsOpenPopup] = useState(false)
  
   
    const handleNavigateLogin = async() => {
            await navigate('/sign-in')
       
    }
    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
    
        setLoading(false);
     
        
    }

    useEffect(() => {
        setLoading(true)
        setUserAvatar(user?.avatar)
        setUserName(user?.name)
        setLoading(false)

    }, [user?.name, user?.avatar])

    const onSearch = async (e) => {
        setSearch(e.target.value)
        dispatch(SearchProduct(e.target.value))

    }

    const content = (
        <div>
           
            <WrapperContentPopup onClick={()=>handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                  <WrapperContentPopup onClick={()=>handleClickNavigate('admin')}>Quản lý hệ thống</WrapperContentPopup>

            )}
             <WrapperContentPopup onClick={()=>handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
          
             <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng Xuất</WrapperContentPopup>
            
        </div>
    )

    const handleClickNavigate = (type) => {
        if(type === 'profile'){
            navigate('/profile-user')
        }else if(type === 'admin'){
            navigate('/system/admin')
        }else if(type === 'my-order'){
            navigate('/my-order', {state : {
                id: user.id,
                token: user.access_token
            }})
        }else {
            handleLogout() 
        }
        setIsOpenPopup(false)
    }
    const filteredItems = order?.orderItems?.filter(
        order => order.userId === user.id
    );
    return(
        <div style={{width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center'}}>
            <WrapperHeader style={{justifyContent : isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset'}}>
            {/* <WrapperHeader> */}
                 <Col span={5}>
                    <WrapperTextHeader style={{cursor: 'pointer'}} onClick={() => navigate('/')}>SHOP ĐIỆN TỬ</WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                        style={{borderRadius: '0px'}}
                        size= "large"
                        textButton="Tìm kiếm"
                        placeholder="input search text"
                        onChange = {onSearch}
                        
                        />
                    </Col>
                )}
               
            
                <Col span={6} style={{display: 'flex', gap: '54px', alignItems: 'center'}}>
                <LoadingComponent isLoading={loading}>
               
                    <WrapperHeaderAccout>
                        {user?.access_token ? (
                            <>
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}/>

                            ) : (
                                <UserOutlined style={{fontSize: '20px'}}/>
                                
                            )}
                              
                         
                            <Popover content={content} trigger="click" open={isOpenPopup}>
                               <div style={{cursor: 'pointer'}} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user.email}</div>
                            </Popover>
                            </>
                          
                        ) : (
                            <>
                            <UserOutlined style={{fontSize: '30px'}} onClick={handleNavigateLogin}/>
                             <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
                            <span style={{fontSize: '12px'}}>Đăng Nhập/Đăng ký</span>
                            <div>
                                <span style={{fontSize: '12px'}}>Tài khoản</span>
                                <CaretDownOutlined />
                            </div>

                         </div>
                            </>
                            
                        )}              
                       
                    </WrapperHeaderAccout>

           
                </LoadingComponent>
                {!isHiddenCart &&(
                     <div onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
                        <Badge count={filteredItems?.length} size="small">
                            <ShoppingCartOutlined style={{fontSize: '30px', color: '#fff'}} />
                        </Badge>
                            <WrapperHeaderSmall>Giỏ hàng</WrapperHeaderSmall>
                    </div>
                )}
                  
                    
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderConponents;