import { createContext, ReactNode, useState } from 'react'

interface SearchContextData {
    search: string
    setSearch: (search: string) => void
}

interface Props {
    children: ReactNode
}

export const SearchContext = createContext({} as SearchContextData)

export const SearchProvider = ({ children }: Props) => {
  const [search, setSearch] = useState<string>('')

  return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
  )
}
