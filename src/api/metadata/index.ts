import axios from 'axios'

/**
 * Metadata Api
 * @param param
 * @returns
 */
export async function metadataApi<T = unknown>({ url, tokenId }: { url: string; tokenId: string }) {
  return await axios.get<T>(`${url}${tokenId}`)
}
