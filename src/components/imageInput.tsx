import {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState
} from 'react'
import { useField } from '@unform/core'

import { Container } from '@/styles/components/imageInput'

interface Props {
  name: string;
  disabled?: boolean;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const ImageInput: React.FC<InputProps> = ({ name, disabled, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, registerField, defaultValue } = useField(name)

  const [preview, setPreview] = useState(defaultValue)

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      setPreview(null)
    }

    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue (ref: HTMLInputElement) {
        ref.value = ''
        setPreview(null)
      },

      setValue (_: HTMLInputElement, value: string) {
        setPreview(value)
      }
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <div>
        {preview && <img src={preview} alt='Preview' width='100' />}
      </div>
      {disabled === true ? null : <label htmlFor={fieldName}>Escolher imagem</label>}
      <input type='file' id={fieldName} ref={inputRef} onChange={handlePreview} {...rest} />
    </Container>
  )
}
export default ImageInput
