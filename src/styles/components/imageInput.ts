import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: grid;
        place-items: center;
        padding: 10px 0;

        img {
            width: 200px;
            height: 200px;
            border: 2px solid #000;
        }
    }

    label {
        color: #FFF;
        cursor: pointer;
        text-align: center;
        padding: 15px;
        background-color: #3f37c9;
        border: 2px solid #000;
        border-radius: 15px;
        width: 200px;
        margin: 0 auto;
    }

    input {
        display: none;
    }
`
