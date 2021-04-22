import { ReactNode, useState } from 'react'
import { StyledModal } from '@/styles/components/modal'

interface Props {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    children: ReactNode
}

const Modal = ({ showModal, setShowModal, children }: Props) => {
  const [opacity, setOpacity] = useState(0)

  function toggle () {
    setOpacity(0)
    setShowModal(!showModal)
  }

  function afterOpen () {
    setTimeout(() => {
      setOpacity(1)
    }, 100)
  }

  function beforeClose () {
    return new Promise((resolve) => {
      setOpacity(0)
      setTimeout(resolve, 300)
    })
  }

  return (
    <StyledModal
      isOpen={showModal}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
      onBackgroundClick={toggle}
      onEscapeKeydown={toggle}
      backgroundProps={{ opacity }}
      allowScroll={true}
    >
      {children}
    </StyledModal>
  )
}

export default Modal
