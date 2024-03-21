import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import *as CommentService from '../../Service/CommentService.js'
import { useUserMutation } from "../../hooks/userMutationHook.js"
import {useNavigate} from 'react-router-dom';
import InputForm from "../InputForm/InputForm.jsx";
import LoadingComponent from "../LoadingComponent/LoadingComponent.jsx";
import *as message from '../../components/Message/Message'
import { useQuery } from 'react-query';

const CommentComponent = ({idProduct}) => {
    const [comment, setComment] = useState('')
    const user = useSelector((state) => state.user)
    console.log('user: ', user)
    const navigate = useNavigate()

    const handleComment = (value) => {
        setComment(value)
    }

    const mutation = useUserMutation(
        (data) => {
            const {
            ...resets
            } = data;

            const res = CommentService.createComment(
                {...resets}
            )
            return res;
        } 
    )
    const {isLoading, isSuccess, isEror, data} = mutation;
    console.log('data: ', data)


    const handleCreateComment = () => {
        if(!user?.access_token || !user?.id){
            navigate('/sign-in')
        }else if(user?.access_token && user?.id){
            mutation.mutate({
                comment,
                name: user?.name,
                avatar: user?.avatar,
                user: user?.id,
                product: idProduct
            })
          
           
        }
        
    }
   console.log('comment: ', comment)

   useEffect(()=> {
    if(isSuccess && data?.status === 'OK'){
        message.success('Đã đăng bình luận');
        setComment('')
    }else if(isEror){
        message.error();
    }

   }, [data, isSuccess, isEror])

   const fetAllComment = async () => {
    const res = await CommentService.getAllComment();
    console.log('res: ', res)
    return res.data;
   

   }
   const {isLoading: isLoadingAllComment, data: Comments} = useQuery({queryKey: ['Comments'], queryFn: fetAllComment});

   useEffect(() => {
    fetAllComment();
   }, [])

  

    return( 
       
            <div style={{width: '98%', height: '100%', marginTop: '40px'}}>
                 <LoadingComponent isLoading={isLoading}>
                {Array.isArray(Comments) && 
                    (
                        <h2 style={{padding: '15px'}}>{Comments.length} bình luận</h2>
                    )
                    
                }
                
                    <div style={{display: 'flex', gap: '16px'}}>
                       {user?.avatar ? (
                           <img src={user?.avatar} alt="" style={{width: '70px', height: '70px', borderRadius: '50%'}}/>
                        ) : (
                           <img src="" style={{width: '70px', height: '70px', borderRadius: '50%'}}/>   
                        )}
                       <InputForm type="comment" style={{width: '100%', height: '100%', padding: '15px'}} 
                        value={comment}
                        onChange={handleComment}/>
                    </div>
          
                    <div style={{margin: '10px 0', direction: 'rtl'}}>
                       <button
                       onClick={() => handleCreateComment()} 
                       style={{padding: '5px', width: '80px', borderRadius: '5px'}}>Bình luận</button>

                    </div>
         
                    {Array.isArray(Comments) && Comments?.map((Comment) => {
                        if(comment?.product !== idProduct){
                            <span>Không có bình luận đánh giá nào</span>

                        }else if(comment?.product === idProduct){
                            return(
                                <div style={{ height: '100%', width: '100%'}}>
                                <div style={{display: 'flex'}}>
                                    <img src={Comment?.avatar} alt="" style={{width: '65px', height: '65px', borderRadius: '50%'}} preview={true} />
                                    <div style={{padding: '0 15px'}}>
                                         <div style={{color: 'blue'}}>{Comment?.name}</div>
                                            <span>{Comment?.comment}</span>
                                                 <div style={{display: 'flex', padding: '8px', direction: 'rtl', gap: '7px'}}>
                                                     <button style={{border: 'none', borderRadius: '5px', padding: '7px', backgroundColor: 'White', fontWeight: 600, outline: 'none'}}>Phản hồi</button>
                                                     <button style={{border: 'none', borderRadius: '5px', padding: '7px', backgroundColor: 'White', fontWeight: 600, outline: 'none'}}>Xóa</button>
                                                 </div>
                             
         
                                         </div>
                        
                                      </div>
                     
                               </div>
        
    
                            )

                        }
                      
                       
                    })}
                     
                      </LoadingComponent>                 

            </div>
      
     
        
    )
}

export default CommentComponent;