import { useState } from 'react'
import { Container } from '@/styles/components/card'

import { Seda } from '@/interfaces/index'
import CardModal from './modal'

interface Props {
  seda: Seda
}

export const Card = ({ seda }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Container onClick={() => setOpenModal(true)}>
        <img src={seda.image} alt='image' />
        <div>
          <h4>{seda.brand}</h4>
          <h4>{seda.size}</h4>
        </div>
      </Container>

      <CardModal open={openModal} setOpen={setOpenModal} seda={seda} />
    </>
  )
}
