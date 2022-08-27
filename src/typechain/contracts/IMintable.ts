/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type { FunctionFragment, Result } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from '../common'

export interface IMintableInterface extends utils.Interface {
  functions: {
    'mintFor(address,uint256,bytes)': FunctionFragment
  }

  getFunction(nameOrSignatureOrTopic: 'mintFor'): FunctionFragment

  encodeFunctionData(
    functionFragment: 'mintFor',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string

  decodeFunctionResult(functionFragment: 'mintFor', data: BytesLike): Result

  events: {}
}

export interface IMintable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: IMintableInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    mintFor(
      to: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      mintingBlob: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>
  }

  mintFor(
    to: PromiseOrValue<string>,
    quantity: PromiseOrValue<BigNumberish>,
    mintingBlob: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    mintFor(
      to: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      mintingBlob: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>
  }

  filters: {}

  estimateGas: {
    mintFor(
      to: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      mintingBlob: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    mintFor(
      to: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      mintingBlob: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>
  }
}
