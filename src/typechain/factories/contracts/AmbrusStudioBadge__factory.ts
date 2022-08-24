/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { PromiseOrValue } from '../../common'
import type { AmbrusStudioBadge, AmbrusStudioBadgeInterface } from '../../contracts/AmbrusStudioBadge'

const _abi = [
  {
    inputs: [],
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
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
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
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
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
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantMinterRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
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
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeMinterRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
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
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
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
  '0x60806040523480156200001157600080fd5b506040518060400160405280600981526020016845344320416c70686160b81b815250604051806040016040528060098152602001684534435f414c50484160b81b81525081600090805190602001906200006e92919062000141565b5080516200008490600190602084019062000141565b5062000096915060009050336200009c565b62000224565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff166200013d5760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620000fc3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b8280546200014f90620001e7565b90600052602060002090601f016020900481019282620001735760008555620001be565b82601f106200018e57805160ff1916838001178555620001be565b82800160010185558215620001be579182015b82811115620001be578251825591602001919060010190620001a1565b50620001cc929150620001d0565b5090565b5b80821115620001cc5760008155600101620001d1565b600181811c90821680620001fc57607f821691505b602082108114156200021e57634e487b7160e01b600052602260045260246000fd5b50919050565b611b3780620002346000396000f3fe608060405234801561001057600080fd5b506004361061018d5760003560e01c80636352211e116100e3578063a217fddf1161008c578063c87b56dd11610066578063c87b56dd1461036d578063d547741f14610380578063e985e9c51461039357600080fd5b8063a217fddf1461033f578063a22cb46514610347578063b88d4fde1461035a57600080fd5b806370a08231116100bd57806370a08231146102eb57806391d14854146102fe57806395d89b411461033757600080fd5b80636352211e146102b257806369e2f0fb146102c55780636a627842146102d857600080fd5b8063248a9ca3116101455780633dd1eb611161011f5780633dd1eb611461027957806342842e0e1461028c57806342966c681461029f57600080fd5b8063248a9ca3146102225780632f2ff15d1461025357806336568abe1461026657600080fd5b8063081812fc11610176578063081812fc146101cf578063095ea7b3146101fa57806323b872dd1461020f57600080fd5b806301ffc9a71461019257806306fdde03146101ba575b600080fd5b6101a56101a036600461181f565b6103cf565b60405190151581526020015b60405180910390f35b6101c2610430565b6040516101b19190611971565b6101e26101dd3660046117e3565b6104c2565b6040516001600160a01b0390911681526020016101b1565b61020d6102083660046117b9565b6104e9565b005b61020d61021d366004611665565b610620565b6102456102303660046117e3565b60009081526006602052604090206001015490565b6040519081526020016101b1565b61020d6102613660046117fc565b6106a7565b61020d6102743660046117fc565b6106cc565b61020d610287366004611617565b610758565b61020d61029a366004611665565b61076e565b61020d6102ad3660046117e3565b610789565b6101e26102c03660046117e3565b61079d565b61020d6102d3366004611617565b610802565b61020d6102e6366004611617565b610818565b6102456102f9366004611617565b610843565b6101a561030c3660046117fc565b60009182526006602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6101c26108dd565b610245600081565b61020d61035536600461177d565b6108ec565b61020d6103683660046116a1565b6108f7565b6101c261037b3660046117e3565b610985565b61020d61038e3660046117fc565b6109f9565b6101a56103a1366004611632565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061040057506001600160e01b03198216635b5e139f60e01b145b8061041b57506001600160e01b03198216637965db0b60e01b145b8061042a575061042a82610a1e565b92915050565b60606000805461043f90611a29565b80601f016020809104026020016040519081016040528092919081815260200182805461046b90611a29565b80156104b85780601f1061048d576101008083540402835291602001916104b8565b820191906000526020600020905b81548152906001019060200180831161049b57829003601f168201915b5050505050905090565b60006104cd82610a43565b506000908152600460205260409020546001600160a01b031690565b60006104f48261079d565b9050806001600160a01b0316836001600160a01b031614156105835760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b336001600160a01b038216148061059f575061059f81336103a1565b6106115760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161057a565b61061b8383610aaa565b505050565b61062a3382610b25565b61069c5760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f766564000000000000000000000000000000000000606482015260840161057a565b61061b838383610ba4565b6000828152600660205260409020600101546106c281610bec565b61061b8383610bf6565b6001600160a01b038116331461074a5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c660000000000000000000000000000000000606482015260840161057a565b6107548282610c98565b5050565b600061076381610bec565b610754600083610bf6565b61061b838383604051806020016040528060008152506108f7565b600061079481610bec565b61075482610d1b565b6000818152600260205260408120546001600160a01b03168061042a5760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161057a565b600061080d81610bec565b610754600083610c98565b600061082381610bec565b610831600780546001019055565b6107548261083e60075490565b610dc3565b60006001600160a01b0382166108c15760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e65720000000000000000000000000000000000000000000000606482015260840161057a565b506001600160a01b031660009081526003602052604090205490565b60606001805461043f90611a29565b610754338383610ddd565b6109013383610b25565b6109735760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f766564000000000000000000000000000000000000606482015260840161057a565b61097f84848484610eac565b50505050565b606061099082610a43565b60006109a760408051602081019091526000815290565b905060008151116109c757604051806020016040528060008152506109f2565b806109d184610f2a565b6040516020016109e2929190611885565b6040516020818303038152906040525b9392505050565b600082815260066020526040902060010154610a1481610bec565b61061b8383610c98565b60006001600160e01b03198216637965db0b60e01b148061042a575061042a82611028565b6000818152600260205260409020546001600160a01b0316610aa75760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161057a565b50565b6000818152600460205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091558190610aec8261079d565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610b318361079d565b9050806001600160a01b0316846001600160a01b03161480610b7857506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610b9c5750836001600160a01b0316610b91846104c2565b6001600160a01b0316145b949350505050565b60405162461bcd60e51b815260206004820152601e60248201527f5472616e73666572206f7065726174696f6e2069732064697361626c65640000604482015260640161057a565b610aa78133611091565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff166107545760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610c543390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff16156107545760008281526006602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610d268261079d565b9050610d33600083610aaa565b6001600160a01b0381166000908152600360205260408120805460019290610d5c9084906119cf565b9091555050600082815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b610754828260405180602001604052806000815250611111565b816001600160a01b0316836001600160a01b03161415610e3f5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161057a565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610eb7848484610ba4565b610ec38484848461118f565b61097f5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606482015260840161057a565b606081610f4e5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610f785780610f6281611a64565b9150610f719050600a8361199c565b9150610f52565b60008167ffffffffffffffff811115610f9357610f93611ad5565b6040519080825280601f01601f191660200182016040528015610fbd576020820181803683370190505b5090505b8415610b9c57610fd26001836119cf565b9150610fdf600a86611a7f565b610fea906030611984565b60f81b818381518110610fff57610fff611abf565b60200101906001600160f81b031916908160001a905350611021600a8661199c565b9450610fc1565b60006001600160e01b031982166380ac58cd60e01b148061105957506001600160e01b03198216635b5e139f60e01b145b8061042a57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b031983161461042a565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff16610754576110cf816001600160a01b031660146112e7565b6110da8360206112e7565b6040516020016110eb9291906118b4565b60408051601f198184030181529082905262461bcd60e51b825261057a91600401611971565b61111b83836114ac565b611128600084848461118f565b61061b5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606482015260840161057a565b60006001600160a01b0384163b156112dc57604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906111d3903390899088908890600401611935565b602060405180830381600087803b1580156111ed57600080fd5b505af192505050801561121d575060408051601f3d908101601f1916820190925261121a9181019061183c565b60015b6112c2573d80801561124b576040519150601f19603f3d011682016040523d82523d6000602084013e611250565b606091505b5080516112ba5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606482015260840161057a565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610b9c565b506001949350505050565b606060006112f68360026119b0565b611301906002611984565b67ffffffffffffffff81111561131957611319611ad5565b6040519080825280601f01601f191660200182016040528015611343576020820181803683370190505b509050600360fc1b8160008151811061135e5761135e611abf565b60200101906001600160f81b031916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106113a9576113a9611abf565b60200101906001600160f81b031916908160001a90535060006113cd8460026119b0565b6113d8906001611984565b90505b600181111561145d577f303132333435363738396162636465660000000000000000000000000000000085600f166010811061141957611419611abf565b1a60f81b82828151811061142f5761142f611abf565b60200101906001600160f81b031916908160001a90535060049490941c9361145681611a12565b90506113db565b5083156109f25760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161057a565b6001600160a01b0382166115025760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161057a565b6000818152600260205260409020546001600160a01b0316156115675760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161057a565b6001600160a01b0382166000908152600360205260408120805460019290611590908490611984565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b80356001600160a01b038116811461161257600080fd5b919050565b60006020828403121561162957600080fd5b6109f2826115fb565b6000806040838503121561164557600080fd5b61164e836115fb565b915061165c602084016115fb565b90509250929050565b60008060006060848603121561167a57600080fd5b611683846115fb565b9250611691602085016115fb565b9150604084013590509250925092565b600080600080608085870312156116b757600080fd5b6116c0856115fb565b93506116ce602086016115fb565b925060408501359150606085013567ffffffffffffffff808211156116f257600080fd5b818701915087601f83011261170657600080fd5b81358181111561171857611718611ad5565b604051601f8201601f19908116603f0116810190838211818310171561174057611740611ad5565b816040528281528a602084870101111561175957600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561179057600080fd5b611799836115fb565b9150602083013580151581146117ae57600080fd5b809150509250929050565b600080604083850312156117cc57600080fd5b6117d5836115fb565b946020939093013593505050565b6000602082840312156117f557600080fd5b5035919050565b6000806040838503121561180f57600080fd5b8235915061165c602084016115fb565b60006020828403121561183157600080fd5b81356109f281611aeb565b60006020828403121561184e57600080fd5b81516109f281611aeb565b600081518084526118718160208601602086016119e6565b601f01601f19169290920160200192915050565b600083516118978184602088016119e6565b8351908301906118ab8183602088016119e6565b01949350505050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516118ec8160178501602088016119e6565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516119298160288401602088016119e6565b01602801949350505050565b60006001600160a01b038087168352808616602084015250836040830152608060608301526119676080830184611859565b9695505050505050565b6020815260006109f26020830184611859565b6000821982111561199757611997611a93565b500190565b6000826119ab576119ab611aa9565b500490565b60008160001904831182151516156119ca576119ca611a93565b500290565b6000828210156119e1576119e1611a93565b500390565b60005b83811015611a015781810151838201526020016119e9565b8381111561097f5750506000910152565b600081611a2157611a21611a93565b506000190190565b600181811c90821680611a3d57607f821691505b60208210811415611a5e57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611a7857611a78611a93565b5060010190565b600082611a8e57611a8e611aa9565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610aa757600080fdfea2646970667358221220547aa9da22d425e01c885bf8518c2667de1d05344acc1ee2814d2ec2d2948ba164736f6c63430008060033'

type AmbrusStudioBadgeConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (xs: AmbrusStudioBadgeConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1

export class AmbrusStudioBadge__factory extends ContractFactory {
  constructor(...args: AmbrusStudioBadgeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<AmbrusStudioBadge> {
    return super.deploy(overrides || {}) as Promise<AmbrusStudioBadge>
  }
  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  override attach(address: string): AmbrusStudioBadge {
    return super.attach(address) as AmbrusStudioBadge
  }
  override connect(signer: Signer): AmbrusStudioBadge__factory {
    return super.connect(signer) as AmbrusStudioBadge__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): AmbrusStudioBadgeInterface {
    return new utils.Interface(_abi) as AmbrusStudioBadgeInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): AmbrusStudioBadge {
    return new Contract(address, _abi, signerOrProvider) as AmbrusStudioBadge
  }
}