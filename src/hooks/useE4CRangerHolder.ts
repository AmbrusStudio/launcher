import { Falsy, useCall, useContractFunction } from '@usedapp/core'
import { Contract, utils } from 'ethers'

import { _abi } from '../typechain/factories/contracts/E4CRangerHolder.sol/E4CRangerHolder__factory'

export function useE4CRangerHolder(tokenAddress: string | Falsy) {
  const Interface = new utils.Interface(_abi)

  console.log('Interface', Interface)

  const { value, error } =
    useCall(
      tokenAddress && {
        contract: new Contract(tokenAddress, Interface),
        method: 'nft',
        args: [],
      }
    ) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }

  console.log('value', value, error)

  return value?.[0]
}

export function useE4CRangerHolderReceived(tokenAddress: string) {
  const Interface = new utils.Interface(_abi)
  const contract = new Contract(tokenAddress, Interface)
  const { state, send } = useContractFunction(contract, 'onERC721Received')

  return { state, send }
}

export function useE4CRangerHolderUnstake(tokenAddress: string) {
  const Interface = new utils.Interface(_abi)
  const contract = new Contract(tokenAddress, Interface)
  const { state, send } = useContractFunction(contract, 'unstake')

  return { state, send }
}
