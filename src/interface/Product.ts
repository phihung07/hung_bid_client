import Bid from './Bid.ts'
import User from './User.ts'
import Category from './Category.ts'

export default interface Product {
    _id: string
    name: string
    user: User
    cate: Category
    img_url: string
    status: string
    bids: Bid[]
    start_time: string
    end_time: string
    step_price: number
    start_price: number
    createdAt: string
}
