/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, BigNumberish, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { PromiseOrValue } from '../../../common'
import type { E4CRangeHolder, E4CRangeHolderInterface } from '../../../contracts/E4CRangerHolder.sol/E4CRangeHolder'

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
  '0x608060405234801561001057600080fd5b506040516106cf3803806106cf83398101604081905261002f91610058565b600080546001600160a01b0319166001600160a01b039390931692909217909155600155610092565b6000806040838503121561006b57600080fd5b82516001600160a01b038116811461008257600080fd5b6020939093015192949293505050565b61062e806100a16000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063863abf791161005b578063863abf7914610144578063a123c33e1461014d578063f4da8a0c14610176578063f7ea244e1461019657600080fd5b80630c805a441461008d578063150b7a02146100c05780632e17de781461010457806347ccca0214610119575b600080fd5b6100ad61009b366004610584565b60056020526000908152604090205481565b6040519081526020015b60405180910390f35b6100d36100ce3660046104a8565b6101c9565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016100b7565b610117610112366004610584565b61030c565b005b60005461012c906001600160a01b031681565b6040516001600160a01b0390911681526020016100b7565b6100ad60015481565b61012c61015b366004610584565b6002602052600090815260409020546001600160a01b031681565b6100ad610184366004610584565b60046020526000908152604090205481565b6101b96101a4366004610584565b60036020526000908152604090205460ff1681565b60405190151581526020016100b7565b600080546001600160a01b031633146101e157600080fd5b600f83116102365760405162461bcd60e51b815260206004820152601d60248201527f43616e6e6f74207374616b6520756c74696d6174652065646974696f6e00000060448201526064015b60405180910390fd5b60008381526003602052604090205460ff16156102955760405162461bcd60e51b815260206004820152601e60248201527f43616e6e6f74207374616b6520676f6c6420706c75732065646974696f6e0000604482015260640161022d565b5050600090815260026020908152604080832080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0395909516949094179093556005905220429055507f150b7a020000000000000000000000000000000000000000000000000000000090565b6000818152600260205260409020546001600160a01b031633146103725760405162461bcd60e51b815260206004820152601460248201527f596f75277265206e6f7420746865206f776e6572000000000000000000000000604482015260640161022d565b60008181526005602052604081205461038b90426105b5565b600083815260046020526040812054919250906103b5906103ad90849061059d565b600154610474565b600084815260046020526040902081905560015490915081106103ec576000838152600360205260409020805460ff191660011790555b6000546040517f42842e0e000000000000000000000000000000000000000000000000000000008152306004820152336024820152604481018590526001600160a01b03909116906342842e0e90606401600060405180830381600087803b15801561045757600080fd5b505af115801561046b573d6000803e3d6000fd5b50505050505050565b60008183106104835781610485565b825b9392505050565b80356001600160a01b03811681146104a357600080fd5b919050565b600080600080608085870312156104be57600080fd5b6104c78561048c565b93506104d56020860161048c565b925060408501359150606085013567ffffffffffffffff808211156104f957600080fd5b818701915087601f83011261050d57600080fd5b81358181111561051f5761051f6105e2565b604051601f8201601f19908116603f01168101908382118183101715610547576105476105e2565b816040528281528a602084870101111561056057600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60006020828403121561059657600080fd5b5035919050565b600082198211156105b0576105b06105cc565b500190565b6000828210156105c7576105c76105cc565b500390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212200c359d1a11e5e1950e9a5424d6712b396d79a4061dcf9b6c393d0c61bee8540564736f6c63430008060033'

type E4CRangeHolderConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (xs: E4CRangeHolderConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1

export class E4CRangeHolder__factory extends ContractFactory {
  constructor(...args: E4CRangeHolderConstructorParams) {
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
  ): Promise<E4CRangeHolder> {
    return super.deploy(_nft, _upgradeDuration, overrides || {}) as Promise<E4CRangeHolder>
  }
  override getDeployTransaction(
    _nft: PromiseOrValue<string>,
    _upgradeDuration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_nft, _upgradeDuration, overrides || {})
  }
  override attach(address: string): E4CRangeHolder {
    return super.attach(address) as E4CRangeHolder
  }
  override connect(signer: Signer): E4CRangeHolder__factory {
    return super.connect(signer) as E4CRangeHolder__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): E4CRangeHolderInterface {
    return new utils.Interface(_abi) as E4CRangeHolderInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): E4CRangeHolder {
    return new Contract(address, _abi, signerOrProvider) as E4CRangeHolder
  }
}
