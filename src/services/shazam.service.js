export const shazamService = {
  identifySong,
}

async function identifySong(data) {
  const res = await fetch('/api/shazam/identify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    const jsonRes = await res.json()
    return jsonRes
  } else {
    throw new Error('Failed to identify song')
  }
}
