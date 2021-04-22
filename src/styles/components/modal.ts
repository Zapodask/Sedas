import styled from 'styled-components'
import Modal from 'styled-react-modal'

interface Props {
  opacity: number
}

export const StyledModal = styled(Modal)<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
`
