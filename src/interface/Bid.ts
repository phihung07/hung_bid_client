import User from './User.ts'

export default interface Bid {
    _id: string
    user: User
    price: number
    createdAt: string
}