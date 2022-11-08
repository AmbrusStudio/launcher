import * as Sentry from '@sentry/react'
import { Falsy, useCall, useCalls, useContractFunction } from '@usedapp/core'
import { BigNumber, Contract } from 'ethers'
import { useEffect, useMemo, useState } from 'react'

import { defaultChainId } from '../contracts'
import { ERC721__factory } from '../typechain/factories/@openzeppelin/contracts/token/ERC721/ERC721__factory'
import { E4CRangerHolder__factory } from '../typechain/factories/contracts/E4CRangerHolder.sol/E4CRangerHolder__factory'
import { E4CRangerHolder__factory as E4CRangerHolderFactory } from '../typechain/factories/contracts/E4CRangerHolder__factory'

/**
 * E4CRangerHolder
 * @param tokenAddress
 * @returns
 */
export function useE4CRanger(tokenAddress: string | Falsy) {
  const call = tokenAddress && {
    contract: new Contract(tokenAddress, E4CRangerHolder__factory.abi),
    method: 'nft',
    args: [],
  }

  const { value, error } =
    useCall(call, {
      chainId: defaultChainId,
    }) ?? {}
  if (error) {
    const e = `Error encountered calling 'nft' on ${error.message}`
    console.error(e)
    Sentry.captureException(e)

    return undefined
  }

  return value?.[0]
}

