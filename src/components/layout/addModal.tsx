import Modal from '@/components/modal'
import { Container } from '@/styles/components/layout/addModal'

import { Form } from '@unform/web'
import { Input } from '@/components/input'

import ImageInput from '@/components/imageInput'
import ToBase64 from '@/services/toBase64'

import Router from 'next/router'
import { Data } from '@/interfaces/index'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const AddModal = ({ open, setOpen }: Props) => {
  function close () {
    setOpen(false)
  }

  async function submit (data: Data) {
    if (data.image) {
      data.image = await ToBase64(data.image)
    }

    fetch('/api/sedas', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then((response) => {
      switch (response.status) {
        case 200:
          Router.reload()

          break
        case 401:
          alert('Chave inválida.')

          break
        default:
          alert('Erro ao cadastrar.')
      }
    })
  }

  return (
    <Modal showModal={open} setShowModal={setOpen}>
      <Container>
        <Form onSubmit={submit}>
          <header>
            <h1>Adicionar seda</h1>
          </header>
          <main>
            <div>
              <ImageInput name='image' /><br />
              <Input name='brand' label='Marca' /><br />
              <Input name='series' label='Série' /><br />
              <Input name='type' label='Tipo' /><br />
              <Input name='size' label='Tamanho' /><br />
              <Input name='key' label='Chave' required /><br />
            </div>
          </main>
          <footer>
            <div>
              <button id='close' type='button' onClick={close}>Fechar</button>
              <button id='submit' type='submit'>Adicionar</button>
            </div>
          </footer>
        </Form>
      </Container>
    </Modal>
  )
}

export default AddModal
