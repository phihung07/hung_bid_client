import { LoadingButton } from '@mui/lab'
import { Stack, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { RefreshIC, SearchIC } from '../../../assets/icon'
import { BidItem } from './BidItem.tsx'
import { BorderInputStyle, LoadingButtonStyle } from '../../../theme'
import { useEffect, useState } from 'react'
import { Product, User } from '../../../interface'
import axios from 'axios'
import { ApiUrl, Time } from '../../../constant'
import { UseLoading } from '../../../hook/UseLoading.ts'
import { enqueueSnackbar } from 'notistack'
import { UseLocalStorage } from '../../../util'
import { SESSION_KEY } from '../../../util/UseLocalStorage.ts'
import { CheckoutDialog } from './CheckoutDialog.tsx'

interface ProductResponse {
    productAuctioned: Product[]
}
export const AuctionActivityPage = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const { from_date, to_date } = setDefaultDate()
        GetProductList('', from_date, to_date)
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
            setIsLoading(false)
            axios
                .get(ApiUrl.HOST + ApiUrl.OWNER.MY_ACTIVITY + query, {
                    headers: { authorization: 'Bearer ' + token },
                })
                .then((res) => {
                    UseLoading(false)
                    const productRes: ProductResponse = res.data
                    console.log(res.data)

                    setProducts(productRes.productAuctioned)
                })
        }, Time.DELAY_API)
    }

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
    const [isLoading, setIsLoading] = useState(false)
    const [filter_date, setFilterDate] = useState(() => setDefaultDate())
    const [searchName, setSearchName] = useState('')
    const OnFilter = () => {
        setIsLoading(true)
        GetProductList(searchName, filter_date.from_date, filter_date.to_date)
    }

    const OnRefresh = () => {
        setSearchName('')
        setFilterDate(setDefaultDate())
        const { from_date, to_date } = setDefaultDate()
        GetProductList('', from_date, to_date)
    }
    const [isOpenCheckOut, setIsOpenCheckOut] = useState(false)
    const [user, setUser] = useState<User>()
    const [product, setProduct] = useState<Product>()
    const OnCheckOutClicked = (pro_id: string) => {
        GetDataCheckOut(pro_id)
    }

    const GetDataCheckOut = async (pro_id: string) => {
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
            return
        }
        const header = {
            headers: { authorization: 'Bearer ' + token },
        }
        const user_req = axios.get(
            ApiUrl.HOST + ApiUrl.USER.VIEW_PROFILE,
            header
        )
        const product_req = axios.get(
            ApiUrl.HOST + ApiUrl.PRODUCT.DETAIL + pro_id,
            header
        )

        const res = await Promise.all([user_req, product_req])
        if (!res[0].data && !res[1].data) {
            enqueueSnackbar('Load check out infomation fail! ', {
                variant: 'error',
            })
            return
        }

        setUser(res[0].data as User)
        setProduct(res[1].data.product as Product)
        setIsOpenCheckOut(true)
    }
    const OnCheckoutSuccess = (pro_id: string | undefined) => {
        const new_products = products.filter((product) => product._id != pro_id)
        setProducts(new_products)
        setIsOpenCheckOut(false)
    }
    return (
        <>
            <CheckoutDialog
                user={user}
                product={product}
                is_open={isOpenCheckOut}
                OnCLose={() => setIsOpenCheckOut(false)}
                OnCheckoutSuccess={OnCheckoutSuccess}
            />
            <div className="my-bids-tab">
                <div className="tab-container">
                    <div className="my-bid-button">
                        <Stack
                            spacing={2}
                            gap={1}
                            flexWrap={'wrap'}
                            direction={'row'}
                            justifyContent={'space-between'}
                        >
                            <h5 className="tab-title">My Activity</h5>
                            <div>
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
                            </div>
                        </Stack>
                        <Stack
                            spacing={2}
                            gap={1}
                            flexWrap={'wrap'}
                            direction={{
                                xs: 'column',
                                sm: 'row',
                                md: 'row',
                            }}
                            justifyContent="space-around"
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
                                    onChange={(e) =>
                                        setSearchName(e.target.value)
                                    }
                                    sx={{ input: { color: 'white' } }}
                                    id="outlined-adornment-password"
                                    placeholder="type to search"
                                    label="Search"
                                />
                            </FormControl>
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
                                onClick={OnFilter}
                                loading={isLoading}
                                loadingPosition={'start'}
                                color={'warning'}
                                sx={{ color: 'secondary' }}
                            >
                                Filter
                            </LoadingButton>
                        </Stack>
                    </div>
                    <div className="tab-content" data-id="0">
                        <div className="row g-4">
                            {products.map((product: Product, index: number) => (
                                <div
                                    key={index}
                                    className="col-xl-6 col-lg-6 col-md-6 "
                                >
                                    <BidItem
                                        product={product}
                                        OnCheckOut={OnCheckOutClicked}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
