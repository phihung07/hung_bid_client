import thumb from '../../../assets/image/product_detail.png'
import { BidderItem } from './BidderItem.tsx'
import { ProductDetail } from './ProductDetail'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ApiUrl, Time } from '../../../constant'
import { StatusCodes } from 'http-status-codes'
import { UseLoading } from '../../../hook/UseLoading.ts'
import { Bid, Product } from '../../../interface'

export const AuctionDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product>()
    useEffect(() => {
        UseLoading(true)
        setTimeout(() => {
            UseLoading(false)
            axios.get(ApiUrl.HOST + ApiUrl.PRODUCT.DETAIL + id).then((res) => {
                if (res.data.statusCode == StatusCodes.NOT_FOUND) {
                    navigate('/not-found-404')
                    return
                }
                const product: Product = res.data.product
                product.bids.sort((a, b) => b.price - a.price)
                setProduct(product)
            })
        }, Time.DELAY_API)
    }, [])

    const OnSubmitBid = (new_bid: Bid) => {
        console.log(new_bid)
        setProduct((pro) => {
            if (!pro) {
                return pro
            }
            const updatedBids = [new_bid, ...(pro.bids || [])]
            return {
                ...pro,
                bids: updatedBids,
            }
        })
        console.log(product)
    }
    return (
        <>
            <section className="breadcumnd-section breadcumnd-img section-bg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="breadcumnd-content">
                                <h1>Auction Details</h1>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="breadcumnd-thumb">
                                <img src={thumb} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {!product ? (
                <></>
            ) : (
                <>
                    <ProductDetail
                        product={product}
                        OnSubmitBidCallback={OnSubmitBid}
                    />
                    <section className="tabbing-section section-bg-two pt-2 pb-5">
                        <div className="container">
                            <div className="tabbing-wrapper">
                                <div className="tab-content ">
                                    <h5>Bid History</h5>
                                    <div className="col-lg-12">
                                        <div className="description-table">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th>Bidder</th>
                                                        <th>Date</th>
                                                        <th>Time</th>
                                                        <th>Unit Price</th>
                                                    </tr>
                                                    {product.bids.map(
                                                        (
                                                            bid: Bid,
                                                            index: number
                                                        ) => (
                                                            <BidderItem
                                                                key={index}
                                                                count={index}
                                                                bid={bid}
                                                            />
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}
