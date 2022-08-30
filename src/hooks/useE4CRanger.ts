import { Falsy, useCall, useCalls, useContractFunction } from '@usedapp/core'
import { Contract } from 'ethers'

import { ERC721__factory } from '../typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory'
import { E4CRangerHolder__factory } from '../typechain/factories/contracts/E4CRangerHolder.sol/E4CRangerHolder__factory'

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
export function useUpgraded(tokenAddress: string, tokenIds: string[]): (boolean | undefined)[] {
  console.log('tokenIds', tokenIds)

  const calls =
    tokenIds?.map((tokenId) => ({
      contract: new Contract(tokenAddress, E4CRangerHolder__factory.abi),
      method: 'upgraded',
      args: [tokenId],
    })) ?? []
  const results = useCalls(calls) ?? []
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(
        `Error encountered calling 'totalSupply' on ${calls[idx]?.contract.address}: ${result.error.message}`
      )
    }
  })
  console.log('results', results)
  return results.map((result) => result?.value?.[0])
}
