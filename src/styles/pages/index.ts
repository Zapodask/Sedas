import styled from 'styled-components'
import { Modal as modal } from '@material-ui/core'
import { Form as Unform } from '@unform/web'
import { Input as cInput } from '@/components/input'

export const Container = styled.div`
  max-width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  header {
    width: 100%;
    height: 50px;
    display: grid;
    align-items: right;
  }
`

export const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: green;
  border: none;
  margin-left: auto;
`

export const Form = styled(Unform)`
  width: 100%;
  height: 100%;
`

export const Table = styled.table`
  width: 100%;

  tr {

  };

  th {
    min-width: 100px;
    height: 50px;
    border: 1px solid black;

    button {
      width: 90%;
      height: 90%;
    }
  };

  td {
    border: 1px solid black;

    div {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
    }
  };
`

export const Input = styled(cInput)`
  width: 100%;
  height: 100%;
`

export const PageForm = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  place-items: center;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
  }
`

export const Image = styled.img`
  border: 1px solid black;
  width: 100px;
  height: 100px;
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
      height: 85vh;
    }
`
