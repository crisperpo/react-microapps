import type { Product } from '../types'

const API_URL = 'https://dummyjson.com/products?limit=50'

const getProducts = (): Promise<Product[]> => {
    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data.products;
        })
        .catch(error => {
            console.error('Product fetch failed:', error);
            throw error;
        });
}

export { getProducts }
