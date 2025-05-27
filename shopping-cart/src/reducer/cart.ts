import type { Product, CartActionType } from '../types.d'

const cartInitialState = (JSON.parse(window.localStorage.getItem('cart') || '[]')) as Product[]

const updateCartInLocalStorage = (state: Product[]) => window.localStorage.setItem('cart', JSON.stringify(state))

const cartActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
} as const

const cartReducer = (state: Product[], action: CartActionType) => {
    switch (action.type) {
        case cartActionTypes.ADD_TO_CART: {
            const { id } = action.payload as Product
            const productCartIndex = state.findIndex(product => product.id === id)
            let newState
            if (productCartIndex>=0) {
                newState = [
                    ...state.slice(0, productCartIndex),
                    {
                        ...action.payload,
                        quantity: state[productCartIndex].quantity + 1
                    },
                    ...state.slice(productCartIndex + 1)
                ]
                updateCartInLocalStorage(newState)
                return newState
            }
            newState = [
                ...state,
                {
                    ...action.payload,
                    quantity: 1
                }
            ]
            return newState
        }
        case cartActionTypes.REMOVE_FROM_CART: {
            const { id } = action.payload as Product
            const newState = state.filter(product => product.id !== id)
            updateCartInLocalStorage(newState)
            return newState
        }
        case cartActionTypes.CLEAR_CART:
            updateCartInLocalStorage([])
            return []
        default:
            return state
    }
}

export { cartInitialState, cartActionTypes, cartReducer }
