import { createContext, useState } from 'react'

import type { Filter } from '../types'

type FilterContextType = {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

const FilterContext = createContext<FilterContextType>({
  filters: { category: 'all', minPrice: 0 },
  setFilters: () => {}
})

const FilterProvider = ({ children }: {children: React.ReactNode}) => {
    const [filters, setFilters] = useState<Filter>({
        category: 'all',
        minPrice: 0
    })
    return(
        <FilterContext.Provider value={{filters, setFilters}}>
            {children}
        </FilterContext.Provider>
    )
}


export { FilterContext, FilterProvider }
