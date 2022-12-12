import React from 'react'
import useSWRImmutable from 'swr/immutable'

import { BlockInfo, getBlockInfoApi } from '../api'
import { BlockInfoMaterial, getBlockInfoMaterial } from '../utils'

type BlockInfoHeader = BlockInfo

export type HeaderLink = BlockInfoMaterial

type UseHeaderLinks = {
  links: HeaderLink[] | undefined
  isLoading: boolean
  isError: Error | undefined
}

export function useHeaderLinks(): UseHeaderLinks {
  const { data, error, isLoading } = useSWRImmutable<BlockInfoHeader[]>('headerIcon', getBlockInfoApi)
  const links = React.useMemo(() => {
    if (!data) return undefined
    const sortLinks = data.sort((l, r) => l.sort - r.sort)
    return sortLinks.map<HeaderLink>(getBlockInfoMaterial)
  }, [data])

  return { links, isLoading, isError: error }
}

type BlockInfoGame = BlockInfo

export type HeaderGameItem = BlockInfoMaterial & { name: string; soon?: boolean }

export type HeaderGameInfo = { games: HeaderGameItem[] | undefined; exps: HeaderGameItem[] | undefined }

function isGamesData(game: BlockInfoGame): boolean {
  if (game.sort < 200) return true
  return false
}

function getBlockInfoGameItem(info: BlockInfo): HeaderGameItem {
  const material = getBlockInfoMaterial(info)
  return { ...material, name: info.name, soon: info.name?.toLowerCase()?.includes('soon') }
}

type UseHeaderGameInfo = HeaderGameInfo & {
  isLoading: boolean
  isError: Error | undefined
}

export function useHeaderGameInfo(): UseHeaderGameInfo {
  const { data, error, isLoading } = useSWRImmutable<BlockInfoGame[]>('headerGame', getBlockInfoApi)
  const sortGames = data?.sort((l, r) => l.sort - r.sort)
  const games = React.useMemo(() => {
    if (!sortGames) return undefined
    const filteredGames = sortGames.filter(isGamesData)
    return filteredGames.map(getBlockInfoGameItem)
  }, [sortGames])
  const exps = React.useMemo(() => {
    if (!sortGames) return undefined
    const filteredExps = sortGames.filter((exp) => !isGamesData(exp))
    return filteredExps.map(getBlockInfoGameItem)
  }, [sortGames])

  return { games, exps, isLoading, isError: error }
}
