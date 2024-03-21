import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperContainer, WrapperContentProfile, WrapperLabel
         , WrapperInput, WrapperUploadFile } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import Buttoncomponent from "../../components/ButtonComponents/Buttoncomponent";
import { useSelector} from 'react-redux';
import * as UserService from '../../Service/UserService'
import { useUserMutation } from "../../hooks/userMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import *as message from '../../components/Message/Message';
import {useDispatch} from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { getBase64 } from "../../Utils";
const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    
    const dispatch = useDispatch()
    const mutation = useUserMutation(
        data => {
            const {id, access_token,...rests} = data
            UserService.updateUser(id, rests, access_token)
              
        })
      const {data, isLoading, isSuccess, isError} = mutation;
      console.log('data: ', data)

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
       

    }, [user])

    useEffect(() => {
        if(isSuccess) {
            message.success()
            handleGetDetailsUser(user.id, user?.access_token)
        } else if(isError){
            message.error()
        }

    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({...res?.data, access_token: token}))
        
    }
  
   
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }
    const handleOnChangeName = (value) => {
        setName(value);
    }
    const handleOnChangePhone = (value) => {
        setPhone(value);
    }
    const handleOnChangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnChangeAvatar = async ({fileList}) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
          }
          setAvatar(file.preview)
    }
    const handleUpdate = () => {
        mutation.mutate({id: user?.id, email, name, phone, address, avatar, access_token : user?.access_token})
       
    }
    return (
        <WrapperContainer>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <LoadingComponent isLoading = {isLoading}>
            <WrapperContentProfile>

            <WrapperInput>
                    <WrapperLabel htmlFor="email">Email</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="email" value={email} onChange={handleOnChangeEmail} />
                    <Buttoncomponent 
                    onClick={handleUpdate}
                    styleButton={{
                        height: '30px',
                        width: 'fit-content', 
                        borderRadius: '5px',
                        padding: '2px 6px 5px'
                    }} 
                    styleTextButton={{color: 'rgb(26, 148, 255)', fontWeight: '600'}}
                    textButton = {'Cập nhật'}>
                    </Buttoncomponent>
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="name">Name</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="name" value={name} onChange={handleOnChangeName} />
                    <Buttoncomponent 
                    onClick={handleUpdate}
                    styleButton={{
                        height: '30px',
                        width: 'fit-content', 
                        borderRadius: '5px',
                        padding: '2px 6px 5px'
                    }} 
                    styleTextButton={{color: 'rgb(26, 148, 255)', fontWeight: '600'}}
                    textButton = {'Cập nhật'}>
                    </Buttoncomponent>
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="phone" value={phone} onChange={handleOnChangePhone} />
                    <Buttoncomponent 
                    onClick={handleUpdate}
                    styleButton={{
                        height: '30px',
                        width: 'fit-content', 
                        borderRadius: '5px',
                        padding: '2px 6px 5px'
                    }} 
                    styleTextButton={{color: 'rgb(26, 148, 255)', fontWeight: '600'}}
                    textButton = {'Cập nhật'}>
                    </Buttoncomponent>
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="address">Address</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="address" value={address} onChange={handleOnChangeAddress} />
                    <Buttoncomponent 
                    onClick={handleUpdate}
                    styleButton={{
                        height: '30px',
                        width: 'fit-content', 
                        borderRadius: '5px',
                        padding: '2px 6px 5px'
                    }} 
                    styleTextButton={{color: 'rgb(26, 148, 255)', fontWeight: '600'}}
                    textButton = {'Cập nhật'}>
                    </Buttoncomponent>
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                    <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                        <Button style={{width: '221px'}} icon={<UploadOutlined />}>Select File</Button>
                    </WrapperUploadFile>
                    {avatar && (
                        <img src={avatar} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }} alt="avatar"/>
                    )}
                    <Buttoncomponent 
                    onClick={handleUpdate}
                    styleButton={{
                        height: '30px',
                        width: 'fit-content', 
                        borderRadius: '5px',
                        padding: '2px 6px 5px'
                    }} 
                    styleTextButton={{color: 'rgb(26, 148, 255)', fontWeight: '600'}}
                    textButton = {'Cập nhật'}>
                    </Buttoncomponent>
                </WrapperInput>


            </WrapperContentProfile>
            </LoadingComponent>
        </WrapperContainer>
    );
}

export default ProfilePage;