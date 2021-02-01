import styled from 'styled-components'
import { Input as Unform } from '@/components/input'

export const Container = styled.div`
    display: grid;
    place-items: center;
`

export const Box = styled.div`
    border-radius: 5px;

    button {
        width: 100%;
        height: 40px;
    }
`

export const Input = styled(Unform)`
    border: 1px solid black;
    border-radius: 5px;
    height: 30px;
    width: 100%;
    margin: 5px 0 5px 0;
`
