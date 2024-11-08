import Image from './Image.ts'

export default interface User {
    _id: string
    full_name: string
    email: string
    role: string
    avatar: Image
    phone: string
    address: string
}
