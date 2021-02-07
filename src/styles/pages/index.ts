import styled from 'styled-components'
import { Modal as modal } from '@material-ui/core'

export const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Image = styled.div`
  border: 1px solid black;
  width: 100px;

  img {
  width: 100%;
  height: 100%;
  }
`

export const ConfirmModal = styled(modal)`
    display: grid;
    place-items: center;

    main {
      width: 100%;
      max-width: 300px;
      background: #ffffff;

      padding: 5px;
      border: 1px solid black;
      border-radius: 5px;

      input {
        width: 100%;
        padding: 5px;
        border: 1px solid black;
        border-radius: 5px;
        margin-bottom: 5px
      }

      button {
        width: 100%;
        padding: 5px;
        border: 1px solid black;
        border-radius: 5px;
      }
    }
`

export const ImageModal = styled(modal)`
    display: grid;
    place-items: center;

    img {
      width: 85vw;
    }
`
