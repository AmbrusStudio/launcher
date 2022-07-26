/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, BigNumberish, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { PromiseOrValue } from '../../../common'
import type { E4CRangerHolder, E4CRangerHolderInterface } from '../../../contracts/E4CRangerHolder.sol/E4CRangerHolder'

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_upgradeDuration',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'lastStakingTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nft',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'totalStakingTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'upgradeDuration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'upgraded',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const _bytecode =
  '0x608060405234801561001057600080fd5b5060405161071238038061071283398101604081905261002f91610058565b600080546001600160a01b0319166001600160a01b039390931692909217909155600155610092565b6000806040838503121561006b57600080fd5b82516001600160a01b038116811461008257600080fd5b6020939093015192949293505050565b610671806100a16000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063863abf791161005b578063863abf7914610144578063a123c33e1461014d578063f4da8a0c14610176578063f7ea244e1461019657600080fd5b80630c805a441461008d578063150b7a02146100c05780632e17de781461010457806347ccca0214610119575b600080fd5b6100ad61009b3660046105c7565b60056020526000908152604090205481565b6040519081526020015b60405180910390f35b6100d36100ce3660046104eb565b6101c9565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016100b7565b6101176101123660046105c7565b61034f565b005b60005461012c906001600160a01b031681565b6040516001600160a01b0390911681526020016100b7565b6100ad60015481565b61012c61015b3660046105c7565b6002602052600090815260409020546001600160a01b031681565b6100ad6101843660046105c7565b60046020526000908152604090205481565b6101b96101a43660046105c7565b60036020526000908152604090205460ff1681565b60405190151581526020016100b7565b600080546001600160a01b031633146102295760405162461bcd60e51b815260206004820152601260248201527f4e6f742061636365707461626c65204e4654000000000000000000000000000060448201526064015b60405180910390fd5b600f83116102795760405162461bcd60e51b815260206004820152601d60248201527f43616e6e6f74207374616b6520756c74696d6174652065646974696f6e0000006044820152606401610220565b60008381526003602052604090205460ff16156102d85760405162461bcd60e51b815260206004820152601e60248201527f43616e6e6f74207374616b6520676f6c6420706c75732065646974696f6e00006044820152606401610220565b5050600090815260026020908152604080832080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0395909516949094179093556005905220429055507f150b7a020000000000000000000000000000000000000000000000000000000090565b6000818152600260205260409020546001600160a01b031633146103b55760405162461bcd60e51b815260206004820152601460248201527f596f75277265206e6f7420746865206f776e65720000000000000000000000006044820152606401610220565b6000818152600560205260408120546103ce90426105f8565b600083815260046020526040812054919250906103f8906103f09084906105e0565b6001546104b7565b6000848152600460205260409020819055600154909150811061042f576000838152600360205260409020805460ff191660011790555b6000546040517f42842e0e000000000000000000000000000000000000000000000000000000008152306004820152336024820152604481018590526001600160a01b03909116906342842e0e90606401600060405180830381600087803b15801561049a57600080fd5b505af11580156104ae573d6000803e3d6000fd5b50505050505050565b60008183106104c657816104c8565b825b9392505050565b80356001600160a01b03811681146104e657600080fd5b919050565b6000806000806080858703121561050157600080fd5b61050a856104cf565b9350610518602086016104cf565b925060408501359150606085013567ffffffffffffffff8082111561053c57600080fd5b818701915087601f83011261055057600080fd5b81358181111561056257610562610625565b604051601f8201601f19908116603f0116810190838211818310171561058a5761058a610625565b816040528281528a60208487010111156105a357600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000602082840312156105d957600080fd5b5035919050565b600082198211156105f3576105f361060f565b500190565b60008282101561060a5761060a61060f565b500390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea264697066735822122036801660330a831d405574fc88edf6f7509982c30f20fc167c2935d7a4546b4164736f6c63430008060033'

type E4CRangerHolderConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (xs: E4CRangerHolderConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1

export class E4CRangerHolder__factory extends ContractFactory {
  constructor(...args: E4CRangerHolderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    _nft: PromiseOrValue<string>,
    _upgradeDuration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<E4CRangerHolder> {
    return super.deploy(_nft, _upgradeDuration, overrides || {}) as Promise<E4CRangerHolder>
  }
  override getDeployTransaction(
    _nft: PromiseOrValue<string>,
    _upgradeDuration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_nft, _upgradeDuration, overrides || {})
  }
  override attach(address: string): E4CRangerHolder {
    return super.attach(address) as E4CRangerHolder
  }
  override connect(signer: Signer): E4CRangerHolder__factory {
    return super.connect(signer) as E4CRangerHolder__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): E4CRangerHolderInterface {
    return new utils.Interface(_abi) as E4CRangerHolderInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): E4CRangerHolder {
    return new Contract(address, _abi, signerOrProvider) as E4CRangerHolder
  }
}
