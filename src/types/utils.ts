export type RemoveIndex<Q> = {
  [key in keyof Q as string extends key ? never : key extends string ? key : never]: Q[key]
}
