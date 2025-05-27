import { createRoot } from 'react-dom/client'
import { FilterProvider } from './context/filter'
import { CartProvider } from './context/cart'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </CartProvider>,
)
