import useSWR from 'swr'

export const useFetch = (url: string, revalidateOnFocus = false) => {
  const { data, error } = useSWR(url, async (url) => {
    const response = await fetch('/api/' + url)
    const data = await response.json()

    return data
  }, { revalidateOnFocus })

  return { data, error }
}
