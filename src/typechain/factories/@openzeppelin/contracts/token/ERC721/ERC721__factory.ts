/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { PromiseOrValue } from '../../../../../common'
import type { ERC721, ERC721Interface } from '../../../../../@openzeppelin/contracts/token/ERC721/ERC721'

const _abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol_',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
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
    name: 'getApproved',
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
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
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
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
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
    name: 'ownerOf',
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
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // {
  //   inputs: [
  //     {
  //       internalType: 'address',
  //       name: 'from',
  //       type: 'address',
  //     },
  //     {
  //       internalType: 'address',
  //       name: 'to',
  //       type: 'address',
  //     },
  //     {
  //       internalType: 'uint256',
  //       name: 'tokenId',
  //       type: 'uint256',
  //     },
  //     {
  //       internalType: 'bytes',
  //       name: 'data',
  //       type: 'bytes',
  //     },
  //   ],
  //   name: 'safeTransferFrom',
  //   outputs: [],
  //   stateMutability: 'nonpayable',
  //   type: 'function',
  // },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
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
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
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
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const _bytecode =
  '0x60806040523480156200001157600080fd5b50604051620015a2380380620015a28339810160408190526200003491620001c5565b81516200004990600090602085019062000068565b5080516200005f90600190602084019062000068565b50505062000282565b82805462000076906200022f565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b600082601f8301126200012057600080fd5b81516001600160401b03808211156200013d576200013d6200026c565b604051601f8301601f19908116603f011681019082821181831017156200016857620001686200026c565b816040528381526020925086838588010111156200018557600080fd5b600091505b83821015620001a957858201830151818301840152908201906200018a565b83821115620001bb5760008385830101525b9695505050505050565b60008060408385031215620001d957600080fd5b82516001600160401b0380821115620001f157600080fd5b620001ff868387016200010e565b935060208501519150808211156200021657600080fd5b5062000225858286016200010e565b9150509250929050565b600181811c908216806200024457607f821691505b602082108114156200026657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61131080620002926000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101c3578063b88d4fde146101d6578063c87b56dd146101e9578063e985e9c5146101fc57600080fd5b80636352211e1461018757806370a082311461019a57806395d89b41146101bb57600080fd5b8063095ea7b3116100bd578063095ea7b31461014c57806323b872dd1461016157806342842e0e1461017457600080fd5b806301ffc9a7146100e457806306fdde031461010c578063081812fc14610121575b600080fd5b6100f76100f2366004611096565b610238565b60405190151581526020015b60405180910390f35b6101146102d5565b6040516101039190611180565b61013461012f3660046110d0565b610367565b6040516001600160a01b039091168152602001610103565b61015f61015a36600461106c565b61038e565b005b61015f61016f366004610f18565b6104c5565b61015f610182366004610f18565b61054c565b6101346101953660046110d0565b610567565b6101ad6101a8366004610eca565b6105cc565b604051908152602001610103565b610114610666565b61015f6101d1366004611030565b610675565b61015f6101e4366004610f54565b610684565b6101146101f73660046110d0565b610712565b6100f761020a366004610ee5565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982167f80ac58cd00000000000000000000000000000000000000000000000000000000148061029b57506001600160e01b031982167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806102cf57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b6060600080546102e490611202565b80601f016020809104026020016040519081016040528092919081815260200182805461031090611202565b801561035d5780601f106103325761010080835404028352916020019161035d565b820191906000526020600020905b81548152906001019060200180831161034057829003601f168201915b5050505050905090565b600061037282610786565b506000908152600460205260409020546001600160a01b031690565b600061039982610567565b9050806001600160a01b0316836001600160a01b031614156104285760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b336001600160a01b03821614806104445750610444813361020a565b6104b65760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161041f565b6104c083836107ed565b505050565b6104cf3382610868565b6105415760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f766564000000000000000000000000000000000000606482015260840161041f565b6104c08383836108e7565b6104c083838360405180602001604052806000815250610684565b6000818152600260205260408120546001600160a01b0316806102cf5760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161041f565b60006001600160a01b03821661064a5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e65720000000000000000000000000000000000000000000000606482015260840161041f565b506001600160a01b031660009081526003602052604090205490565b6060600180546102e490611202565b610680338383610ac1565b5050565b61068e3383610868565b6107005760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f766564000000000000000000000000000000000000606482015260840161041f565b61070c84848484610b90565b50505050565b606061071d82610786565b600061073460408051602081019091526000815290565b90506000815111610754576040518060200160405280600081525061077f565b8061075e84610c19565b60405160200161076f929190611115565b6040516020818303038152906040525b9392505050565b6000818152600260205260409020546001600160a01b03166107ea5760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161041f565b50565b6000818152600460205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038416908117909155819061082f82610567565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061087483610567565b9050806001600160a01b0316846001600160a01b031614806108bb57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b806108df5750836001600160a01b03166108d484610367565b6001600160a01b0316145b949350505050565b826001600160a01b03166108fa82610567565b6001600160a01b0316146109765760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e6572000000000000000000000000000000000000000000000000000000606482015260840161041f565b6001600160a01b0382166109f15760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161041f565b6109fc6000826107ed565b6001600160a01b0383166000908152600360205260408120805460019290610a259084906111bf565b90915550506001600160a01b0382166000908152600360205260408120805460019290610a53908490611193565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b03161415610b235760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161041f565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610b9b8484846108e7565b610ba784848484610d4b565b61070c5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161041f565b606081610c5957505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115610c835780610c6d8161123d565b9150610c7c9050600a836111ab565b9150610c5d565b60008167ffffffffffffffff811115610c9e57610c9e6112ae565b6040519080825280601f01601f191660200182016040528015610cc8576020820181803683370190505b5090505b84156108df57610cdd6001836111bf565b9150610cea600a86611258565b610cf5906030611193565b60f81b818381518110610d0a57610d0a611298565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350610d44600a866111ab565b9450610ccc565b60006001600160a01b0384163b15610ea357604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610d8f903390899088908890600401611144565b602060405180830381600087803b158015610da957600080fd5b505af1925050508015610dd9575060408051601f3d908101601f19168201909252610dd6918101906110b3565b60015b610e89573d808015610e07576040519150601f19603f3d011682016040523d82523d6000602084013e610e0c565b606091505b508051610e815760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161041f565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506108df565b506001949350505050565b80356001600160a01b0381168114610ec557600080fd5b919050565b600060208284031215610edc57600080fd5b61077f82610eae565b60008060408385031215610ef857600080fd5b610f0183610eae565b9150610f0f60208401610eae565b90509250929050565b600080600060608486031215610f2d57600080fd5b610f3684610eae565b9250610f4460208501610eae565b9150604084013590509250925092565b60008060008060808587031215610f6a57600080fd5b610f7385610eae565b9350610f8160208601610eae565b925060408501359150606085013567ffffffffffffffff80821115610fa557600080fd5b818701915087601f830112610fb957600080fd5b813581811115610fcb57610fcb6112ae565b604051601f8201601f19908116603f01168101908382118183101715610ff357610ff36112ae565b816040528281528a602084870101111561100c57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561104357600080fd5b61104c83610eae565b91506020830135801515811461106157600080fd5b809150509250929050565b6000806040838503121561107f57600080fd5b61108883610eae565b946020939093013593505050565b6000602082840312156110a857600080fd5b813561077f816112c4565b6000602082840312156110c557600080fd5b815161077f816112c4565b6000602082840312156110e257600080fd5b5035919050565b600081518084526111018160208601602086016111d6565b601f01601f19169290920160200192915050565b600083516111278184602088016111d6565b83519083019061113b8183602088016111d6565b01949350505050565b60006001600160a01b0380871683528086166020840152508360408301526080606083015261117660808301846110e9565b9695505050505050565b60208152600061077f60208301846110e9565b600082198211156111a6576111a661126c565b500190565b6000826111ba576111ba611282565b500490565b6000828210156111d1576111d161126c565b500390565b60005b838110156111f15781810151838201526020016111d9565b8381111561070c5750506000910152565b600181811c9082168061121657607f821691505b6020821081141561123757634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156112515761125161126c565b5060010190565b60008261126757611267611282565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b0319811681146107ea57600080fdfea2646970667358221220619aabcadbb1bf65f20d370b0072f3fe414bca91e7ace520a888ca2ef2e6a42464736f6c63430008060033'

type ERC721ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (xs: ERC721ConstructorParams): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class ERC721__factory extends ContractFactory {
  constructor(...args: ERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721>
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {})
  }
  override attach(address: string): ERC721 {
    return super.attach(address) as ERC721
  }
  override connect(signer: Signer): ERC721__factory {
    return super.connect(signer) as ERC721__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): ERC721Interface {
    return new utils.Interface(_abi) as ERC721Interface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC721 {
    return new Contract(address, _abi, signerOrProvider) as ERC721
  }
}
