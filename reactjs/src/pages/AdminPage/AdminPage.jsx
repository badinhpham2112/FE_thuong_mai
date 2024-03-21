import React, { useState } from "react";
import { Menu } from 'antd';
import { getItem } from "../../Utils";
import { AppstoreOutlined, UserOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import HeaderConponents from "../../components/HeaderComponents/HeaderConponents";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminOrder from "../../components/AdminOrder/AdminOrder";

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản Phẩm', 'product', <AppstoreOutlined />),
        getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
     
      ];;
    const [KeySelected, setKeySelected] = useState('');

    const renderPage = (key) => {
        switch(key) {
            case 'user':
            return(
                   <AdminUser />
            )
            case 'product':
                return(
                    <AdminProduct />
                )
            case 'order':
                return(
                    <AdminOrder />
                    )
            default:
            return <></>
        }
        
    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    console.log('KeySelected', KeySelected)
    return(
        <>
        <HeaderConponents isHiddenSearch = 'false'  isHiddenCart = 'false'/>
        <div style={{display: 'flex'}}>
             <Menu 
                mode="inline"
                style={{ width: 256, 
                         height: '100vh',
                         boxShadow: '1px 1px 4px #ccc' 
                       }}
                items={items}
                onClick={handleOnClick}
              />

              <div style={{flex: 1, padding: '15px'}}>
               {renderPage(KeySelected)}
               

            </div>
            
           
        </div>
        </>
        
        
       
    )
}

export default AdminPage