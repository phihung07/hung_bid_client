import { WinBidItem } from './WinBiditem'
import { ApiUrl, Time } from '../../../constant'
import { useEffect, useState } from 'react'
import { UseLoading } from '../../../hook/UseLoading'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { UseLocalStorage } from '../../../util'
import { SESSION_KEY } from '../../../util/UseLocalStorage'
import { Order } from '../../../interface/Order'

export const OrderPage = () => {
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = () => {
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
        }
        UseLoading(true)
        setTimeout(() => {
            axios
                .get(
                    ApiUrl.HOST + ApiUrl.OWNER.LIST_ORDER + `?sort=-createdAt`,
                    {
                        headers: { authorization: 'Bearer ' + token },
                    }
                )
                .then((res) => {
                    UseLoading(false)
                    setOrders(res.data.orders)
                })
        }, Time.DELAY_API)
    }
    return (
        <div className="winning-wrapper">
            <div className="winning-header ">
                <h5>Winning Bid</h5>
            </div>
            <div className="row g-4">
                {orders.map((order: Order, idnex: number) => (
                    <WinBidItem order={order} key={idnex} />
                ))}
            </div>
        </div>
    )
}
