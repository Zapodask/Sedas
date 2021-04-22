import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 60px;

  main {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }

  footer {
    padding: 15px;
    display: flex;
    justify-content: center;

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      button {
        border:none;
        background: none;
        outline: none;
      }

      h2 {
        margin: 0 5px;
      }
    }
  }
`
