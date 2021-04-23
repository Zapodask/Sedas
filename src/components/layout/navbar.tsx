import { useContext, useState } from 'react'
import { Nav } from '@/styles/components/layout/navbar'

import Switch from 'react-switch'
import { ThemeContext } from '@/contexts/ThemeContext'

import { SearchContext } from '@/contexts/SearchContext'
import AddModal from './addModal'

const NavBar = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [inputSearch, setInputSearch] = useState<string>('')

  const { theme, toggleTheme } = useContext(ThemeContext)
  const { setSearch, setPage } = useContext(SearchContext)

  return (
        <>
            <Nav checked={checked} >
                <input id='nav-toggle' type='checkbox' onChange={() => setChecked(!checked)} />
                <div className='logo'>
                    <h1>Sedas</h1>
                </div>
                <ul className='links'>
                    <li>
                        <Switch
                            checked={theme.title === 'dark'}
                            onChange={() => {
                              toggleTheme()
                              setChecked(false)
                            }}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor='#3c096c'
                            handleDiameter={25}
                            height={15}
                        />
                    </li>
                    <li>
                        <input
                            className='search'
                            placeholder='Pesquisar'
                            onKeyUp={key => key.key === 'Enter' ? () => {
                              setSearch(inputSearch)
                              setPage(1)
                              setChecked(false)
                            } : null}
                            onChange={e => setInputSearch(e.target.value)}
                        />
                    </li>
                    <li>
                        <button onClick={() => {
                          setShowModal(true)
                          setChecked(false)
                        }}>Adicionar</button>
                    </li>
                </ul>
                <label htmlFor='nav-toggle' className='icon-burger'>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                </label>
            </Nav>

            <AddModal open={showModal} setOpen={setShowModal} />
        </>
  )
}

export default NavBar
