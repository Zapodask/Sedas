import { useState, useEffect } from 'react'
import Modal from '@/components/modal'

import { Container } from '@/styles/components/card/modal'
import { Form } from '@unform/web'

import { Input } from '@/components/input'
import ImageInput from '@/components/imageInput'

import { Seda, Data } from '@/interfaces/index'
import ToBase64 from '@/services/toBase64'

import Router from 'next/router'
import { FaTrash } from 'react-icons/fa'

import ConfirmDelete from './confirmDelete'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    seda: Seda
}

const CardModal = ({ open, setOpen, seda }: Props) => {
  const [editable, setEditable] = useState<boolean>(false)
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false)

  useEffect(() => {
    if (open === false) {
      setEditable(false)
    }
  }, [open])

  function close () {
    setOpen(false)
  }

  async function submit (data: Data) {
    if (data.image === undefined) {
      delete data.image
    } else {
      data.image = await ToBase64(data.image)
    }

    fetch(`/api/sedas/${seda._id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }).then((response) => {
      switch (response.status) {
        case 200:
          Router.reload()

          close()

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
    <>
      <Modal showModal={open} setShowModal={setOpen}>
          <Container>
              <Form onSubmit={submit} initialData={seda}>
                  <header>
                    <h1>
                      Seda
                    </h1>
                  </header>
                  <main>
                      <div>
                          <ImageInput name='image' disabled={!editable} />
                          <Input name='brand' label='Marca' disabled={!editable} /><br />
                          <Input name='series' label='Série' disabled={!editable} /><br />
                          <Input name='type' label='Tipo' disabled={!editable} /><br />
                          <Input name='size' label='Tamanho' disabled={!editable} /><br />
                          {editable ? <Input name='key' label='Chave' required /> : null}<br />
                      </div>
                      <div className='buttons'>
                          <button id='delete' type='button' onClick={() => setOpenConfirmDelete(true)}>
                            <FaTrash />
                          </button>
                          <button id='edit' type='button' onClick={() => setEditable(prev => !prev)}>Editar</button>
                          <button id='submit' type='submit' style={{ display: editable ? 'initial' : 'none' }}>Confirmar</button>
                      </div>
                  </main>
                  <footer>
                      <div>
                          <button id='close' type='button' onClick={close}>Fechar</button>
                      </div>
                  </footer>
              </Form>
          </Container>
      </Modal>
      <ConfirmDelete open={openConfirmDelete} setOpen={setOpenConfirmDelete} _id={seda._id} modalSetOpen={setOpen} />
    </>
  )
}

export default CardModal
