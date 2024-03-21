import { createSlice } from '@reduxjs/toolkit'




const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {

    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isSucessOrder: false,

}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const {orderItem} = action.payload;
            
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)

            if(itemOrder){
                if(itemOrder.amount <= itemOrder.countInStock){
                    itemOrder.amount += orderItem?.amount;
                    state.isSucessOrder = true;
                   
                }
               
            }else {
               
                    state.orderItems.push(orderItem)
             
              
            }
          
           
        },


        resetOrder: (state) => {
           
            state.isSucessOrder = false
        },

        increaseAmount: (state, action) => {
            const {idProduct} = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
               itemOrder.amount++;
               if(itemOrderSelected){
                itemOrderSelected.amount++;
               }
             
            
        },
        decreaseAmount: (state, action) => {
            const {idProduct} = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
               itemOrder.amount--;
               if(itemOrderSelected){
                itemOrderSelected.amount--;
               }
               
            
        },
        

        removeOrderProduct: (state, action) => {
            console.log(state, action)
            const {idProduct} = action.payload;
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
                state.orderItems = itemOrder;
                if(itemOrderSelected){
                    state.orderItemsSelected = itemOrderSelected;
                }
                
           
        },

        removeALllOrderProduct: (state, action) => {
            console.log(state, action)
            const {listChecked} = action.payload;
            const itemOrder = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            const itemOrderSelected = state?.orderItemsSelected?.filter((item) => !listChecked.includes(item.product));
                state.orderItems = itemOrder;
                if(itemOrderSelected){
                    state.orderItemsSelected = itemOrderSelected;
                }        
        },
      

        selectedOder: (state, action) => {
            const {listChecked} = action.payload
            const orderSelected = []
            state?.orderItems.forEach((order) => {
                if(listChecked.includes(order?.product)){
                    orderSelected.push(order)
                }
            })
            // console.log('orderSelected: ', orderSelected)
            state.orderItemsSelected = orderSelected;
          
        },

       

    },
})




// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeALllOrderProduct,  selectedOder, resetOrder} = orderSlide.actions

export default orderSlide.reducer


