import { FastAverageColor } from 'fast-average-color'

const colorCache = {}

export async function getDominantColor(imageSrc) {
  const cachedColor = colorCache[imageSrc]
  if (cachedColor) {
    const gradient = `linear-gradient(to bottom, ${cachedColor} 0%, ${cachedColor} 10%, ${cachedColor} 20%, ${cachedColor} 50%, black 140%, black 70%, black 100%)`
    const bottomGradient = `linear-gradient(${cachedColor} -20%, #121212 9%)`
    return { gradient, bottomGradient }
  }

  const fac = new FastAverageColor()
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  const corsProxyUrl = 'https://api.codetabs.com/v1/proxy?quest='
  img.src = corsProxyUrl + encodeURIComponent(imageSrc)

  return new Promise((resolve, reject) => {
    img.onload = async () => {
      try {
        const color = await fac.getColorAsync(img)
        colorCache[imageSrc] = color
        const gradient = `linear-gradient(to bottom, ${color.rgb} 0%, ${color.rgb} 10%, ${color.rgb} 20%, ${color.rgb} 50%, black 140%, black 70%, black 100%)`
        const bottomGradient = `linear-gradient(${color.rgb} -30%, #121212 9%)`
        resolve({ gradient, bottomGradient })
      } catch (e) {
        reject(e)
      }
    }
  })
}
