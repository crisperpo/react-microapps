import { useState, useEffect, useContext } from 'react'

import { Products } from './components/Products'
import { Filters } from './components/Filters'
import { Cart } from './components/Cart'
import { getProducts } from './services/getProducts'
import { FilterContext } from './context/filter'
import './App.css'
import type { Product } from './types.d'

const useFilters = () => {
  const {filters, setFilters} = useContext(FilterContext)


  const filteredProducts = (products: Product[]) => {
    const newProducts = products.filter(
      (product) => {
        return (
          product.price >= filters.minPrice &&
          (filters.category === 'all' || product.category === filters.category)
        )
      }
    )
    return newProducts
  }

  return {filteredProducts, setFilters}
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const {filteredProducts} = useFilters()

  useEffect(() => {
    let isMounted = true

    setLoading(true)
    if(isMounted) {
      getProducts().then((productsData) => {
        setProducts(productsData)
        setLoading(false)
      })
    }

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <header>
        <h1>Shopping cart with React</h1>
        <Filters />
      </header>
      <Cart />
      <main>
        {loading && <div>...</div>} 
        <Products products={filteredProducts(products)} />
      </main>
    </>
  )
}

export default App
