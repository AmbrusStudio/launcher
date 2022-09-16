import type { BlockInfo } from '../../types'
import { getResponsiveMaterial } from '../../utils'
import { getBlockInfoApi } from '../block'

type BlockInfoMaterial = { url: string; img: string }

function getBlockInfoMaterial(info: BlockInfo): BlockInfoMaterial {
  const { material, material_mob, url } = info
  const materialData = getResponsiveMaterial(material, material_mob)
  return { img: materialData.url, url }
}

type BlockInfoHeader = BlockInfo

export type HeaderLink = BlockInfoMaterial

export async function getHeaderLinks(): Promise<HeaderLink[]> {
  const { data: headerData } = await getBlockInfoApi<BlockInfoHeader[]>('headerIcon')
  const sortHeader = headerData.sort((l, r) => l.sort - r.sort)
  const headers = sortHeader.map(getBlockInfoMaterial)
  return headers
}

export type HeaderGameItem = BlockInfoMaterial & { name: string; soon?: boolean }

export type HeaderGameInfo = { games: HeaderGameItem[]; exp: HeaderGameItem[] }

type BlockInfoGame = BlockInfo

function isGamesData(game: BlockInfoGame): boolean {
  if (game.sort < 200) return true
  return false
}

function getBlockInfoGameItem(info: BlockInfo): HeaderGameItem {
  const material = getBlockInfoMaterial(info)
  return { ...material, name: info.name, soon: info.name?.toLowerCase()?.includes('soon') }
}

export async function getHeaderGameInfo(): Promise<HeaderGameInfo> {
  const { data: headerData } = await getBlockInfoApi<BlockInfoGame[]>('headerGame')
  const sortHeader = headerData.sort((l, r) => l.sort - r.sort)
  const filteredGames = sortHeader.filter(isGamesData)
  const filteredExps = sortHeader.filter((exp) => !isGamesData(exp))
  const games = filteredGames.map(getBlockInfoGameItem)
  const exp = filteredExps.map(getBlockInfoGameItem)
  return { games, exp }
}
