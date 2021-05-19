import { useContext } from 'react'
import { Container } from '@/styles/components/pagination'

import { SearchContext } from '@/contexts/SearchContext'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface Props {
  length: number
}

export const Pagination = ({ length }: Props) => {
  const { page, setPage } = useContext(SearchContext)

  return (
    <Container>
      <div>
        <button disabled={page === 1} type='button' onClick={() => setPage(page - 1)}>
          <AiOutlineLeft size={25} style={{ cursor: 'pointer' }} />
        </button>

        <h2>{page}</h2>

        <button disabled={length < 12} type='button' onClick={() => setPage(page + 1)}>
          <AiOutlineRight size={25} style={{ cursor: 'pointer' }} />
        </button>
        </div>
    </Container>
  )
}
