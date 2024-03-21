import React, {useEffect, useRef, useState} from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Modal, Select, Form, Space, Upload  } from 'antd';
import { PlusOutlined, DeleteFilled, EditFilled, SearchOutlined  } from '@ant-design/icons'
import TableComponents from "../TableComponents/TableComponents";
import InputComponent from "../InputComponents/InputComponent";
import { getBase64, renderOptions } from "../../Utils";
import * as ProductService from '../../Service/ProductService'
import { useUserMutation } from "../../hooks/userMutationHook";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import *as message from '../Message/Message';
import { useQuery } from 'react-query'
import DrawerComponents from "../DrawerComponents/DrawerComponents";
import { useSelector} from 'react-redux';
import ModalComponents from "../ModalComponents/ModalComponents";



const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [typeSelect, setTypeSelect] = useState('')
    const searchInput = useRef(null);
    const inittial = () => ({
      name: '', 
      price: '',
      type: '',
      countInStock: '',
      rating: '',
      description: '',
      image: '',
      discount: '',
      newType: ''

    })
    const user = useSelector((state) => state?.user)
    const [statePoduct, setStateProduct] = useState(inittial())

    const [statePoductDetails, setStateProductDetails] = useState(inittial())

    const mutation = useUserMutation(
        (data) => {
            const {
                 name, 
                 price,
                 type,
                 countInStock,
                 rating,
                 description,
                 discount,
                 image,
                } = data
             const res = ProductService.createProduct({
                    name, 
                    price,
                    type,
                    countInStock,
                    rating,
                    description,
                    discount,
                    image,
                })
                return res;
              
        })


        const mutationUpdate = useUserMutation(
        
          (data) => {
            console.log('data: ', data)
              const {
                   id, 
                   token,
                  ...rests
                  } = data
               const res = ProductService.updateProduct(
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
                 const res = ProductService.deleteProduct(
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
                   const res = ProductService.deleteManyProduct(
                          ids, 
                          token,
                   )
                      return res;
                    
              }    
              )
  




    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct()
    
        return res;
    } 
    
    const fetchgetDetailsProduct = async (rowSelected) => {
      const res = await ProductService.getDetailsProduct(rowSelected)
      if(res?.data){
        setStateProductDetails({
          name: res.data.name, 
          price: res.data.price,
          type: res.data.type,
          countInStock: res.data.countInStock,
          rating: res.data.rating,
          description: res.data.description,
          discount: res.data.discount,
          image: res.data.image
        })
      }
      setIsLoadingUpdate(false)
     
    }

  
    useEffect(() => {
      if(rowSelected){
        fetchgetDetailsProduct(rowSelected)
      }
     
    }, [rowSelected])
    console.log('statePoductDetails: ', statePoductDetails)
    const handleDetailsProduct = () =>{
      setIsLoadingUpdate(true)
      if(rowSelected){
     
        fetchgetDetailsProduct()
       
      }
        setIsOpenDrawer(true)
    }
       
    const handleDeleteManyProduct = (ids) => {
      mutationDeleteMany.mutate({ids: ids, token: user?.access_token}, {
        onSettled: () => {
          queryProduct.refetch()
        }
      })
    }

    const fetAllTypeProduct = async () => {
      const  res = await ProductService.getAllTypeProduct();
      return res;
      
    } 
      const {data, isLoading, isSuccess, isError} = mutation;
      const {data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate;
      const {data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDelete;
      const {data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany} = mutationDeleteMany;
      console.log('dataUpdated: ', dataUpdated)
     
      const queryProduct = useQuery(['products'], getAllProduct)
      const typeAllProduct = useQuery(['type-product'], fetAllTypeProduct)
      const {isLoading: isLoadingProduct, data: products } = queryProduct 
      
      const renderAction = () => {
        return(
            <div style={{fontSize: '25px', display: 'flex'}}>
                <DeleteFilled style={{color: 'red'}} onClick={() => setIsModalOpenDelete(true)}/>
                <EditFilled style={{color: 'orange', marginLeft: '15px'}} onClick={handleDetailsProduct}/>
            </div>
        )
      }
 
      console.log('type: ', typeAllProduct)
   


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
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),

        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
    
      });


      const columns = [
        {
          title: 'Tên',
          dataIndex: 'name',
          sorter:(a, b) => a.name.length - b.name.length,
          ...getColumnSearchProps('name')
        },
        {
          title: 'Giá',
          dataIndex: 'price',
          sorter:(a, b) => a.price - b.price,
          filters: [
            { text: '>= 500', value: '>=' },
            { text: '<= 500', value: '<=' },
          ],
          onFilter: (value, record) => {
            console.log('value: ', {value, record})
            if(value === '>='){
              return record.price >= 500
            }
            return record.price <= 500
          },
        },
        {
          title: 'Đánh giá',
          dataIndex: 'rating',
          sorter:(a, b) => a.rating - b.rating,
          filters: [
            { text: '> 3', value: '>' },
            { text: '<= 3', value: '<=' },
          ],
          onFilter: (value, record) => {
            console.log('value: ', {value, record})
            if(value === '>'){
              return Number(record.rating) > 3
            }
            return Number(record.rating) <= 3
          },
        },
        {
          title: 'Mặt hàng',
          dataIndex: 'type',
          sorter:(a, b) => a.type - b.type,
        },
        {
          title: 'Số lượng',
          dataIndex: 'countInStock',
          sorter:(a, b) => a.countInStock - b.countInStock,
        },
        {
          title: 'Ghi chú',
          dataIndex: 'description',
        },
        
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
        
      ];
      const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {...product, key: product._id}
      })
      const [form] = Form.useForm();

      useEffect(() => {
        if(isSuccess && data?.status == 'OK'){
           
            message.success();
            handleCancel();
        }else if(isError){
            message.error();
        }

      }, [isSuccess, isError])

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
        setStateProductDetails({
            name: '', 
            price: '',
            type: '',
            countInStock: '',
            rating: '',
            description: '',
            image: ''      
        })
        form.resetFields()
     };


      useEffect(() => {
        if(!isModalOpen){
          form.setFieldsValue(statePoductDetails)
        }else{
          form.setFieldsValue(inittial())
        }
        
      }, [form, statePoductDetails, isModalOpen])
  
      
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '', 
            price: '',
            type: '',
            countInStock: '',
            rating: '',
            description: '',
            discount: '',
            image: ''      
        })
        form.resetFields()
     };

     const handleCancelDelete = () => {
      setIsModalOpenDelete(false)
     }


     const handleOkDelete = () => {
      mutationDelete.mutate({id: rowSelected, token: user?.access_token}, {
        onSettled: () => {
          queryProduct.refetch()
        }
      })

     }



    const onFinish = () => {

      const params = {
        name: statePoduct.name, 
        price: statePoduct.price,
        type: statePoduct.type === 'add_type' ? statePoduct.newType : statePoduct.type,
        countInStock: statePoduct.countInStock,
        rating: statePoduct.rating,
        description: statePoduct.description,
        discount: statePoduct.discount,
        image: statePoduct.image ,

      }
        mutation.mutate(params, {
          onSettled: () => {
            queryProduct.refetch()
          }
        })
        console.log('onFinish', statePoduct);
    };

    const handleOnchange = (e) => {
        setStateProduct({
            ...statePoduct,
            [e.target.name]: e.target.value,
        })
       
    }

    const handleOnchangeDetails = (e) => {
      setStateProductDetails({
          ...statePoductDetails,
          [e.target.name]: e.target.value,
      })
     
    }
   
   


    const handleOnChangeAvatar = async ({fileList}) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
          }
          setStateProduct({
            ...statePoduct,
            image: file.preview
          })
    }

    const handleOnChangeAvatarDetails = async ({fileList}) => {
      const file = fileList[0];
      if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
          ...statePoductDetails,
          image: file.preview
        })
    }

  const onUpdateProduct = () => {
    mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...statePoductDetails}, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })

  }

  const handleChangeSelect = (value) => {
      setStateProduct({
        ...statePoduct,
        type: value
      })
    

  }
  console.log('value: ', statePoduct.newType)

    return(
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop: '15px'}}>
            <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{fontSize: '50px'}}/></Button>

            </div>

            <div style={{marginTop: '15px'}}>
            <TableComponents handleDeleteMany = {handleDeleteManyProduct }  columns={columns} isLoading={isLoadingProduct} data={dataTable}   onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        setRowSelected(record?._id)
                    }
                };
             }}/>
            </div>
            <ModalComponents forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} >
            <LoadingComponent isLoading={isLoading}>
            <Form 
                 name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="on"
                form={form}
             >
            <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
            <InputComponent value={statePoduct.name} onChange={handleOnchange} name='name' />
            </Form.Item>
           
            <Form.Item
                label="Mặt hàng"
                name="type"
                rules={[{ required: true, message: 'Please input your type!' }]}
             >
               <Select
                  name='type'
                  value={statePoduct.type}
                  onChange={handleChangeSelect}
                  options={renderOptions(typeAllProduct?.data?.data)}
                />

           </Form.Item>

           {statePoduct.type === 'add_type' && (
              <Form.Item
              label = 'Thêm mặt hàng '
              name="newType"
              rules={[{ required: true, message: 'Please input your type!' }]}
           >        
                 <InputComponent value={statePoduct.newType} onChange={handleOnchange} name='newType'/>
           
         </Form.Item>
           )}

           <Form.Item
                label="Giá"
                name="price"
                rules={[{ required: true, message: 'Please input your price!' }]}
             >
           <InputComponent value={statePoduct.price} onChange={handleOnchange} name="price"/>
           </Form.Item>


           <Form.Item
                label="Số lượng"
                name="countInStock"
                rules={[{ required: true, message: 'Please input your countInStock!' }]}
             >
           <InputComponent value={statePoduct.countInStock} onChange={handleOnchange} name="countInStock"/>
           </Form.Item>


           <Form.Item
                label="Đánh giá"
                name="rating"
                rules={[{ required: true, message: 'Please input your rating!' }]}
             >
           <InputComponent value={statePoduct.rating} onChange={handleOnchange} name="rating"/>
           </Form.Item>

           <Form.Item
                label="Ghi chú"
                name="description"
                rules={[{ required: true, message: 'Please input your description!' }]}
             >
           <InputComponent value={statePoduct.description} onChange={handleOnchange} name="description"/>
           </Form.Item>

           <Form.Item
                label="Giảm giá theo %"
                name="discount"
                rules={[{ required: true, message: 'Please input your discount!' }]}
             >
           <InputComponent value={statePoduct.description} onChange={handleOnchange} name="discount"/>
           </Form.Item>



           <Form.Item
                label="Ảnh sản phẩm"
                name="image"
                rules={[{ required: true, message: 'Please input your image!' }]}
             >
                <WrapperUploadFile onChange={handleOnChangeAvatar} name="image" 
                 maxCount={1}
                >
                    <Button>chọn ảnh</Button>
                    {statePoduct?.image && (
                        <img src={statePoduct?.image} style={{
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
               Submit
            </Button>
            </Form.Item>
            
            </Form>
            </LoadingComponent>
            </ModalComponents>

            <DrawerComponents title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width = "90%">
            <LoadingComponent isLoading={isLoadingUpdate || isLoadingUpdated}>
            <Form 
                 name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                initialValues={{ remember: true }}
                onFinish={onUpdateProduct}
                autoComplete="on"
                form={form}
             >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
            <InputComponent value={statePoductDetails.name} onChange={handleOnchangeDetails} name='name' />
            </Form.Item>
           
            <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: 'Please input your type!' }]}
             >
           <InputComponent value={statePoductDetails.type} onChange={handleOnchangeDetails} name='type'/>
           </Form.Item>

           <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input your price!' }]}
             >
           <InputComponent value={statePoductDetails.price} onChange={handleOnchangeDetails} name="price"/>
           </Form.Item>


           <Form.Item
                label="CountInStock"
                name="countInStock"
                rules={[{ required: true, message: 'Please input your countInStock!' }]}
             >
           <InputComponent value={statePoductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock"/>
           </Form.Item>


           <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true, message: 'Please input your rating!' }]}
             >
           <InputComponent value={statePoductDetails.rating} onChange={handleOnchangeDetails} name="rating"/>
           </Form.Item>

           <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input your description!' }]}
             >
           <InputComponent value={statePoductDetails.description} onChange={handleOnchangeDetails} name="description"/>
           </Form.Item>

           <Form.Item
                label="Discount"
                name="discount"
                rules={[{ required: true, message: 'Please input your discount of Product!' }]}
             >
           <InputComponent value={statePoductDetails.description} onChange={handleOnchangeDetails} name="discount"/>
           </Form.Item>



           <Form.Item
                label="image"
                name="image"
                rules={[{ required: true, message: 'Please input your image!' }]}
             >
                <WrapperUploadFile onChange={handleOnChangeAvatarDetails} name="image" maxCount={1}>
                    <Button>chọn ảnh</Button>
                    {statePoductDetails?.image && (
                        <img src={statePoductDetails?.image} style={{
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

export default AdminProduct