/**
 * ERC721 safeTransferFrom
 * @param tokenAddress
 * state
 * {"status":"None"}
 * {"status":"PendingSignature","chainId":4}
 * {"transaction":{"hash":"0x5340d127d3ca3c4829e8cc6d7cd6e69f4ab2dca2ab20d13ff19f8dcc36c45333","type":2,"accessList":null,"blockHash":null,"blockNumber":null,"transactionIndex":null,"confirmations":0,"from":"0x8Dd609188f6479732AC5aEa52e53264FF8Dc0Eb6","gasPrice":{"type":"BigNumber","hex":"0x59682f0e"},"maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"maxFeePerGas":{"type":"BigNumber","hex":"0x59682f0e"},"gasLimit":{"type":"BigNumber","hex":"0x01a920"},"to":"0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8","value":{"type":"BigNumber","hex":"0x00"},"nonce":59,"data":"0x42842e0e0000000000000000000000008dd609188f6479732ac5aea52e53264ff8dc0eb600000000000000000000000007e64da6f2f62bc34dcf1bb7d281c1977337d76b0000000000000000000000000000000000000000000000000000000000000011","r":"0x9fb7f0695b18a4e83b997ca0ffd2fc237c8dec5594bf8951cdebdf4b89d8bdcb","s":"0x065a8c820d08394b5eec555e737ea8544a15c3b449120ca26e69b961d6705b0f","v":0,"creates":null,"chainId":0},"status":"Mining","chainId":4}
 * {"receipt":{"to":"0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8","from":"0x8Dd609188f6479732AC5aEa52e53264FF8Dc0Eb6","contractAddress":null,"transactionIndex":17,"gasUsed":{"type":"BigNumber","hex":"0x0180f1"},"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000200000000000000000000000000008000000000000000000000000000000000000000000000000020100000000000000000800000000004000000000000010000000000000000002000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000010000000000000400000010001002000000000000000000001000000000000000000000000800000020000010000000000000004000000000000000000000000001000000000000000000","blockHash":"0x4497fa7bcda9896c51cbeb0cb663fa26d941837531fd421b4b0b4b276a83f717","transactionHash":"0x5340d127d3ca3c4829e8cc6d7cd6e69f4ab2dca2ab20d13ff19f8dcc36c45333","logs":[{"transactionIndex":17,"blockNumber":11296959,"transactionHash":"0x5340d127d3ca3c4829e8cc6d7cd6e69f4ab2dca2ab20d13ff19f8dcc36c45333","address":"0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8","topics":["0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925","0x0000000000000000000000008dd609188f6479732ac5aea52e53264ff8dc0eb6","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000011"],"data":"0x","logIndex":41,"blockHash":"0x4497fa7bcda9896c51cbeb0cb663fa26d941837531fd421b4b0b4b276a83f717"},{"transactionIndex":17,"blockNumber":11296959,"transactionHash":"0x5340d127d3ca3c4829e8cc6d7cd6e69f4ab2dca2ab20d13ff19f8dcc36c45333","address":"0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000008dd609188f6479732ac5aea52e53264ff8dc0eb6","0x00000000000000000000000007e64da6f2f62bc34dcf1bb7d281c1977337d76b","0x0000000000000000000000000000000000000000000000000000000000000011"],"data":"0x","logIndex":42,"blockHash":"0x4497fa7bcda9896c51cbeb0cb663fa26d941837531fd421b4b0b4b276a83f717"}],"blockNumber":11296959,"confirmations":1,"cumulativeGasUsed":{"type":"BigNumber","hex":"0x6e1924"},"effectiveGasPrice":{"type":"BigNumber","hex":"0x59682f09"},"status":1,"type":2,"byzantium":true,"events":[{"transactionIndex":17,"blockNumber":11296959,"transactionHash":"0x5340d127d3ca3c4829e8cc6d7cd6e69f4ab2dca2ab20d13ff19f8dcc36c45333","address":"0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8","topics":["0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925","0x0000000000000000000000008dd609188f6479732ac5aea52e53264ff8dc0eb6","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000011"],"data":"0x","logIndex":41,"blockHash":"0x4497fa7bcda9896c51cbeb0cb663fa26d941837531fd421b4b0b4b276a83f717","args":["0x8Dd609188f6479732AC5aEa52e53264FF8Dc0Eb6","0x0000000000000000000000000000000000000000",{"type":"BigNumber","hex":"0x11"}],"event":"Approval","eventSignature":"Approval(address,address,uint256)"},{"transactionIndex":17,"blockNumber":11296959,"transactionHash":"0x5340d127d3ca3c4829e8cc6d7cd6e69f4ab2dca2ab20d13ff19f8dcc36c45333","address":"0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000008dd609188f6479732ac5aea52e53264ff8dc0eb6","0x00000000000000000000000007e64da6f2f62bc34dcf1bb7d281c1977337d76b","0x0000000000000000000000000000000000000000000000000000000000000011"],"data":"0x","logIndex":42,"blockHash":"0x4497fa7bcda9896c51cbeb0cb663fa26d941837531fd421b4b0b4b276a83f717","args":["0x8Dd609188f6479732AC5aEa52e53264FF8Dc0Eb6","0x07E64dA6F2F62bc34Dcf1bb7d281c1977337d76b",{"type":"BigNumber","hex":"0x11"}],"event":"Transfer","eventSignature":"Transfer(address,address,uint256)"}]},"transaction":{"hash":"0x5340d127d3ca3c4829e8cc6d7cd6e69f4ab2dca2ab20d13ff19f8dcc36c45333","type":2,"accessList":null,"blockHash":null,"blockNumber":null,"transactionIndex":null,"confirmations":0,"from":"0x8Dd609188f6479732AC5aEa52e53264FF8Dc0Eb6","gasPrice":{"type":"BigNumber","hex":"0x59682f0e"},"maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"maxFeePerGas":{"type":"BigNumber","hex":"0x59682f0e"},"gasLimit":{"type":"BigNumber","hex":"0x01a920"},"to":"0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8","value":{"type":"BigNumber","hex":"0x00"},"nonce":59,"data":"0x42842e0e0000000000000000000000008dd609188f6479732ac5aea52e53264ff8dc0eb600000000000000000000000007e64da6f2f62bc34dcf1bb7d281c1977337d76b0000000000000000000000000000000000000000000000000000000000000011","r":"0x9fb7f0695b18a4e83b997ca0ffd2fc237c8dec5594bf8951cdebdf4b89d8bdcb","s":"0x065a8c820d08394b5eec555e737ea8544a15c3b449120ca26e69b961d6705b0f","v":0,"creates":null,"chainId":0},"status":"Success","chainId":4}
 * {"status":"Exception","errorMessage":"execution reverted: The contract doesn't hold the specific token","errorCode":-32603,"errorHash":"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002c54686520636f6e747261637420646f65736e277420686f6c642074686520737065636966696320746f6b656e0000000000000000000000000000000000000000","chainId":4}
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
  const [upgraded, setUpgraded] = useState<(boolean | undefined)[]>([])

  const emptyCalls = useMemo(() => [], [])

  const calls =
    tokenIds?.map((tokenId) => ({
      contract: new Contract(tokenAddress, E4CRangerHolder__factory.abi),
      method: 'upgraded',
      args: [tokenId],
    })) ?? []
  const results =
    useCalls(calls, {
      chainId: defaultChainId,
    }) ?? emptyCalls
  results.forEach((result, idx) => {
    if (result && result.error) {
      const e = `Error encountered calling 'upgraded' on ${calls[idx]?.contract.address}: ${result.error.message}`

      console.error(e)
      Sentry.captureException(e)
    }
  })
  results.length && console.log('useUpgradeds results', results)

  useEffect(() => {
    setUpgraded(results.map((result) => result?.value?.[0]))
  }, [results])

  return upgraded
}

/**
 * E4CRanger originalOwner
 * @param tokenAddress
 * @param tokenIds
 * @returns constants.AddressZero || Address
 */
