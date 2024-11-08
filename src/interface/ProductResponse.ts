import Product from './Product.ts'

export default interface ProductResponse {
    total: number
    page: number
    lastpage: 1
    product: [Product]
}