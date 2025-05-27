import { createContext } from 'react'

import { useCartReducer } from '../hooks/useCartReducer'

import type { Product } from '../types.d'

type CartContextType = {
    state: Product[],
    addToCart: (p: Product) => void,
    removeFromCart: (p: Product) => void,
    clearCart: () => void
}

const CartContext = createContext<CartContextType>({
    state: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {}
})

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()
    return (
        <CartContext.Provider value={{
            state,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
