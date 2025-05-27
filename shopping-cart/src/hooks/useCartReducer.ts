import { useReducer } from 'react'
import type { Product } from '../types.d'
import { cartReducer, cartInitialState, cartActionTypes } from '../reducer/cart'

const useCartReducer = () => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = (product: Product) => dispatch({
        type: cartActionTypes.ADD_TO_CART,
        payload: product
    })
    const removeFromCart = (product: Product) => dispatch({
        type: cartActionTypes.REMOVE_FROM_CART,
        payload: product
    })
    const clearCart = () => dispatch({
        type: cartActionTypes.CLEAR_CART
    })
    return { state, addToCart, removeFromCart, clearCart }
}

export { useCartReducer }
