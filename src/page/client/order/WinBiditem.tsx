import { NavLink } from 'react-router-dom'
import product_img from '../../../assets/image/product.png'
import { Order } from '../../../interface/Order'
import React from 'react'
type WinBidItemType = {
    order: Order
}
export const WinBidItem: React.FC<WinBidItemType> = ({ order }) => {
    return (
        <div className="col-xl-6 col-lg-6 col-md-6 ">
            <div className="auction-items">
                <div className="thumb">
                    <img src={order.product.img_url} />
                    <div className="hand">
                        <img src={product_img} />
                    </div>
                </div>
                <div className="acution-content">
                    <NavLink to={`/auction-detail/${order.product._id}`}>
                        <h5>{order.product.name}</h5>
                    </NavLink>

                    <div className="content">
                        <div className="left" style={{ border: 'none' }}>
                            <h6>Bid price:</h6>
                            <h6 className="text-base-2">
                                $
                                {
                                    order.product.bids[
                                        order.product.bids.length - 1
                                    ].price
                                }{' '}
                                (USD)
                            </h6>
                        </div>
                        <div className="right">
                            <h6>Status</h6>
                            <ul className="countdown">
                                <li>
                                    <span className="hours">
                                        {order.status}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
