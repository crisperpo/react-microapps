import { useId, useContext } from 'react'

import { FilterContext } from '../context/filter'

const Filters = () => {
    const minPriceFilterId = useId()
    const categoryFilterId = useId()
    const { filters, setFilters } = useContext(FilterContext)

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = Number(e.target.value)
        setFilters(prevFilters => ({
            ...prevFilters,
            minPrice: newPrice
        }))
    }
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            category: e.target.value
        }))
    }

    return(
        <section className='filters'>
            <div>
                <label htmlFor={minPriceFilterId}>Price</label>
                <input type='range' id={minPriceFilterId} min='0' max='100' onChange={handlePriceChange} value={filters.minPrice}/>
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Category</label>
                <select id={categoryFilterId} onChange={handleCategoryChange}>
                    <option value='all'>All</option>
                    <option value='beauty'>Beauty</option>
                    <option value='fragrances'>Fragances</option>
                </select>
            </div>
            
        </section>
    )
}

export { Filters }