import { Falsy, useCall, useCalls, useContractFunction } from '@usedapp/core'
import { Contract } from 'ethers'

import { ERC721__factory } from '../typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory'
import { E4CRangerHolder__factory } from '../typechain/factories/contracts/E4CRangerHolder.sol/E4CRangerHolder__factory'
import { E4CRangerHolder__factory as E4CRangerHolderFactory } from '../typechain/factories/contracts/E4CRangerHolder__factory'

/**
 * E4CRangerHolder
 * @param tokenAddress
 * @returns
 */
export function useE4CRanger(tokenAddress: string | Falsy) {
  const { value, error } =
    useCall(
      tokenAddress && {
        contract: new Contract(tokenAddress, E4CRangerHolder__factory.abi),
        method: 'nft',
        args: [],
      }
    ) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }

  return value?.[0]
}

/**
 * ERC721 safeTransferFrom
 * @param tokenAddress
 * @returns
 */
export function useERC721SafeTransferFrom(tokenAddress: string) {
  const contract = new Contract(tokenAddress, ERC721__factory.abi)
  const { state, send } = useContractFunction(contract, 'safeTransferFrom', {
    gasLimitBufferPercentage: 10,
  })

  return { state, send }
}

/**
 * E4CRanger unstake
 * @param tokenAddress
 * @returns
 */
export function useE4CRangerUnstake(tokenAddress: string) {
  const contract = new Contract(tokenAddress, E4CRangerHolder__factory.abi)
  const { state, send } = useContractFunction(contract, 'unstake', {
    gasLimitBufferPercentage: 10,
  })

  return { state, send }
}

/**
 * E4CRanger upgraded
 * @param tokenAddress
 * @param tokenIds
 * @returns
 */
export function useUpgradeds(tokenAddress: string, tokenIds: string[]): (boolean | undefined)[] {
  const calls =
    tokenIds?.map((tokenId) => ({
      contract: new Contract(tokenAddress, E4CRangerHolder__factory.abi),
      method: 'upgraded',
      args: [tokenId],
    })) ?? []
  const results = useCalls(calls) ?? []
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(`Error encountered calling 'upgraded' on ${calls[idx]?.contract.address}: ${result.error.message}`)
    }
  })
  console.log('results', results)
  return results.map((result) => result?.value?.[0])
}

/**
 * E4CRanger originalOwner
 * @param tokenAddress
 * @param tokenIds
 * @returns constants.AddressZero || Address
 */
export function useOriginalOwners(tokenAddress: string, tokenIds: string[]): string[] {
  const calls =
    tokenIds?.map((tokenId) => ({
      contract: new Contract(tokenAddress, E4CRangerHolderFactory.abi),
      method: 'originalOwner',
      args: [tokenId],
    })) ?? []
  const results = useCalls(calls) ?? []
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(
        `Error encountered calling 'originalOwner' on ${calls[idx]?.contract.address}: ${result.error.message}`
      )
    }
  })
  console.log('results', results)
  return results.map((result) => result?.value?.[0])
}
