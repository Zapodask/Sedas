import styled from 'styled-components'

export const Container = styled.div`
    min-width: 300px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;

    img {
        width: 100%;
        overflow: hidden;
    }

    div {
        height: 100%;
        height: 60px;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        place-items: center;
    }

    &:hover {
        img {
            opacity: 0.9;
        }
    }
`
