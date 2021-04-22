import { Container } from '@/styles/components/card'
import { Seda } from '@/interfaces/index'

interface Props {
  seda: Seda
}

const Card = ({ seda }: Props) => {
  return (
    <Container>
      <img src={seda.image} alt='image' onClick={() => console.log('image')} />
      <div onClick={() => console.log('main')}>
        <h4>{seda.brand}</h4>
        <h4>{seda.size}</h4>
      </div>
    </Container>
  )
}

export default Card
