import Modal from 'react-modal'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const CardModal = ({ open, setOpen }: Props) => {
  function close () {
    setOpen(false)
  }

  return (
    <Modal
        isOpen={open}
    >
        CardModal
    </Modal>
  )
}

export default CardModal
