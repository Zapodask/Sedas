import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 60px;

  main {
    margin: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }
`
