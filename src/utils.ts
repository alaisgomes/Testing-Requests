export const post = async (url: string, data: Record<string, unknown>, headers: Record<string, unknown>={}) => {
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })
  return result.json();
}