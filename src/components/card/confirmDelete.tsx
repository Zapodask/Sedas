import Modal from '@/components/modal'
import { Container } from '@/styles/components/card/confirmDelete'

import { Form } from '@unform/web'
import { Input } from '@/components/input'

import Router from 'next/router'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    _id: string
    modalSetOpen: (open: boolean) => void
}

interface Data {
  key: string
}

const ConfirmDelete = ({ open, setOpen, _id, modalSetOpen }: Props) => {
  function close () {
    setOpen(false)
  }

  function submit (data: Data) {
    fetch(`/api/sedas/${_id}`, {
      method: 'DELETE',
      body: JSON.stringify(data)
    }).then((response) => {
      switch (response.status) {
        case 200:
          Router.reload()

          close()

          modalSetOpen(false)

          break
        case 409:
          alert('Chave inválida.')
          break
        default:
          alert('Erro ao deletar.')
      }
    })
  }

  return (
    <Modal showModal={open} setShowModal={setOpen}>
      <Container>
        <Form onSubmit={submit}>
          <header>
            <h1>Confirmar exclusão</h1>
          </header>
          <main>
            <Input name='key' label='Chave' required /><br />
          </main>
          <footer>
            <div>
              <button id='close' type='button' onClick={close}>Fechar</button>
              <button id='submit' type='submit'>Excluir</button>
            </div>
          </footer>
        </Form>
      </Container>
    </Modal>
  )
}

export default ConfirmDelete
