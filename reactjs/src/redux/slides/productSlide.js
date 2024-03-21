import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: '',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

        SearchProduct: (state, action) => {
            state.search = action.payload

        },
    },
})

// Action creators are generated for each case reducer function
export const { SearchProduct } = productSlice.actions

export default productSlice.reducer