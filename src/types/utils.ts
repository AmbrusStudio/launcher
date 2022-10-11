export type RemoveIndex<Q> = {
  [key in keyof Q as string extends key ? never : key extends string ? key : never]: Q[key]
}

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }
