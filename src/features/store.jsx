import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './reducers/cartSlice'
import siteSlice from './reducers/siteSlice'

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        site: siteSlice
    }
}
)