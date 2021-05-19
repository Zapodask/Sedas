import styled from 'styled-components'

export const Container = styled.div`
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
`
