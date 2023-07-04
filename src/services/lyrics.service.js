import axios from 'axios'
export const lyricsService = {
  getSongLyrics,
}

async function getSongLyrics(artist, title) {
  return axios
    .get(`http://localhost:3030/api/lyrics/${artist}/${title}`)
    .then((response) => {
      const lyricsLines = response.data.split('\n')
      let timer = 0
      const lyricsArray = lyricsLines.map((line, index) => {
        const timedLyric = {
          time: timer,
          text: line,
        }
        timer += 4
        return timedLyric
      })

      const trimmedLyricsArray = lyricsArray.slice(0, -2)
      return trimmedLyricsArray
    })
    .catch((error) => {
      console.error(error)
    })
}
