import { Falsy, useCall, useCalls, useLogs } from '@usedapp/core'
import { Contract } from 'ethers'

import { ERC721__factory } from '../typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory'

/**
 *
 * @param tokenAddress
 * @param account
 * @returns
 */
export function useERC721BalanceOf(tokenAddress: string | Falsy, account: string | Falsy) {
  const { value, error } =
    useCall(
      tokenAddress &&
        account && {
          contract: new Contract(tokenAddress, ERC721__factory.abi),
          method: 'balanceOf',
          args: [account],
        }
    ) ?? {}

  if (error) {
    console.error(error.message)
    return undefined
  }

  return value?.[0]
}

export function useERC721OwnerOf(tokenAddress: string | Falsy, tokenId: string) {
  const { value, error } =
    useCall(
      tokenAddress && {
        contract: new Contract(tokenAddress, ERC721__factory.abi),
        method: 'ownerOf',
        args: [tokenId],
      }
    ) ?? {}

  if (error) {
    console.error(error.message)
    return undefined
  }

  return value?.[0]
}

export function useERC721OwnerOfs(tokenAddress: string, tokenId: string[]) {
  const calls =
    tokenId?.map((id) => ({
      contract: new Contract(tokenAddress, ERC721__factory.abi),
      method: 'ownerOf',
      args: [id],
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

/**
 *
 * @param tokenAddress
 * @returns
 */
export function useERC721Logs(tokenAddress: string | Falsy) {
  const { value, error } =
    useLogs(
      tokenAddress && {
        contract: new Contract(tokenAddress, ERC721__factory.abi),
        event: 'Transfer',
        args: [],
      }
    ) ?? {}

  if (error) {
    console.error(error.message)
    return undefined
  }

  return value
}
