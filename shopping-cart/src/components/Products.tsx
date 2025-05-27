import { useContext } from 'react'

import type { Product } from '../types.d'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import { CartContext } from '../context/cart'

type Props = {
    products: Product[]
}

const Products = ({ products }: Props) => {
    const { state, addToCart, removeFromCart } = useContext(CartContext)

    return (
        <section className='products'>
            <ul>
                {products && (
                    products.map((product) => {
                        const isProductInCart = state.some(p => p.id === product.id )
                        return (
                            <li key={product.id}>
                                <img src={product.thumbnail} alt={product.title} />
                                <h3>{product.title}</h3>
                                <div>{product.category}</div>
                                <div>${product.price}</div>
                                <button onClick={() => isProductInCart ? removeFromCart(product): addToCart(product)}>
                                    { isProductInCart ? <RemoveFromCartIcon />: <AddToCartIcon /> }
                                </button>
                            </li>
                        )
                    })
                )}
            </ul>
        </section>
    )
}

export { Products }