export function useOriginalOwners(tokenAddress: string, tokenIds: string[]) {
  const [originalOwner, setOriginalOwner] = useState<string[]>([])

  const emptyCalls = useMemo(() => [], [])

  const calls =
    tokenIds?.map((tokenId) => ({
      contract: new Contract(tokenAddress, E4CRangerHolderFactory.abi),
      method: 'originalOwner',
      args: [tokenId],
    })) ?? []

  const results =
    useCalls(calls, {
      chainId: defaultChainId,
    }) ?? emptyCalls
  results.forEach((result, idx) => {
    if (result && result.error) {
      const e = `Error encountered calling 'originalOwner' on ${calls[idx]?.contract.address}: ${result.error.message}`

      console.error(e)
      Sentry.captureException(e)
    }
  })
  results.length && console.log('useOriginalOwners results', results)

  useEffect(() => {
    setOriginalOwner(results.map((result) => result?.value?.[0]))
  }, [results])

  return originalOwner
}

/**
 * totalStakingTime
 * @param tokenAddress
 * @param tokenId
 * @returns
 */
export function useE4CRangerTotalStakingTime(tokenAddress: string | Falsy, tokenId: string | Falsy): BigNumber | Falsy {
  const call = tokenAddress &&
    tokenId && {
      contract: new Contract(tokenAddress, E4CRangerHolder__factory.abi),
      method: 'totalStakingTime',
      args: [tokenId],
    }

  const { value, error } =
    useCall(call, {
      chainId: defaultChainId,
    }) ?? {}
  if (error) {
    const e = `Error encountered calling 'totalStakingTime' on ${error.message}`
    console.error(e)
    Sentry.captureException(e)

    return undefined
  }

  // console.log('useE4CRangerTotalStakingTime value', value)

  return value?.[0]
}

/**
 * upgradeDuration
 * @param tokenAddress
 * @returns
 */
export function useE4CRangerUpgradeDuration(tokenAddress: string | Falsy): BigNumber | Falsy {
  const call = tokenAddress && {
    contract: new Contract(tokenAddress, E4CRangerHolder__factory.abi),
    method: 'upgradeDuration',
    args: [],
  }

  const { value, error } =
    useCall(call, {
      chainId: defaultChainId,
    }) ?? {}
  if (error) {
    const e = `Error encountered calling 'upgradeDuration' on ${error.message}`
    console.error(e)
    Sentry.captureException(e)

    return undefined
  }

  // console.log('useE4CRangerUpgradeDuration value', value)

  return value?.[0]
}
