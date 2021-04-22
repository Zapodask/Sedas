import { ReactNode } from 'react'
import { Container } from '@/styles/components/layout'

import NavBar from './navbar'

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Container>
        <NavBar />

        <main>
            {children}
        </main>
    </Container>
  )
}

export default Layout
