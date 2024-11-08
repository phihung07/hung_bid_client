import Product from './Product.ts'
import User from './User.ts'

export interface Order {
    _id: string
    user_id: User
    owner_id: User
    product: Product
    date: string
    status: string
    createdAt: string
}
