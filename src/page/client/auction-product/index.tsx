import {
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    Stack,
} from '@mui/material'
import { AuctionProductItem } from './AuctionProductItem'
import { AddIC, CartIC, RefreshIC, SearchIC } from '../../../assets/icon'
import {
    ShowConfirmDeleteDialog,
    ShowSuccessDialog,
    UseLocalStorage,
} from '../../../util/'
import { LoadingButton } from '@mui/lab'
import { BorderInputStyle } from '../../../theme'
import { LoadingButtonStyle } from '../../../theme'
import { CreateAuctionDialog } from './CreateAuctionDialog'
import { useEffect, useState } from 'react'

import { StatisticalProduct } from './StatisticalProduct'
import { OrderDialog } from './OrderDialog.tsx'
import axios from 'axios'
import { SESSION_KEY } from '../../../util/UseLocalStorage.ts'
import { enqueueSnackbar } from 'notistack'
import { UseLoading } from '../../../hook/UseLoading.ts'
import { ApiUrl, Time } from '../../../constant'
import { Category, Product } from '../../../interface'
import { PublishDialog } from './PublishDialog.tsx'
import { EditAuctionDialog } from './EditAuctionDialog.tsx'
import { StatusCodes } from 'http-status-codes'

type MyBidResponse = {
    products: Product[]
    winner: number
    revenue: number
    active_bid: number
}
export const AuctionProductPage = () => {
    const [open, setOpen] = useState(false)
    const setDefaultDate = () => {
        const date = new Date()
        const month = date.getMonth() + 1
        const from_date = [
            date.getFullYear(),
            String(month).padStart(2, '0'),
            '01',
        ].join('-')

        const to_date = [
            date.getFullYear(),
            String(month).padStart(2, '0'),
            month === 2 ? '28' : '30',
        ].join('-')

        return {
            from_date,
            to_date,
        }
    }
    const [filter_date, setFilterDate] = useState(() => setDefaultDate())
    const [searchName, setSeacrchName] = useState('')
    const [is_loading, setLoading] = useState(false)
    const ValidateData = (): Boolean => {
        const from_date = new Date(filter_date.from_date)
        const to_date = new Date(filter_date.to_date)
        if (to_date < from_date) {
            enqueueSnackbar('To date must be greater than from date', {
                variant: 'warning',
            })
            return false
        }

        return true
    }
    const Onfilter = () => {
        if (ValidateData()) {
            setLoading(true)
            GetProductList(
                searchName,
                filter_date.from_date,
                filter_date.to_date
            )
        }
    }
    const [isOpenOrder, setOpenOrder] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [winner, setWinner] = useState<number>(0)
    const [revenue, setRevenue] = useState<number>(0)
    const [activeBid, setActiveBid] = useState<number>(0)

    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {
        const { from_date, to_date } = setDefaultDate()
        GetProductList('', from_date, to_date)
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
        }

        axios
            .get(ApiUrl.HOST + ApiUrl.CATEGORY.LIST, {
                headers: { authorization: 'Bearer ' + token },
            })
            .then((res) => {
                setCategories(res.data)
            })
    }, [])
    const GetProductList = (
        name: string,
        from_date: string,
        to_date: string
    ) => {
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
        }
        UseLoading(true)

        const query = `?createdAt>=${from_date}&createdAt<=${to_date}&name=/${name}/i&sort=-createdAt`
        setTimeout(() => {
            axios
                .get(ApiUrl.HOST + ApiUrl.OWNER.MY_BID + query, {
                    headers: { authorization: 'Bearer ' + token },
                })
                .then((res) => {
                    UseLoading(false)
                    setLoading(false)
                    const myBidRes: MyBidResponse = res.data
                    setProducts(myBidRes.products)
                    setWinner(myBidRes.winner)
                    setActiveBid(myBidRes.active_bid)
                    setRevenue(myBidRes.revenue)
                })
        }, Time.DELAY_API)
    }
    const [isOpenPublish, setIsOpenPublish] = useState<boolean>(false)
    const [proId, setProId] = useState<string>('')
    const OnBtnPublishClicked = (pro_id: string) => {
        setProId(pro_id)
        setIsOpenPublish(true)
    }

    const OnCreate = (product: Product) => {
        setProducts((prevPro): Product[] => {
            return [product, ...prevPro]
        })
    }

    const OnUpdate = (update_product: Product) => {
        setProducts((products): Product[] => {
            return products.map((product) =>
                product._id === update_product._id ? update_product : product
            )
        })
    }
    const [product, setProduct] = useState<Product | null>(null)
    const OnEditClicked = (product: Product) => {
        setProduct(product)
    }

    const OnDeleteClicked = async (pro_id: string) => {
        const result = await ShowConfirmDeleteDialog()
        if (result.isConfirmed) {
            const [getLocal] = UseLocalStorage()
            const token: string | null = getLocal(SESSION_KEY)
            if (!token) {
                enqueueSnackbar('You must be login', { variant: 'error' })
            }
            axios
                .delete(ApiUrl.HOST + ApiUrl.OWNER.DELETE_PRODUCT + pro_id, {
                    headers: { authorization: 'Bearer ' + token },
                })
                .then((res) => {
                    console.log(res.data)

                    if (res.data.status != StatusCodes.OK) {
                        enqueueSnackbar('Delete product failed!', {
                            variant: 'error',
                        })
                        return
                    }

                    setProducts((products): Product[] => {
                        return products.filter(
                            (product) => product._id != pro_id
                        )
                    })
                    ShowSuccessDialog()
                })
        }
    }

    const OnRefresh = () => {
        setSeacrchName('')
        setFilterDate(setDefaultDate())
        const { from_date, to_date } = setDefaultDate()
        GetProductList('', from_date, to_date)
    }

    return (
        <>
            <CreateAuctionDialog
                is_open={open}
                categories={categories}
                OnClose={() => setOpen(false)}
                OnCreated={OnCreate}
            />
            {product ? (
                <EditAuctionDialog
                    OnClose={() => setProduct(null)}
                    OnUpdate={OnUpdate}
                    product={product}
                    categories={categories}
                />
            ) : (
                <></>
            )}
            <OrderDialog
                is_open={isOpenOrder}
                OnClose={() => setOpenOrder(false)}
            />
            <PublishDialog
                is_open={isOpenPublish}
                pro_id={proId}
                OnCLose={() => setIsOpenPublish(false)}
                OnPublished={OnUpdate}
            />
            <div className="my-bids-tab">
                <div className="tab-container">
                    <div className="my-bid-button counter-box">
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            className="my-heading-border-bottom"
                        >
                            <h5>My Bid</h5>
                            <div>
                                <Button
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    style={{ marginRight: '1rem' }}
                                    variant="contained"
                                    startIcon={<CartIC />}
                                    color={'info'}
                                    onClick={() => setOpenOrder(true)}
                                >
                                    Orders
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIC />}
                                    color={'success'}
                                    onClick={() => setOpen(true)}
                                >
                                    New
                                </Button>
                            </div>
                        </Stack>
                        <StatisticalProduct
                            winner={winner}
                            revenue={revenue}
                            active_bid={activeBid}
                        />
                        <Stack
                            className="pt-5"
                            direction={'row'}
                            justifyContent={'right'}
                            gap={2}
                        >
                            <FormControl
                                variant="outlined"
                                size="small"
                                sx={BorderInputStyle}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Search
                                </InputLabel>
                                <OutlinedInput
                                    value={searchName}
                                    onChange={(e: any) =>
                                        setSeacrchName(e.target.value)
                                    }
                                    sx={{ input: { color: 'white' } }}
                                    placeholder="type to search"
                                    label="Search"
                                />
                            </FormControl>
                        </Stack>
                        <Stack
                            className="pt-5"
                            spacing={2}
                            gap={1}
                            flexWrap={'wrap'}
                            direction={{
                                xs: 'column',
                                sm: 'row',
                                md: 'row',
                            }}
                            justifyContent="right"
                        >
                            <LoadingButton
                                startIcon={<RefreshIC />}
                                variant="outlined"
                                onClick={OnRefresh}
                                loadingPosition={'start'}
                                color={'info'}
                                sx={LoadingButtonStyle}
                            >
                                Refresh
                            </LoadingButton>
                            <FormControl
                                variant="outlined"
                                size="small"
                                sx={BorderInputStyle}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    From date
                                </InputLabel>
                                <OutlinedInput
                                    value={filter_date.from_date}
                                    onChange={(e) =>
                                        setFilterDate({
                                            ...filter_date,
                                            from_date: e.target.value,
                                        })
                                    }
                                    sx={{ input: { color: 'white' } }}
                                    id="outlined-adornment-password"
                                    type={'date'}
                                    label="From date"
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                size="small"
                                sx={BorderInputStyle}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    To Date
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ input: { color: 'white' } }}
                                    id="outlined-adornment-password"
                                    type={'date'}
                                    value={filter_date.to_date}
                                    onChange={(e) =>
                                        setFilterDate({
                                            ...filter_date,
                                            to_date: e.target.value,
                                        })
                                    }
                                    label="To Date"
                                />
                            </FormControl>
                            <LoadingButton
                                startIcon={<SearchIC />}
                                variant="outlined"
                                onClick={Onfilter}
                                loading={is_loading}
                                loadingPosition={'start'}
                                color={'warning'}
                                sx={LoadingButtonStyle}
                            >
                                filter
                            </LoadingButton>
                        </Stack>
                    </div>
                    <div className="tab-content" data-id="0">
                        <div className="row g-4">
                            {products.map((product: Product, index: number) => (
                                <AuctionProductItem
                                    key={index}
                                    product={product}
                                    OnBtnPublishClicked={OnBtnPublishClicked}
                                    OnEdit={OnEditClicked}
                                    OnDelete={OnDeleteClicked}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
