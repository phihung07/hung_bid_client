import { Bid, Product } from '../../../interface'
import default_avatar from '../../../assets/image/profile.svg'
import hand_img from '../../../assets/image/hand.png'
import time_img from '../../../assets/image/time.svg'
import product_img from '../../../assets/image/product.png'
import { Stack } from '@mui/material'
import { useState } from 'react'
import { ApiUrl, Time } from '../../../constant'
import axios from 'axios'
import { UseLocalStorage } from '../../../util'
import { SESSION_KEY } from '../../../util/UseLocalStorage.ts'
import { enqueueSnackbar } from 'notistack'
import { StatusCodes } from 'http-status-codes'
import { UseLoading } from '../../../hook/UseLoading.ts'

type MakeBidResponse = {
    bid: Bid
    status: number
}

export const ProductDetail: React.FC<{
    product: Product
    OnSubmitBidCallback: (bid: Bid) => void
}> = ({ product, OnSubmitBidCallback }) => {
    const current_date = new Date()
    const end_date = new Date(product.end_time)
    const start_date = new Date(product.start_time)
    let time_label = ''
    let date_time_bid = null
    const price =
        product.bids.length > 0
            ? product.bids[product.bids.length - 1].price
            : product.start_price
    let icon_bid = null
    if (current_date > end_date) {
        //end auction
        icon_bid = product_img
        time_label = 'This Auction End At:'
        date_time_bid = end_date
    } else if (current_date > start_date && current_date < end_date) {
        // auctioning
        icon_bid = hand_img
        time_label = 'This Auction End At:'
        date_time_bid = end_date
    } else {
        icon_bid = time_img
        time_label = 'This Auction Start At:'
        date_time_bid = start_date
    }

    const avatar =
        product.user.avatar.url == 'default'
            ? default_avatar
            : product.user.avatar.url
    const [bidPrice, setBidPrice] = useState<number>(0)
    const OnSubmitBid = () => {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login before give a bid!', {
                variant: 'error',
            })
            return
        }

        let price_can_bid = product.start_price + product.step_price
        if (product.bids.length > 0) {
            price_can_bid =
                product.bids[product.bids.length - 1].price + product.step_price
        }

        if (bidPrice < price_can_bid) {
            enqueueSnackbar('Please give a bid greater than current bid!', {
                variant: 'error',
            })
            return
        }

        const body = {
            auctionProductId: product._id,
            price: bidPrice,
        }
        UseLoading(true)
        setTimeout(() => {
            axios
                .post(ApiUrl.HOST + ApiUrl.CUSTOMER.MAKE_BID, body, {
                    headers: { authorization: 'Bearer ' + token },
                })
                .then((res) => {
                    UseLoading(false)
                    const data: MakeBidResponse = res.data
                    console.log(data)

                    if (data.status != StatusCodes.OK) {
                        enqueueSnackbar(
                            'Please give a bid greater than current bid!',
                            { variant: 'error' }
                        )
                        return
                    }
                    OnSubmitBidCallback(data.bid)
                    enqueueSnackbar('Success set a bid', { variant: 'success' })
                })
        }, Time.DELAY_API)
    }
    return (
        <section className="product-details-section section-bg-two pt-120">
            <div className="container">
                <div className="row">
                    <div className="col-xl-7">
                        <div className="product-details-left-wrapper">
                            <div className="swipper-property">
                                <div className="swiper mySwiper2 swiper-container-initialized swiper-container-horizontal">
                                    <div
                                        className="swiper-wrapper"
                                        style={{
                                            transform:
                                                'translate3d(0px, 0px, 0px)',
                                        }}
                                    >
                                        <div
                                            className="swiper-slide swiper-slide-active"
                                            style={{
                                                width: 'fit-content',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <div className="thumb">
                                                <img
                                                    src={product.img_url}
                                                    alt="s-img"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pricing-bidding-area">
                                <h3 className="head">{product.name}</h3>
                                <ul className="current-price">
                                    <li>
                                        <h6>Start bid</h6>
                                        <h6>US ${product.start_price}</h6>
                                    </li>
                                    <li>
                                        <h5>Current bid</h5>
                                        <h4 className="text-base-2">
                                            US ${price}
                                        </h4>
                                    </li>
                                    <li>
                                        <p>Minimum price increase (US)</p>
                                        <h5>${product.step_price}</h5>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-7">
                        <div className="product-details-right-wrapper">
                            <div className="box-one">
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                >
                                    <h5 className="title">Product Detail</h5>
                                    <img
                                        src={icon_bid}
                                        style={{
                                            width: '3rem',
                                            height: '3rem',
                                            borderRadius: '50%',
                                            padding: '12px',
                                            background: 'var(--primary-color)',
                                        }}
                                    />
                                </Stack>

                                <div className="ratting-quan">
                                    <img
                                        src={avatar}
                                        style={{
                                            width: '5rem',
                                            marginRight: '3rem',
                                        }}
                                        alt="avatar"
                                    />
                                    <strong>{product.user.full_name}</strong>
                                </div>
                                <div className="details">
                                    <ul>
                                        <li>
                                            <strong>Category: </strong>{' '}
                                            {product.cate.name}
                                        </li>

                                        <li>
                                            <strong>Start time: </strong>
                                            {start_date.getHours()}:
                                            {start_date.getMinutes() + ' '}
                                            {[
                                                start_date.getDate(),
                                                start_date.getMonth() + 1,
                                                start_date.getFullYear(),
                                            ].join('-')}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="box-two">
                                <p className="head">{time_label}</p>
                                <div className="time-end">
                                    <ul className="countdown">
                                        <li>
                                            <h3 className="">
                                                {date_time_bid.getHours()}:
                                                {date_time_bid.getMinutes()}
                                            </h3>
                                        </li>
                                        <li>
                                            <h3 className="seconds">
                                                {[
                                                    date_time_bid.getDate(),
                                                    date_time_bid.getMonth() +
                                                        1,
                                                    date_time_bid.getFullYear(),
                                                ].join('-')}
                                            </h3>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="amount">
                                {current_date > end_date ||
                                current_date < start_date ? (
                                    <></>
                                ) : (
                                    <>
                                        <form className="bid-form pt-5">
                                            <input
                                                value={bidPrice}
                                                onChange={(e) =>
                                                    setBidPrice(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                type="number"
                                                placeholder="Enter your bid amount"
                                            />
                                            <button
                                                onClick={OnSubmitBid}
                                                type="button"
                                                className="cmn--btn"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
