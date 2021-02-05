import React from 'react'
import Head from 'next/head'

import { Form } from '@unform/web'
import ImageInput from '@/components/imageInput'

import { Container, Box, Input } from '@/styles/pages/add'
import Router from 'next/router'

import ToBase64 from '@/services/toBase64'

const Add = () => {
  async function handleSubmit (data: any) {
    if (data.image) {
      data.image = await ToBase64(data.image)
    }

    fetch('/api/sedas', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(function (response) {
      switch (response.status) {
        case 200:
          Router.push('/')
          break
        case 409:
          alert('Chave inválida.')
          break
        default:
          alert('Erro ao cadastrar.')
      }
    })
  }

  return (
    <Container>
        <Head>
            <title>Adicionar seda</title>
        </Head>

        <Box>
          <h1>Adicionar seda</h1>
          <Form onSubmit={handleSubmit}>
              <ImageInput name='image' /><br />
              <p>Nome:</p>
              <Input name='name' /><br />
              <p>Marca:</p>
              <Input name='brand' /><br />
              <p>Tamanho:</p>
              <Input name='size' /><br />
              <p>Chave:</p>
              <Input name='key' /><br />

              <button type='submit'>Adicionar</button>
          </Form>
        </Box>
    </Container>
  )
}

export default Add
