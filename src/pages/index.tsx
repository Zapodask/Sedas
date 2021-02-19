/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { useFetch } from '@/hooks/useFetch'
import { Container, Button, Form, Table, Input, PageForm, Image, ConfirmModal, ImageModal } from '@/styles/pages/index'

import { Button as MButton, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import AddIcon from '@material-ui/icons/Add'
import Link from 'next/link'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

interface Data {
  _id: string
  image: string
  brand: string
  series: string
  type: string
  size: string
}

interface Search {
  brand: string
  series: string
  type: string
  size: string
}

const Home: React.FC = () => {
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [type, setType] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [imageModal, setImageModal] = useState<boolean>(false)
  const [imageModalContent, setImageModalContent] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<Search>()

  const openImage = async (image: string) => {
    await setImageModalContent(image)

    setImageModal(true)
  }

  const { data, error, mutate, isValidating } = useFetch(`sedas?page=${page}&&search=${JSON.stringify(search)}`)

  useEffect(() => {
    mutate()
  }, [page, search])

  if (isValidating === true) return <h1>Carregando...</h1>

  if (error) return <h1>Erro ao carregar</h1>

  if (!data) return <h1>Carregando...</h1>

  const handleDelete = () => {
    fetch('/api/sedas/' + id, {
      method: type,
      body: JSON.stringify({ key: key })
    }).then(function (response) {
      switch (response.status) {
        case 200:
          mutate()
          break
        case 409:
          alert('Chave inválida.')
          break
        default:
          alert('Erro ao deletar.')
      }
    })

    setConfirmModal(false)
  }

  return (
    <Container>
      <Head>
        <title>Sedas</title>
      </Head>
      <header>
        <Link href='/add' >
            <Button>
              <AddIcon />
            </Button>
        </Link>
      </header>

      <Form onSubmit={(data: Search) => setSearch(data)}>
        <Table>
          <tr>
            <th>Actions</th>
            <th>Imagem</th>
            <th>Marca</th>
            <th>Série</th>
            <th>Tipo</th>
            <th>Tamanho</th>
          </tr>
          <tr>
            <th>
              <button type='submit'>Pesquisar</button>
            </th>
            <th />
            <th>
              <Input name='brand' placeholder='Pesquisar' />
            </th>
            <th>
              <Input name='series' placeholder='Pesquisar' />
            </th>
            <th>
              <Input name='type' placeholder='Pesquisar' />
            </th>
            <th>
              <Input name='size' placeholder='Pesquisar' />
            </th>
          </tr>
          {data.map((seda: Data) =>
            <tr key={seda._id}>
              <td>
                <MButton
                  variant='contained'
                  color='secondary'
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setType('DELETE')
                    setId(seda._id)
                    setConfirmModal(true)
                  }}
                >
                  Delete
                </MButton>
              </td>
              <td>
                <Image onClick={() => openImage(seda.image)} src={seda.image} />
              </td>
              <td>
                {seda.brand}
              </td>
              <td>
                {seda.series}
              </td>
              <td>
                {seda.type}
              </td>
              <td>
                {seda.size}
              </td>
            </tr>
          )}
        </Table>
      </Form>

      <PageForm>
        <div>
          <IconButton onClick={() => setPage(prevState => prevState - 1)} disabled={page === 1} >
            <ArrowBackIosIcon />
          </IconButton>

          <h2>{page}</h2>

          <IconButton onClick={() => setPage(prevState => prevState + 1)} disabled={data.length < 10} >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </PageForm>

      <ConfirmModal open={confirmModal} onClose={() => setConfirmModal(false)} >
        <main>
          <h1>Chave:</h1>
          <input onChange={e => setKey(e.target.value)} /><br />
          <button onClick={handleDelete} >Submit</button>
        </main>
      </ConfirmModal>

      <ImageModal open={imageModal} onClose={() => setImageModal(false)} >
        <img src={imageModalContent} />
      </ImageModal>
    </Container>
  )
}

export default Home
