/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import Head from 'next/head'

import { useFetch } from '@/hooks/useFetch'
import MaterialTable from 'material-table'

import { Container, Image, Modal } from '@/styles/pages/index'
import Router from 'next/router'

interface Data {
  _id: string
  image: string
  name: string
  brand: string
  size: string
}

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [oldData, setOldData] = useState<Data>()
  // const [newData, setNewData] = useState<Data>()
  const [type, setType] = useState<string>('')
  const [key, setKey] = useState<string>('')

  const handleSubmit = () => {
    fetch('/api/sedas/' + oldData?._id, {
      method: type,
      body: JSON.stringify({ key: key })
    }).then(function (response) {
      switch (response.status) {
        case 200:
          console.log(response)
          break
        case 409:
          alert('Chave inválida.')
          break
        default:
          alert('Erro ao ' + (type === 'DELETE' ? 'deletar' : 'atualizar') + '.')
      }
    })

    setShowModal(false)
  }

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
            editable: 'never',
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
            onClick: () => {
              Router.push('/add')
            }
          }
        ]}
        editable={{
          /* onRowUpdate: (oldData: Data, newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setType('PUT')
                setOldData(oldData)
                setNewData(newData)
                setShowModal(true)

                resolve(true)
              }, 1000)
            }), */
          onRowDelete: (oldData: Data) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setType('DELETE')
                setOldData(oldData)
                setShowModal(true)

                resolve(true)
              }, 1000)
            })
        }}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)} >
        <main>
          <h1>Chave:</h1>
          <input onChange={e => setKey(e.target.value)} /><br />
          <button onClick={handleSubmit} >Submit</button>
        </main>
      </Modal>
    </Container>
  )
}

export default Home
