import React from 'react'
import Head from 'next/head'

import { useFetch } from '@/hooks/useFetch'
import MaterialTable from 'material-table'

import { Container, Image } from '@/styles/pages/index'

interface Sedas {
  name: string
  brand: string
  size: string
  image_url: string
}

const Home: React.FC = () => {
  const { data, error } = useFetch('sedas')

  if (data) console.log(data)

  if (error) return <h1>Erro ao carregar</h1>

  if (!data) return <h1>Carregando...</h1>

  return (
    <Container>
      <Head>
        <title>Sedas</title>
      </Head>
        <MaterialTable
          style={{
            width: '100vw',
            height: '100vh'
          }}
          columns={[
            { title: 'Imagem', field: 'image_url',
            render: (row) => (
              <Image
                style={{ height: 'auto', maxWidth: '100px' }}
                alt="my image"
                src={
                  row.image_url
                }
              ></Image>
            ) },
            { title: 'Nome', field: 'name', type: 'string'},
            { title: 'Marca', field: 'brand', type: 'string' },
            { title: 'Tamanho', field: 'size', type: 'string' },
          ]}
          data={data}
          options={{
            paging:true,
            pageSize:5,
            pageSizeOptions:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 50, 100, 150]
          }}
        />
    </Container>
  )
}

export default Home