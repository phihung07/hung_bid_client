import { Button, Stack } from '@mui/material'
import auct_img from '../../../assets/image/auct.png'
import time_img from '../../../assets/image/time.svg'
import { PenIC, TrashIC } from '../../../assets/icon'
import React from 'react'
import { Product } from '../../../interface'
import product_img from '../../../assets/image/product.png'
import hand_img from '../../../assets/image/hand.png'
import { ProductStatus } from '../../../constant'

type AuctionProductItem = {
    product: Product
    OnBtnPublishClicked: (pro_id: string) => void
    OnDelete: (pro_id: string) => void
    OnEdit: (product: Product) => void
}
export const AuctionProductItem: React.FC<AuctionProductItem> = ({
    product,
    OnBtnPublishClicked,
    OnDelete,
    OnEdit,
}) => {
    let icon_bid = null
    const current_date = new Date()
    const end_date = new Date(product?.end_time)
    const start_date = new Date(product?.start_time)
    let price =
        product.bids.length > 0
            ? product.bids[product.bids.length - 1].price
            : product.start_price
    let is_end_bid = false
    if (current_date > end_date) {
        //end auction
        icon_bid = product_img
        is_end_bid = true
    } else if (current_date > start_date && current_date < end_date) {
        // auctioning
        icon_bid = hand_img
    } else {
        icon_bid = time_img
        price = product.start_price
    }

    const date_create = new Date(product.createdAt)
    const created_at = [
        String(date_create.getDate()).padStart(2, '0'),
        String(date_create.getMonth() + 1).padStart(2, '0'),
        date_create.getFullYear(),
    ].join('-')

    return (
        <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="auction-items">
                <div className="thumb">
                    <img src={product.img_url} alt="auction-img" />
                    <div className="hand">
                        <img src={icon_bid} alt="hand-img" />
                    </div>
                </div>
                <div className="acution-content">
                    <h5>{`Name: ${product.name}`}</h5>
                    <h6
                        style={{ marginLeft: '1rem', marginTop: '1rem' }}
                    >{`Category: ${product.cate.name}`}</h6>
                    <h6 style={{ marginLeft: '1rem' }}>
                        Step price:{' '}
                        <span className="text-base-2">{`$${product.step_price} (USD)`}</span>
                    </h6>
                    <div className="content">
                        <div className="left">
                            <h6>Start bid:</h6>
                            <h6 className="text-base-2">
                                ${product.start_price} (USD)
                            </h6>
                            <h6>Current bid:</h6>
                            <h6 className="text-base-2">${price} (USD)</h6>
                        </div>
                        <div className="right">
                            {product.status == ProductStatus.ACCEPT ? (
                                <h6></h6>
                            ) : (
                                <>
                                    <h6>Start at: </h6>
                                    <ul
                                        className="countdown"
                                        data-date="10/29/2022 16:16:00"
                                    >
                                        <li>
                                            <span className="hours">
                                                {start_date.getHours()}:
                                                {start_date.getMinutes()}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="minutes">
                                                {[
                                                    start_date.getDate(),
                                                    start_date.getMonth() + 1,
                                                    start_date.getFullYear(),
                                                ].join('-')}
                                            </span>
                                        </li>
                                    </ul>
                                    <h6>End at:</h6>
                                    <ul
                                        className="countdown"
                                        data-date="10/29/2022 16:16:00"
                                    >
                                        <li>
                                            <span className="hours">
                                                {end_date.getHours()}:
                                                {end_date.getMinutes()}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="minutes">
                                                {[
                                                    end_date.getDate(),
                                                    end_date.getMonth() + 1,
                                                    end_date.getFullYear(),
                                                ].join('-')}
                                            </span>
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                    <p style={{ marginLeft: '1rem' }}>
                        create at: {created_at}
                    </p>

                    <>
                        <Stack
                            direction={'row'}
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Button
                                onClick={() => OnBtnPublishClicked(product._id)}
                                variant="contained"
                                color={'primary'}
                                style={{
                                    visibility: `${is_end_bid ? 'hidden' : 'visible'}`,
                                    transform: 'translateY(50%)',
                                }}
                            >
                                <img src={auct_img} alt="auct" />
                            </Button>
                            {is_end_bid ? (
                                <></>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => OnEdit(product)}
                                        variant="contained"
                                        color={'success'}
                                        style={{
                                            transform: 'translateY(50%)',
                                        }}
                                    >
                                        <PenIC />
                                    </Button>
                                    <Button
                                        onClick={() => OnDelete(product._id)}
                                        variant="contained"
                                        color={'error'}
                                        style={{
                                            transform: 'translateY(50%)',
                                        }}
                                    >
                                        <TrashIC />
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </>
                </div>
            </div>
        </div>
    )
}
