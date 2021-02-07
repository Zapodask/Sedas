/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import Head from 'next/head'

import { useFetch } from '@/hooks/useFetch'
import MaterialTable from 'material-table'

import { Container, Image, ConfirmModal, ImageModal } from '@/styles/pages/index'
import Router from 'next/router'

interface Data {
  _id: string
  image: string
  name: string
  brand: string
  size: string
}

const Home: React.FC = () => {
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const [oldData, setOldData] = useState<Data>()
  const [type, setType] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [imageModal, setImageModal] = useState<boolean>(false)
  const [imageModalContent, setImageModalContent] = useState<string>('')

  const handleSubmit = () => {
    fetch('/api/sedas/' + oldData?._id, {
      method: type,
      body: JSON.stringify({ key: key })
    }).then(function (response) {
      switch (response.status) {
        case 200:
          break
        case 409:
          alert('Chave inválida.')
          break
        default:
          alert('Erro ao ' + (type === 'DELETE' ? 'deletar' : 'atualizar') + '.')
      }
    })

    setConfirmModal(false)
  }

  const openImage = async (image: string) => {
    await setImageModalContent(image)

    setImageModal(true)
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
              <Image onClick={() => openImage(row.image)}>
                <img src={row.image} />
              </Image>
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
          onRowDelete: (oldData: Data) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setType('DELETE')
                setOldData(oldData)
                setConfirmModal(true)

                resolve(true)
              }, 1000)
            })
        }}
      />

      <ConfirmModal open={confirmModal} onClose={() => setConfirmModal(false)} >
        <main>
          <h1>Chave:</h1>
          <input onChange={e => setKey(e.target.value)} /><br />
          <button onClick={handleSubmit} >Submit</button>
        </main>
      </ConfirmModal>

      <ImageModal open={imageModal} onClose={() => setImageModal(false)} >
        <img src={imageModalContent} />
      </ImageModal>
    </Container>
  )
}

export default Home
