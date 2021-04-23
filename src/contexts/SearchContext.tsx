import { createContext, ReactNode, useState } from 'react'

interface SearchContextData {
    search: string
    setSearch: (search: string) => void
    page: number
    setPage: (page: number) => void
}

interface Props {
    children: ReactNode
}

export const SearchContext = createContext({} as SearchContextData)

export const SearchProvider = ({ children }: Props) => {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  return (
        <SearchContext.Provider value={{ search, setSearch, page, setPage }}>
            {children}
        </SearchContext.Provider>
  )
}
