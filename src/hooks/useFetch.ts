import useSWR from 'swr'

export function useFetch (url: string, initial?: any, revalidateOnFocus = false) {
  const { data, error, mutate } = useSWR(url, async (url) => {
    const response = await fetch('/api/' + url)
    const data = await response.json()

    return data
  }, { initialData: initial, revalidateOnFocus })

  return { data, error, mutate }
}
