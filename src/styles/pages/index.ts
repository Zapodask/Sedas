import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Table = styled.table`
  border: 1px solid black;

  th {
    border: 1px solid black;
  };
  td {
    border: 1px solid black;
    padding: 5px;
  };
`

export const Image = styled.img`
  width: 100px;
  height: 100px;
`