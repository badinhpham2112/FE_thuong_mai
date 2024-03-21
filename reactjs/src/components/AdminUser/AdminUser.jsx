import React, {useEffect, useRef, useState} from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Modal, Checkbox, Form, Space  } from 'antd';
import {  DeleteFilled, EditFilled, SearchOutlined  } from '@ant-design/icons'
import TableComponents from "../TableComponents/TableComponents";
import InputComponent from "../InputComponents/InputComponent";
import { getBase64 } from "../../Utils";
import * as UserService from '../../Service/UserService'
import { useUserMutation } from "../../hooks/userMutationHook";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import *as message from '../Message/Message';
import { useQuery } from 'react-query'
import DrawerComponents from "../DrawerComponents/DrawerComponents";
import { useSelector} from 'react-redux';
import ModalComponents from "../ModalComponents/ModalComponents";


const AdminUser = () => {
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user)


    const [stateUserDetails, setStateUserDetails] = useState({
      name: '', 
      email: '',
      phone: '',
      address: '',
      isAdmin: false,
      avatar: ''



      
  })

    

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

          const mutationDelete = useUserMutation(
        
            (data) => {
              console.log('data: ', data)
                const {
                     id, 
                     token,
                    
                    } = data
                 const res = UserService.deleteUser(
                        id, 
                        token,
                 )
                    return res;
                  
            }    
            )

            const mutationDeleteMany = useUserMutation(
        
              (data) => {
                console.log('data: ', data)
                  const {
                       ids, 
                       ...token
                      
                      } = data
                   const res = UserService.deleteManyUser(
                          ids, 
                          token,
                   )
                      return res;
                    
              }    
              )
  




    const getAllUser = async () => {
        const res = await UserService.getAllUser(user?.access_token)
    
        return res;
    } 
    
    const fetchgetDetailsUser = async (rowSelected) => {
      const res = await UserService.getDetailsUser(rowSelected)
      if(res?.data){
        setStateUserDetails({
          name: res.data.name, 
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          isAdmin: res.data.isAdmin,
          avatar: res.data.avatar
        })
      }
      setIsLoadingUpdate(false)
     
    }

    console.log('stateUserDetails: ', stateUserDetails)

    useEffect(() => {
      if (rowSelected && isOpenDrawer) {
        setIsLoadingUpdate(true)
        fetchgetDetailsUser(rowSelected)
      }
    }, [rowSelected, isOpenDrawer])



    const handleDetailsProduct = () =>{
      setIsOpenDrawer(true)
       
    }
       
    const handleDeleteManyUser = (ids) => {
      mutationDeleteMany.mutate({ids: ids, token: user?.access_token}, {
        onSettled: () => {
          queryUser.refetch()
        }
      })
    }

      const {data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate;
      const {data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDelete;
      const {data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany} = mutationDeleteMany;
      console.log('dataUpdated: ', dataUpdated)
     
      const queryUser = useQuery(['users'], getAllUser)
      const {isLoading: isLoadingProduct, data: users } = queryUser 
      
      const renderAction = () => {
        return(
            <div style={{fontSize: '25px', display: 'flex'}}>
                <DeleteFilled style={{color: 'red'}} onClick={() => setIsModalOpenDelete(true)}/>
                <EditFilled style={{color: 'orange', marginLeft: '15px'}} onClick={handleDetailsProduct}/>
            </div>
        )
      }

   


      const handleSearch = (
        selectedKeys,
        confirm ,
        dataIndex,
      ) => {
        confirm();
        
      };
    
      const handleReset = (clearFilters) => {
        clearFilters();
        
      };

      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}
           onKeyDown={e => e.stopPropagation()}>
            <InputComponent
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined/>}
                size="small"
                style={{ width: 90}}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
          
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined style={{ fontSize: '18px', color: filtered ? '#1890ff' : undefined }} />
        ),

        onFilter: (value, record) => {
          const dataIndexValue = record[dataIndex];
        
          if (dataIndexValue !== undefined && dataIndexValue !== null) {
            return dataIndexValue.toString().toLowerCase().includes(value.toLowerCase());
          }
        
          return false; // or handle the case when dataIndexValue is undefined or null
        },
        
        // (value, record) =>
        //   record[dataIndex]
        //     .toString()
        //     .toLowerCase()
        //     .includes((value).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
    
      });


      const columns = [
                {
                  title: 'Name',
                  dataIndex: 'name',
                  sorter:(a, b) => a.name.length - b.name.length,
                  ...getColumnSearchProps('name')
                },
          
                {
                  title: 'Email',
                  dataIndex: 'email',
                  sorter:(a, b) => a.email.length - b.email.length,
                  ...getColumnSearchProps('email')
        
                },
                {
                  title: 'Phone',
                  dataIndex: 'phone',
                  sorter:(a, b) => a.phone?.length - b.phone?.length,
                  ...getColumnSearchProps('phone')
        
                },

                {
                  title: 'Address',
                  dataIndex: 'address',
                  sorter:(a, b) => a.address.length - b.address.length,
                  ...getColumnSearchProps('address')
        
                },
        
                {
                    title: 'IsAdmin',
                    dataIndex: 'isAdmin',
                    sorter:(a, b) => a.isAdmin - b.isAdmin,
                    filters: [
                      { text: 'True', value: 'true' },
                      { text: 'False', value: 'false' },
                    ],
                  },
                
                {
                  title: 'Action',
                  dataIndex: 'action',
                  render: renderAction,
                },
                
              ];
              const dataTable = users?.data?.length && users?.data?.map((user) => {
                return {...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE'}
              })
              const [form] = Form.useForm();

   

      useEffect(() => {
        if(isSuccessUpdated && dataUpdated?.status == 'OK'){
           
            message.success();
            handleCloseDrawer();
        }else if(isErrorUpdated){
            message.error();
        }

      }, [isSuccessUpdated, isErrorUpdated])

      useEffect(() => {
        if(isSuccessDeleted && dataDeleted?.status == 'OK'){
           
            message.success();
            handleCancelDelete();
        }else if(isErrorDeleted){
            message.error();
        }

      }, [isSuccessDeleted, isErrorDeleted])


      useEffect(() => {
        if(isSuccessDeletedMany && dataDeletedMany?.status == 'OK'){
           
            message.success();
           
        }else if(isErrorDeletedMany){
            message.error();
        }

      }, [isSuccessDeletedMany, isErrorDeletedMany])

      const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
          name: '', 
          email: '',
          phone: '',
          address: '',
          isAdmin: false,
          avatar: ''
        
        })
        form.resetFields()
     };


      useEffect(() => {
        form.setFieldsValue(stateUserDetails)
      }, [form, stateUserDetails])
  
      

     const handleCancelDelete = () => {
      setIsModalOpenDelete(false)
     }


     const handleOkDelete = () => {
      mutationDelete.mutate({id: rowSelected, token: user?.access_token}, {
        onSettled: () => {
          queryUser.refetch()
        }
      })

     }


   

    const handleOnchangeDetails = (e) => {
      setStateUserDetails({
          ...stateUserDetails,
          [e.target.name]: e.target.value,
      })
     
    }
   
   
    const handleOnChangeAvatarDetails = async ({fileList}) => {
      const file = fileList[0];
      if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
          ...stateUserDetails,
          avatar: file.preview
        })
  }

  const onUpdateUser = () => {
    mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateUserDetails}, {
      onSettled: () => {
        queryUser.refetch()
      }
    })

  }

    return(
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
           

            <div style={{marginTop: '15px'}}>
            <TableComponents handleDeleteMany = {handleDeleteManyUser} columns={columns} isLoading={isLoadingProduct} data={dataTable} onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        setRowSelected(record?._id)
                    }
                };
             }}/>
            </div>

            <DrawerComponents title='Chi người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width = "90%">
            <LoadingComponent isLoading={isLoadingUpdate || isLoadingUpdated}>
            <Form 
                 name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                initialValues={{ remember: true }}
                onFinish={onUpdateUser}
                autoComplete="on"
                form={form}
             >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              
            >
            <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name='name' />
            </Form.Item>


            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
             >
           <InputComponent value={stateUserDetails.email} onChange={handleOnchangeDetails} name='email'/>
           </Form.Item>

           <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
             >
           <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone"/>
           </Form.Item>


           <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
             >
           <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address"/>
           </Form.Item>



           <Form.Item
                label="IsAdmin"
                name="isAdmin"
                rules={[{ required: true, message: 'Please input your isAdmin!' }]}
             >
           <InputComponent value={stateUserDetails.isAdmin} onChange={handleOnchangeDetails} name="isAdmin"/>
           </Form.Item>

           <Form.Item
                label="Avatar"
                name="avatar"
                rules={[{ required: true, message: 'Please input your avatar!' }]}
             >
                <WrapperUploadFile onChange={handleOnChangeAvatarDetails} name="avatar" maxCount={1}>
                    <Button>chọn ảnh</Button>
                    {stateUserDetails?.avatar && (
                        <img src={stateUserDetails?.avatar} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft: '10px',
                            marginTop: '10px'
                            
                        }} alt="avatar"/>
                    )}

                </WrapperUploadFile>
               
              
           </Form.Item>


           

            <Form.Item wrapperCol={{offset: 20, span: 16}}>
            <Button type="primary" htmlType="submit">
               Apply
            </Button>
            </Form.Item>
            
            </Form>
            </LoadingComponent>
            </DrawerComponents>
            
            <ModalComponents title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleOkDelete}>
            <LoadingComponent isLoading={isLoadingDeleted}>
            <span>Bạn có chắc muốn xóa sản phẩm này không</span>
            </LoadingComponent>
            </ModalComponents>
         
        </div>
    )
}

export default AdminUser