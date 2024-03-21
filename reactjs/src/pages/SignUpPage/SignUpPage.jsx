import React, {useState, useEffect } from "react";
import {WrapperContainerLeft, WrapperContainerRight, WrapperContainer, WrapperContainerBorder} from './style';
import InputForm from '../../components/InputForm/InputForm';
import Buttoncomponent from "../../components/ButtonComponents/Buttoncomponent";
import {Image} from "antd";
import imageLogo from '../../assets/image/logo-sign-in.jpg';
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons';
import * as UserService from '../../Service/UserService';
import {useNavigate} from 'react-router-dom';
import {useUserMutation} from '../../hooks/userMutationHook'
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import *as message from '../../components/Message/Message';

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOnchangeEmail = (value) => {
    setEmail(value)

  }
  const handleOnchangePassword = (value) => {
    setPassword(value)

  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleNavigateSingIn = () => {
        navigate('/sign-in')
  }

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };
  const handleSignUp = () => {
    mutation.mutate({
      email, password, confirmPassword
    })
  }
  const mutation = useUserMutation(
    data => UserService.signupUser(data)
  )
  const {data, isLoading, isSuccess, isError} = mutation

  useEffect(() => {
    if(data?.status ==='OK') {
      handleNavigateSingIn();
      message.success();
     
    }else if(isError){
      message.error()
    }
  }, [data,isError])
    return(
        <WrapperContainer>
        <WrapperContainerBorder>
        <WrapperContainerLeft>
            <h1>Tạo tài khoản mới </h1>
            <InputForm style={{marginBottom: '10px'}} placeholder = 'abc@gmail.com' value={email} onChange = {handleOnchangeEmail}/>
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
                        <InputForm style={{marginBottom: '10px'}} placeholder = "password" type={isShowPassword ? "text" : "password"} value={password} onChange = {handleOnchangePassword}/>
                        
                </div>

                <div style={{position: 'relative'}}>
                    <span
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '10px',
                            right: '8px',
                            cursor: 'pointer'
                        }} onClick={toggleConfirmPasswordVisibility}>
                            {isShowConfirmPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled />)}
                    </span>
                    <InputForm placeholder = 'Confirm password' type={isShowConfirmPassword ? "text" : "password"} value={confirmPassword} onChange = {handleOnchangeConfirmPassword}/>
                        
                </div>
               
                

           
            {data?.status === 'ERR' && <span style={{color: 'red', fontSize: '14px', marginTop: '10px'}}>{data?.message}</span>}
            <LoadingComponent isLoading={isLoading}>
            <Buttoncomponent 

            onClick={handleSignUp}
             disabled = {!email?.length || !password?.length || !confirmPassword?.length}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%', 
                border: 'none',
                outline: 'none',
                margin: '30px 0px 10px',
              }} 
              styleTextButton={{color: '#fff', fontWeight: '600'}}
              textButton = {'Đăng Ký'}>
            </Buttoncomponent>
            </LoadingComponent>
            <p style={{color: 'rgb(120, 120, 120)', fontSize: '13px', margin: '10px 0 0'}}>Chưa đã có khoản? <span onClick={handleNavigateSingIn}  style={{color: 'rgb(13, 92, 182)', fontSize: '13px', margin: '20px 0 0', cursor: 'pointer', display: 'inline-block'}}> Đăng Nhập</span></p>


        </WrapperContainerLeft>
            
       

        <WrapperContainerRight>
            <Image src={imageLogo} preview={false} height="203px" width="203px" style={{borderRadius: "50%"}}/>
            <h4>Mua Sắm Tại Shop PDB</h4>
        </WrapperContainerRight>
    </WrapperContainerBorder>
    </WrapperContainer>
    
    )
}

export default SignUpPage