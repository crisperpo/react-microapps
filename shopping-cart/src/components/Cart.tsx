import { useId, useContext } from 'react'
import { CartIcon, ClearCartIcon } from './Icons'
import { CartContext } from '../context/cart'

const Cart = () => {
    const cartCheckboxId = useId()
    const { state, clearCart, addToCart } = useContext(CartContext)
    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type='checkbox' hidden />
            <aside className='cart'>
                <ul>
                    {state.map(product => (
                        <li>
                        <img src={product.thumbnail} alt={product.title} />
                        <div>{product.title} - ${product.price}</div>
                        <footer>
                            <small>Qty: {product.quantity}</small>
                            <button onClick={() => addToCart(product)}>+</button>
                        </footer>
                    </li>
                    ))}
                </ul>
                {state.length > 0 &&
                    <button onClick={() => clearCart()}><ClearCartIcon /></button>
                }
            </aside>
        </>
    )
}

export { Cart }
