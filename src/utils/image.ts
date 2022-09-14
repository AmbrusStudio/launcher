import path from 'path'

function urlPathname(url: string): string {
  try {
    const _url = new URL(url)
    return _url.pathname
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Invalid URL')) return url
    throw error
  }
}

function fileName(file: string): string {
  return path.basename(file, path.extname(file))
}

function parseImageSize(url: string): string {
  const matchRegex = new RegExp(/@\dx/)
  const filename = fileName(urlPathname(url))
  if (matchRegex.test(filename)) {
    const match = matchRegex.exec(filename)
    if (match) {
      const size = match[0]
      if (size.includes('@')) return `${url} ${size.replace('@', '')}`
      return `${url} ${size}`
    }
    return url
  }
  return url
}

export function getImageSet(images: string[]): string {
  return images.map((img) => parseImageSize(img)).join(', ')
}
