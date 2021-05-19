/* eslint-disable no-unused-expressions */
import { useContext, useEffect } from 'react'
import Layout from '@/components/layout'

import Head from 'next/head'
import { useFetch } from '@/hooks/useFetch'

import { Container } from '@/styles/pages/index'
import { Seda } from '@/interfaces/index'

import { Card } from '@/components/card'
import { Pagination } from '@/components/pagination'

import { SearchContext } from '@/contexts/SearchContext'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const preData = await (await fetch('https://sedas.vercel.app/api/sedas?search=')).json()

  return {
    props: { preData }
  }
}

const Home: React.FC = ({ preData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { search, page } = useContext(SearchContext)

  const { data, error, mutate } = useFetch(`sedas?search=${search}`, { initial: preData })

  useEffect(() => {
    mutate()
  }, [page, search])

  if (error) return <h1>Erro ao carregar</h1>

  return (
    <>
      <Head>
        <title>Sedas</title>
      </Head>
      <Layout>
        <Container>
          {(data.initial && page !== 1) || (data.initial && search !== '') ? <h1>Carregando...</h1> : (
            <>
              <Pagination length={data.length} />
              <main>
                {(data.initial ? data.initial : data).map((seda: Seda) =>
                  <Card key={seda._id} seda={seda} />
                )}
              </main>

              <Pagination length={data.length} />
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}

export default Home
