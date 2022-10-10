import * as Sentry from '@sentry/react'
import { Falsy, useCall, useCalls, useLogs } from '@usedapp/core'
import { Contract } from 'ethers'

import { defaultChainId } from '../contracts'
import { ERC721__factory } from '../typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory'

/**
 *
 * @param tokenAddress
 * @param account
 * @returns
 */
export function useERC721BalanceOf(tokenAddress: string | Falsy, account: string | Falsy) {
  const call = tokenAddress &&
    account && {
      contract: new Contract(tokenAddress, ERC721__factory.abi),
      method: 'balanceOf',
      args: [account],
    }
  const { value, error } =
    useCall(call, {
      chainId: defaultChainId,
    }) ?? {}

  if (error) {
    const e = `Error encountered calling 'balanceOf' on ${error.message}`
    console.error(e)
    Sentry.captureException(e)

    return undefined
  }

  return value?.[0]
}

export function useERC721OwnerOf(tokenAddress: string | Falsy, tokenId: string) {
  const call = tokenAddress && {
    contract: new Contract(tokenAddress, ERC721__factory.abi),
    method: 'ownerOf',
    args: [tokenId],
  }
  const { value, error } =
    useCall(call, {
      chainId: defaultChainId,
    }) ?? {}

  if (error) {
    const e = `Error encountered calling 'ownerOf' on ${error.message}`
    console.error(e)
    Sentry.captureException(e)

    return undefined
  }

  return value?.[0]
}

/**
 * useERC721 ownerOf
 * @param tokenAddress
 * @param tokenIds
 * @returns
 */
export function useERC721OwnerOfs(tokenAddress: string, tokenIds: string[]): string[] {
  const calls =
    tokenIds?.map((tokenId) => ({
      contract: new Contract(tokenAddress, ERC721__factory.abi),
      method: 'ownerOf',
      args: [tokenId],
    })) ?? []
  const results =
    useCalls(calls, {
      chainId: defaultChainId,
    }) ?? []
  results.forEach((result, idx) => {
    if (result && result.error) {
      const e = `Error encountered calling 'ownerOf' on ${calls[idx]?.contract.address}: ${result.error.message}`

      console.error(e)
      Sentry.captureException(e)
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
    const e = `Error encountered calling 'Transfer' on ${error.message}`
    console.error(e)
    Sentry.captureException(e)

    return undefined
  }

  return value
}
