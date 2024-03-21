import React from "react";
import ProductDetailPageComponents from "../../components/ProductDetailPageComponents/ProductDetailPageComponents";
import { useNavigate, useParams } from "react-router-dom";
import CommentComponent from "../../components/CommentComponent/CommentComponent";


const ProductDetailPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
   
    return(
        <div style={{width: '100%', background: '#efefef'}}> 
            <div style={{width: '1270px', height: '100%', margin: '0 auto', maxWidth: '100%', maxWidth: '100%'}}>
                <li style={{listStyle: 'none'}}><span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => navigate('/')}>Trang chủ</span> - Chi tiết sản phẩm</li>
                   <ProductDetailPageComponents idProduct={id}/>
                   {/* <CommentComponent idProduct={id}/> */}
                
            </div>
          
        </div>
    )
}

export default ProductDetailPage