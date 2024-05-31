import React, { useEffect , useState } from "react";
import {WrapperContainerLeft, WrapperContainerRight, WrapperContainer, 
        WrapperContainerBorder, WrapperContainerText, WrapperContainerTextContent1
      ,WrapperContainerTextContent2} from './style';
import InputForm from '../../components/InputForm/InputForm';
import Buttoncomponent from "../../components/ButtonComponents/Buttoncomponent";
import {Image} from "antd";
import imageLogo from '../../assets/image/logo-sign-in.jpg';
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons';
import {useLocation, useNavigate} from 'react-router-dom';
import * as UserService from '../../Service/UserService'
import axios from "axios"
import {useUserMutation} from '../../hooks/userMutationHook'
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import *as message from '../../components/Message/Message';
import { jwtDecode } from 'jwt-decode';
import {useDispatch} from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';



const SignInPage = () => {
  
    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const location = useLocation();
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    
      }
      const handleOnchangePassword = (value) => {
       
        setPassword(value)
    
      }
    const handleNavigateSignUp = () => {
        navigate('/sign-up')

    }
    const togglePasswordVisibility = () => {
        setIsShowPassword(!isShowPassword);
    };
    const handleSignIn = () => {
      mutation.mutate({
        email, password
      })
    }

      const mutation = useUserMutation(
        data => UserService.loginUser(data)
      )
      const {data, isLoading, isSuccess, isError} = mutation
      console.log('data: ', data)
      
      useEffect(() => {
        console.log('location: ', location)
        if(data?.status === 'OK'){
          if(location?.state){
            navigate(location?.state)
          }else{
            navigate("/")

          }
          
          localStorage.setItem('access_token', JSON.stringify(data?.access_token))
          localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
          if(data?.access_token){
            const decoded = jwtDecode(data?.access_token)
            console.log('decoded', decoded)
            if(decoded?.id){
              handleGetDetailsUser(decoded?.id, data?.access_token)
            }
          }
        }
      }, [data])

      const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refresh_token = JSON.parse(storage)
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({...res?.data, access_token: token, refresh_token}))
        
      }
  

    return(
        <WrapperContainer>
          <WrapperContainerBorder>
            <WrapperContainerLeft>
                <h1>Đăng nhập bằng email</h1>
                <WrapperContainerText>Đăng nhập hoạc tạo tài khoản</WrapperContainerText>
                <InputForm 
                style={{marginBottom: '10px'}} 
                placeholder = 'abc@gmail.com' 
                value = {email} 
                onChange = {handleOnchangeEmail}
                />
                <div style={{position: 'relative'}}>
                    <span
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '10px',
                            right: '8px',
                            cursor: 'pointer'
                        }} onClick={togglePasswordVisibility}>
                            {isShowPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled />)}
                    </span>
                        <InputForm placeholder = "password" type={isShowPassword ? "text" : "password"} value={password} onChange = {handleOnchangePassword}/>
                </div>
                
                {data?.status === 'ERR' && <span style={{color: 'red', fontSize: '14px', marginTop: '10px'}}>{data?.message}</span>}
                <LoadingComponent isLoading={isLoading}>
                <Buttoncomponent 

                onClick={handleSignIn}
                disabled = {!email?.length || !password?.length}
                  styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '100%', 
                    border: 'none',
                    outline: 'none',
                    margin: '30px 0px 10px',
                  }} 
                  styleTextButton={{color: '#fff', fontWeight: '600'}}
                  textButton = {'Đăng Nhập'}>
                </Buttoncomponent>
    
                </LoadingComponent>

                <WrapperContainerTextContent2>Chưa có tài khoản? 
                  <WrapperContainerTextContent1  onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperContainerTextContent1>
                </WrapperContainerTextContent2>


            </WrapperContainerLeft>    
           

            <WrapperContainerRight>
                <Image 
                src={imageLogo} 
                preview={false} 
                height="203px" 
                width="203px" 
                style={{borderRadius: "50%"}}/>
                <h4>Mua Sắm Tại Shop PDB</h4>
            </WrapperContainerRight>
          </WrapperContainerBorder>
        </WrapperContainer>
        
    )
}

export default SignInPage