import React from 'react'
import Head from 'next/head'

import { useFetch } from '@/hooks/useFetch'

import { Container, Table, Image } from '@/styles/pages/index'

const Home: React.FC = () => {
  const { data } = useFetch('sedas')

  if (!data) {
    return (
      <h1>Carregando...</h1>
    )
  }

  return (
    <Container>
      <Head>
        <title>Sedas</title>
      </Head>
      <Table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Tamanho</th>
          </tr>
        </thead>
        <tbody>
          {data.map((seda: any) => {
            return (
              <tr>
                <td>
                  <Image src={seda.image_url} />
                </td>
                <td>
                  <h1>{seda.name}</h1>
                </td>
                <td>
                  <h1>{seda.brand}</h1>
                </td>
                <td>
                  <h1>{seda.size}</h1>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default Home