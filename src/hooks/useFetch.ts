import useSWR from 'swr'

export function useFetch (url: string, revalidateOnFocus = false) {
  const { data, error, mutate, isValidating } = useSWR(url, async (url) => {
    const response = await fetch('/api/' + url)
    const data = await response.json()

    return data
  }, { revalidateOnFocus })

  return { data, error, mutate, isValidating }
}
