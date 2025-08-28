import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const cartSlice = createSlice({
    name: 'cart',
    initialState: JSON.parse(localStorage.getItem('texcars__cart')) || [],
    reducers: {
        addToCart: (state, action) => {
            const findProduct = state.find(item => item.id === action.payload.id)
            if (findProduct) {
                toast.error('This Product is already in your cart', {id: '123' })
            } else {
                state.push(action.payload)
                toast.success('New Product added to cart', {id: '123' })
                localStorage.setItem('texcars__cart', JSON.stringify(state))
            }
        },
        changeCartQuantity: (state, action) => {
            state.forEach((item, i) => {
                if (item.id === action.payload.id) {
                    state[i].quantity = action.payload.quantity
                }
            })
            localStorage.setItem('texcars__cart', JSON.stringify(state))
        },
        removeFromCart: (state, action) => {
            state.forEach((item, i) => {
                if (item.id === action.payload.id) {
                    state.splice(i, 1)
                }
            })
            localStorage.setItem('texcars__cart', JSON.stringify(state))
            toast.error('Product removed from cart', {id: '123' })
        },
    }
})

export const { addToCart, changeCartQuantity, removeFromCart } = cartSlice.actions
export default cartSlice.reducer