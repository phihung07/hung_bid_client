import React, { useEffect, useState } from 'react'
import {
    AppBar,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material'
import { CheckBoxIC, CloseIC, TrashIC } from '../../../assets/icon'
import { Order } from '../../../interface/Order'
import { UseLocalStorage } from '../../../util'
import { SESSION_KEY } from '../../../util/UseLocalStorage'
import { enqueueSnackbar } from 'notistack'
import { UseLoading } from '../../../hook/UseLoading'
import axios from 'axios'
import { ApiUrl, Time } from '../../../constant'
import { LoadingButtonStyle } from '../../../theme'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

type OrderDialogType = {
    is_open: boolean
    OnClose: () => void
}
export const OrderDialog: React.FC<OrderDialogType> = ({
    is_open,
    OnClose,
}) => {
    const [orders, setOrders] = useState<Order[]>([])
    useEffect(() => {
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
        }
        UseLoading(true)
        setTimeout(() => {
            axios
                .get(ApiUrl.HOST + ApiUrl.OWNER.WINNING_BID_ORDER, {
                    headers: { authorization: 'Bearer ' + token },
                })
                .then((res) => {
                    UseLoading(false)
                    setOrders(res.data.orders)
                })
        }, Time.DELAY_API)
    }, [])

    const GetOrderDate = (order_date: string): string => {
        const date = new Date(order_date)
        return [
            String(date.getDate()).padStart(2, '0'),
            String(date.getMonth() + 1).padStart(2, '0'),
            date.getFullYear(),
        ].join('/')
    }

    const UpdateOrderStatus = (order_id: string, status: string) => {
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
        }
        axios
            .post(
                ApiUrl.HOST + ApiUrl.OWNER.UPDATE_ORDER_STATUS + order_id,
                { status },
                {
                    headers: { authorization: 'Bearer ' + token },
                }
            )
            .then((res) => {
                console.log(res.data)

                setOrders((orders): Order[] => {
                    return orders.map((order) => {
                        if (order._id === order_id) {
                            order.status = status
                        }
                        return order
                    })
                })

                enqueueSnackbar(`${status} order successfully`, {
                    variant: 'success',
                })
            })
    }
    const navigate = useNavigate()
    const goToProDetail = (pro_id: string) => {
        navigate(`/auction-detail/${pro_id}`)
    }
    return (
        <>
            <Dialog
                open={is_open}
                fullScreen
                sx={{ background: 'var(--box-bg)' }}
                onClose={OnClose}
            >
                <AppBar
                    sx={{
                        position: 'relative',
                        backgroundColor: 'var(--primary-color)',
                    }}
                >
                    <Toolbar>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            Orders
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={OnClose}
                            aria-label="close"
                        >
                            <CloseIC />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <List>
                    {orders.map((order: Order, index) => (
                        <div key={index}>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-around'}
                                style={{ padding: ' 0 2rem  0 2rem' }}
                            >
                                <ListItemButton
                                    onClick={() => {
                                        goToProDetail(order.product._id)
                                    }}
                                >
                                    <img
                                        style={{ marginRight: '2rem' }}
                                        width={50}
                                        src={order.user_id.avatar.url}
                                        alt=""
                                    />
                                    <ListItemText
                                        primary="customer name"
                                        secondary={order.user_id.full_name}
                                    />
                                    <ListItemText
                                        primary="phone"
                                        secondary={order.user_id.phone}
                                    />
                                    <ListItemText
                                        primary="address"
                                        secondary={order.user_id.address}
                                    />

                                    <ListItemText
                                        primary="product name"
                                        secondary={order.product.name}
                                    />
                                    <img
                                        width={100}
                                        src={order.product.img_url}
                                        alt=""
                                    />
                                    <ListItemText primary="" secondary="" />
                                    <ListItemText
                                        onClick={() =>
                                            console.log(order.product._id)
                                        }
                                        primary="price"
                                        secondary={`$${
                                            order.product.bids[
                                                order.product.bids.length - 1
                                            ].price
                                        } USD`}
                                    />
                                    <ListItemText
                                        primary="order date"
                                        secondary={GetOrderDate(
                                            order.createdAt
                                        )}
                                    />
                                    <ListItemText
                                        primary="status"
                                        secondary={order.status}
                                    />
                                </ListItemButton>
                                <Stack direction={'row'} height={40}>
                                    <LoadingButton
                                        loading={false}
                                        loadingPosition="start"
                                        variant="contained"
                                        type="submit"
                                        color="success"
                                        startIcon={<CheckBoxIC />}
                                        sx={LoadingButtonStyle}
                                        onClick={() =>
                                            UpdateOrderStatus(
                                                order._id,
                                                'delivery'
                                            )
                                        }
                                        style={{ marginRight: '2rem' }}
                                    >
                                        Delivery
                                    </LoadingButton>
                                    <LoadingButton
                                        loading={false}
                                        loadingPosition="start"
                                        variant="contained"
                                        type="submit"
                                        color="error"
                                        startIcon={<TrashIC />}
                                        sx={LoadingButtonStyle}
                                        onClick={() =>
                                            UpdateOrderStatus(
                                                order._id,
                                                'cancel'
                                            )
                                        }
                                    >
                                        Cancel
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                            <Divider />
                        </div>
                    ))}
                </List>
            </Dialog>
        </>
    )
}
