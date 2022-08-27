/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers'
import type { Provider } from '@ethersproject/providers'
import type { IIMXMintable, IIMXMintableInterface } from '../../contracts/IIMXMintable'

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'mintingBlob',
        type: 'bytes',
      },
    ],
    name: 'mintFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export class IIMXMintable__factory {
  static readonly abi = _abi
  static createInterface(): IIMXMintableInterface {
    return new utils.Interface(_abi) as IIMXMintableInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IIMXMintable {
    return new Contract(address, _abi, signerOrProvider) as IIMXMintable
  }
}
