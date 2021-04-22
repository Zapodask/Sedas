import styled from 'styled-components'
import { BaseModalBackground } from 'styled-react-modal'

interface Props {
  opacity: number
}

export const ModalBackground = styled(BaseModalBackground)<Props>`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`
