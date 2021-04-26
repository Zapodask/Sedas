import React, { useContext, useEffect } from 'react'
import Layout from '@/components/layout'

import { useFetch } from '@/hooks/useFetch'
import { Container } from '@/styles/pages/index'

import { Seda } from '@/interfaces/index'
import Card from '@/components/card'

import { SearchContext } from '@/contexts/SearchContext'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const preData = await (await fetch('https://sedas.vercel.app/api/sedas?page=1&&search=')).json()

  return {
    props: { preData }
  }
}

const Home: React.FC = ({ preData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { search, page, setPage } = useContext(SearchContext)

  const { data, error, mutate } = useFetch(`sedas?page=${page}&&search=${search}`, { initial: preData })

  useEffect(() => {
    mutate()
  }, [page, search])

  if (error) return <h1>Erro ao carregar</h1>

  return (
    <Layout>
      <Container>
        <main>
          {(data.initial ? data.initial : data).map((seda: Seda) =>
            <Card key={seda._id} seda={seda} />
          )}
        </main>

        <footer>
          <div>
            <button disabled={page === 1} type='button' onClick={() => setPage(page - 1)}>
              <AiOutlineLeft size={25} style={{ cursor: 'pointer' }} />
            </button>

            <h2>{page}</h2>

            <button disabled={data.length < 12} type='button' onClick={() => setPage(page + 1)}>
              <AiOutlineRight size={25} style={{ cursor: 'pointer' }} />
            </button>
          </div>
        </footer>
      </Container>
    </Layout>
  )
}

export default Home
