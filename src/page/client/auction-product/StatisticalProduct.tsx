import auctioneer_img from '../../../assets/image/auctioneer.png'
import product_img from '../../../assets/image/product.png'
import money_img from '../../../assets/image/money.png'

type StatisticalProductType = {
    winner: number
    active_bid: number
    revenue: number
}
export const StatisticalProduct: React.FC<StatisticalProductType> = ({ winner, active_bid, revenue }) => {
    return (
        <div className="row g-4">
            <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="activity-items odometer-item">
                    <div className="thumb">
                        <img src={product_img} alt="count-img" />
                    </div>
                    <div className="content">
                        <h3 className="odometer odometer-auto-theme">
                            {active_bid}
                        </h3>
                        <h5>Active Bids</h5>
                    </div>
                </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="activity-items odometer-item">
                    <div className="thumb">
                        <img src={auctioneer_img} alt="count-img" />
                    </div>
                    <div className="content">
                        <h3 className="odometer odometer-auto-theme">
                            {winner}
                        </h3>
                        <h5>Winner</h5>
                    </div>
                </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="activity-items odometer-item">
                    <div className="thumb">
                        <img src={money_img} alt="count-img" />
                    </div>
                    <div className="content">
                        <h3 className="odometer odometer-auto-theme">
                            {revenue}
                        </h3>
                        <h5>Revenue</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
