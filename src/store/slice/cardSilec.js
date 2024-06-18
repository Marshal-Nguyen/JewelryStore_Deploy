import { createSlice } from '@reduxjs/toolkit'




export const productSlice = createSlice({

    name: "products",
    initialState: {
        CartArr: [],
        CusPoint: [],
        CartWholesale: [],
        CartPromotion: [],
    },

    

    reducers: {
        addProduct: (state, action) => {
            const productIndex = state.CartArr.findIndex((p) => p.id === action.payload.id)
            if (productIndex === -1) {
                state.CartArr.push({ ...action.payload, quantity: 1 })
            } else {
                if (action.payload.categoryId === 7) {
                    state.CartArr[productIndex].quantity += 1;
                }
            }
        },
        deleteProduct: (state, action) => {
            const productIndexRemove = action.payload.id
            const newCart = state.CartArr.filter((item) => item.id !== productIndexRemove)
            return { ...state, CartArr: newCart }
        },


        deleteProductAll: (state, action) => {
            return { ...state, CartArr: [] }
        },


        addCustomer: (state, action) => {
            const productIndex = state.CusPoint.findIndex((p) => p.id === action.payload.id)
            if (productIndex === -1) {
                state.CusPoint.push({ ...action.payload, quantity: 1 })
            } 
        },
        deleteCustomer: (state, action) => {
            return { ...state, CusPoint: [] }
        },
        addPromotion: (state, action) => {
            const productIndex = state.CartPromotion.findIndex((p) => p.id === action.payload.id)
            if (productIndex === -1) {
                state.CartPromotion.push({ ...action.payload, quantity: 1 })
            } 
        },
        deletePromotion: (state, action) => {
            const productIndexRemove = action.payload.id
            const newPromotion = state.CartPromotion.filter((item) => item.id !== productIndexRemove)
            return { ...state, CartPromotion: newPromotion }
        },
        deleteCustomer: (state, action) => {
            return { ...state, CusPoint: [] }
        },
    },

})



// Action creators are generated for each case reducer function

export const { addProduct, deleteProduct, addCustomer, deleteCustomer, deleteProductAll, addProductWholesale, deleteProductWholesale,addPromotion,deletePromotion } = productSlice.actions


export default productSlice.reducer