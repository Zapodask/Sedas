import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;

    nav {
        width: 100%;
        height: 55px;
        background: #111;
        color: #FFF;

        div {
            width: 100%;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
        }
    }

    main {
        width: 100%;
        max-width: 1366px;
        margin-left: auto;
        margin-right: auto; 
    }
`
