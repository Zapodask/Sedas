import React from 'react'
import Head from 'next/head'

import { useFetch } from '@/hooks/useFetch'
import MaterialTable from 'material-table'

import { Container, Image } from '@/styles/pages/index'
import Router from 'next/router'

const Home: React.FC = () => {
  const { data, error } = useFetch('sedas')

  if (error) return <h1>Erro ao carregar</h1>

  if (!data) return <h1>Carregando...</h1>

  return (
    <Container>
      <Head>
        <title>Sedas</title>
      </Head>
      <MaterialTable
        title='Sedas'
        style={{
          width: '100vw',
          height: '100%'
        }}
        columns={[
          {
            title: 'Imagem',
            field: 'image',
            render: (row) => (
            <Image
              src={
                row.image
              }
            ></Image>
            )
          },
          { title: 'Nome', field: 'name', type: 'string' },
          { title: 'Marca', field: 'brand', type: 'string' },
          { title: 'Tamanho', field: 'size', type: 'string' }
        ]}
        data={data}
        options={{
          paging: true,
          pageSize: 10,
          pageSizeOptions: [10, 50, 100, 150]
        }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => {
              Router.push('/add')
            }
          }
        ]}
      />
    </Container>
  )
}

export default Home
