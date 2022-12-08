export type TMessageData = {
  orders: Array<TOrder>
  success: Readonly<boolean>
  total: Readonly<number>
  totalToday: Readonly<number>
  event: Readonly<string>
}

export type TOrder = {
  _id: Readonly<string>
  ingredients: Array<string>
  status: Readonly<string>
  number: Readonly<number>
  name: Readonly<string>
  createdAt: Readonly<string>
  updatedAt: Readonly<string>
}
