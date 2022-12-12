import { BlockInfo } from '../api'

type MaterialData = { type: string; url: string }

type Material = { pc: MaterialData; mobole: MaterialData }

function getMaterialType(url: string): string {
  if (!url) return ''
  const split = url.split('|')
  return split[0] ? split[0] : ''
}

function getMaterialUrl(url: string): string {
  if (!url) return ''
  const split = url.split('|')
  return split[1] ? split[1] : ''
}

export function getMaterial(pcUrl: string, moboleUrl: string): Material {
  const data: Material = {
    pc: { type: getMaterialType(pcUrl), url: getMaterialUrl(pcUrl) },
    mobole: { type: getMaterialType(moboleUrl), url: getMaterialUrl(moboleUrl) },
  }
  return data
}

export function getResponsiveMaterial(pcUrl: string, moboleUrl: string): MaterialData {
  const material = getMaterial(pcUrl, moboleUrl)
  if (window) {
    const width = window.innerWidth
    if (width < 1280 && moboleUrl) {
      return material.mobole
    }
  }
  return material.pc
}

export type BlockInfoMaterial = { id: number; url: string; img: string }

export function getBlockInfoMaterial(info: BlockInfo): BlockInfoMaterial {
  const { id, material, material_mob, url } = info
  const materialData = getResponsiveMaterial(material, material_mob)
  return { id, url, img: materialData.url }
}
