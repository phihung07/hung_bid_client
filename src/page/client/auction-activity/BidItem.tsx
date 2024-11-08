import hand_img from '../../../assets/image/hand.png'
import time_img from '../../../assets/image/time.svg'
import product_img from '../../../assets/image/product.png'
import { NavLink } from 'react-router-dom'
import { Product } from '../../../interface'
import { UseLocalStorage } from '../../../util'
import { USER_ID_KEY } from '../../../util/UseLocalStorage'

type BidItemType = {
    product: Product
    OnCheckOut: (pro_id: string) => void
}
export const BidItem: React.FC<BidItemType> = ({ product, OnCheckOut }) => {
    let icon_bid = null
    const current_date = new Date()
    const end_date = new Date(product.end_time)
    const start_date = new Date(product.start_time)
    let time_label = ''
    let button_label = ''
    let date_time_bid = null
    let price =
        product.bids.length > 0
            ? product.bids[product.bids.length - 1].price
            : product.start_price
    let is_end_bid = false
    let user_win_bid = ''
    if (product.bids.length > 0) {
        user_win_bid = product.bids[product.bids.length - 1].user._id
    }
    const [getLocal] = UseLocalStorage()
    let curent_user_id = getLocal(USER_ID_KEY)
    if (current_date > end_date) {
        //end auction
        icon_bid = product_img
        time_label = 'End At:'
        button_label = 'Check out'
        date_time_bid = end_date
        is_end_bid = true
    } else if (current_date > start_date && current_date < end_date) {
        // auctioning
        icon_bid = hand_img
        time_label = 'End At:'
        button_label = 'Submit a bid'
        date_time_bid = end_date
    } else {
        icon_bid = time_img
        time_label = 'Start At:'
        button_label = 'View detail'
        date_time_bid = start_date
        price = product.start_price
    }

    return (
        <div className="auction-items">
            <NavLink to={`/auction-detail/${product._id}`}>
                <div
                    className="thumb-box cursor-pointer"
                    onClick={() => console.log(123)}
                >
                    <div className="thumb">
                        <img src={product.img_url} alt="auction-img" />
                    </div>
                    <span className="hand">
                        <img src={icon_bid} alt="hand-img" />
                    </span>
                </div>
            </NavLink>
            <div className="acution-content">
                <h5>
                    <span>{product.name}</span>
                </h5>
                <h6
                    style={{ marginTop: '1rem', marginLeft: '1rem' }}
                >{`Category: ${product.cate.name}`}</h6>
                <h6 style={{ marginLeft: '1rem' }}>
                    Step price:{' '}
                    <span className="text-base-2">{`$${product.step_price} (USD)`}</span>
                </h6>
                <div className="content">
                    <div className="left">
                        <h6>Start bid</h6>
                        <h6 className="text-base-2">
                            ${product.start_price} (USD)
                        </h6>
                        <h6>Current bid </h6>
                        <h6 className="text-base-2">${price} (USD)</h6>
                    </div>
                    <div className="right">
                        <h6>{time_label}</h6>
                        <ul className="countdown">
                            <li>
                                <span className="hours">
                                    {date_time_bid.getHours()}:
                                    {date_time_bid.getMinutes()}
                                </span>
                            </li>
                            <li>
                                <span className="seconds">
                                    {[
                                        date_time_bid.getDate(),
                                        date_time_bid.getMonth() + 1,
                                        date_time_bid.getFullYear(),
                                    ].join('-')}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="cm-button ">
                    <span
                        onClick={() => OnCheckOut(product._id)}
                        className="cmn--btn"
                        style={{
                            visibility:
                                is_end_bid && curent_user_id == user_win_bid
                                    ? location.pathname == '/auction'
                                        ? 'hidden'
                                        : undefined
                                    : 'hidden',
                        }}
                    >
                        {button_label}
                    </span>
                </div>
            </div>
        </div>
    )
}
