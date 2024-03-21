import React, {useEffect, useRef, useState} from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Modal, Checkbox, Form, Space  } from 'antd';
import {  DeleteFilled, EditFilled, SearchOutlined  } from '@ant-design/icons'
import TableComponents from "../TableComponents/TableComponents";
import InputComponent from "../InputComponents/InputComponent";
import { getBase64 } from "../../Utils";
import *as orderService  from '../../Service/orderService'
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import *as message from '../Message/Message';
import { useQuery } from 'react-query'

import { useSelector} from 'react-redux';
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";



const AdminOrder = () => {
  
    const user = useSelector((state) => state?.user)


    const getAllOrderUser = async () => {
        const res = await orderService.getAllOrderUser()
    
        return res;
    } 
    
  
      const queryOrder = useQuery(['orders'], getAllOrderUser)
      const {isLoading: isLoadingOrders, data: orders } = queryOrder 
      

      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}
           onKeyDown={e => e.stopPropagation()}>
            <InputComponent
              // ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined/>}
                size="small"
                style={{ width: 90}}
              >
                Search
              </Button>
              <Button
                // onClick={() => clearFilters && handleReset(clearFilters)}
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

        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
          if (visible) {
            // setTimeout(() => searchInput.current?.select(), 100);
          }
        },
    
      });


      const columns = [
                {
                  title: 'Tên người mua',
                  dataIndex: 'userName',
                  sorter:(a, b) => a.name?.length - b.name?.length,
                  ...getColumnSearchProps('userName')
                },
          
                {
                  title: 'Phone',
                  dataIndex: 'phone',
                  sorter:(a, b) => a.phone?.length - b.phone?.length,
                  ...getColumnSearchProps('phone')
        
                },

                {
                  title: 'Địa chỉ',
                  dataIndex: 'address',
                  sorter:(a, b) => a.address?.length - b.address?.length,
                  ...getColumnSearchProps('address')
        
                },

                {
                  title: 'Giá',
                  dataIndex: 'itemsPrice',
                  sorter:(a, b) => a.itemsPrice?.length - b.itemsPrice?.length,
                  ...getColumnSearchProps('itemsPrice')
        
                },

                {
                  title: 'Phí vận chuyển',
                  dataIndex: 'shippingPrice',
                  sorter:(a, b) => a.shippingPrice?.length - b.shippingPrice?.length,
                  ...getColumnSearchProps('shippingPrice')
        
                },

                {
                  title: 'Tổng',
                  dataIndex: 'totalPrice',
                  sorter:(a, b) => a.totalPrice?.length - b.totalPrice?.length,
                  ...getColumnSearchProps('totalPrice')
        
                },

                {
                  title: 'Thanh toán',
                  dataIndex: 'paymentMethod',
                  sorter:(a, b) => a.paymentMethod?.length - b.paymentMethod?.length,
                  ...getColumnSearchProps('paymentMethod')
        
                },
        
              
                
                
              ];

              const dataTable = orders?.data?.length && orders?.data?.map((order) => {
                console.log('user: ', order)
                return {...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, 
                  address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod]
                }
              })
          
    return(
      <LoadingComponent isLoading={isLoadingOrders || isLoadingOrders}>
          <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{height: '200px', width: '200px'}}>
                <PieChartComponent data={orders?.data}/>
           
            </div>
           

            <div style={{marginTop: '25px'}}>
            <TableComponents columns={columns} isLoading={isLoadingOrders} data={dataTable}/>
            </div>

         
        </div>

      </LoadingComponent>
      
    )
}

export default AdminOrder