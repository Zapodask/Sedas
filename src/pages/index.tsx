import React, { useContext, useEffect } from 'react'
import Layout from '@/components/layout'

import { useFetch } from '@/hooks/useFetch'
import { Container } from '@/styles/pages/index'

import { Seda } from '@/interfaces/index'
import Card from '@/components/card'

import { SearchContext } from '@/contexts/SearchContext'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const preData = await (await fetch('https://sedas.vercel.app/api/sedas?page=1&&search=')).json()

  return {
    props: { preData }
  }
}

const Home: React.FC = ({ preData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const [confirmModal, setConfirmModal] = useState<boolean>(false)
  // const [id, setId] = useState<string>()
  // const [type, setType] = useState<string>('')
  // const [key, setKey] = useState<string>('')
  // const [imageModal, setImageModal] = useState<boolean>(false)
  // const [imageModalContent, setImageModalContent] = useState<string>('')

  const { search, page, setPage } = useContext(SearchContext)

  // const openImage = async (image: string) => {
  //   await setImageModalContent(image)

  //   setImageModal(true)
  // }

  const { data, error, mutate } = useFetch(`sedas?page=${page}&&search=${search}`, { initial: preData })

  useEffect(() => {
    mutate()
  }, [page, search])

  if (error) return <h1>Erro ao carregar</h1>

  // const handleDelete = () => {
  //   fetch('/api/sedas/' + id, {
  //     method: type,
  //     body: JSON.stringify({ key: key })
  //   }).then(function (response) {
  //     switch (response.status) {
  //       case 200:
  //         mutate()
  //         break
  //       case 409:
  //         alert('Chave inválida.')
  //         break
  //       default:
  //         alert('Erro ao deletar.')
  //     }
  //   })

  //   setConfirmModal(false)
  // }

  return (
    <Layout>
      <Container>
        <main>
          {(data.initial ? data.initial : data).map((seda: Seda) =>
            <Card key={seda._id} seda={seda} />
          )}
        </main>

        <footer>
          <div>
            <button disabled={page === 1} type='button' onClick={() => setPage(page - 1)}>
              <AiOutlineLeft size={25} style={{ cursor: 'pointer' }} />
            </button>

            <h2>{page}</h2>

            <button disabled={data.length < 12} type='button' onClick={() => setPage(page + 1)}>
              <AiOutlineRight size={25} style={{ cursor: 'pointer' }} />
            </button>
          </div>
        </footer>
      </Container>
    </Layout>
  )
}

export default Home

// {/* <PageForm>
//       <div>
//         <IconButton onClick={() => setPage(prevState => prevState - 1)} disabled={page === 1} >
//           <ArrowBackIosIcon />
//         </IconButton>

//         <h2>{page}</h2>

//         <IconButton onClick={() => setPage(prevState => prevState + 1)} disabled={data.length < 10} >
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </div>
//     </PageForm>

// <ConfirmModal open={confirmModal} onClose={() => setConfirmModal(false)} >
//   <main>
//     <h1>Chave:</h1>
//     <input onChange={e => setKey(e.target.value)} /><br />
//     <button onClick={handleDelete} >Submit</button>
//   </main>
// </ConfirmModal>

// <ImageModal open={imageModal} onClose={() => setImageModal(false)} >
//   <img src={imageModalContent} />
// </ImageModal> */}
