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
  const filename = fileName(urlPathname(url))
  if (filename.includes('@')) {
    const size = filename.split('@')[1]
    return `${url} ${size}`
  }
  return url
}

export function getImageSet(images: string[]): string {
  return images.map((img) => parseImageSize(img)).join(', ')
}
