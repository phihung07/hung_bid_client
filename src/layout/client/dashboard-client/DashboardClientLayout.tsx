import { ClientLayout } from '..'
import { ChildrenPros } from '../../../interface'
import bg_img from '../../../assets/image/blog-banner.png'

import dashboard_img from '../../../assets/image/dashboard.png'
import person_img from '../../../assets/image/personal-profile.png'
import auction_img from '../../../assets/image/auction.png'
import win_img from '../../../assets/image/win.png'
import cate_img from '../../../assets/image/shape.png'
import { NavLink } from 'react-router-dom'
import { UserInfo } from './UserInfor'
export const DashboardClientLayout: React.FC<ChildrenPros> = ({ children }) => {
    return (
        <ClientLayout>
            <>
                <section
                    className="breadcumnd-section dashboard-img section-bg"
                    style={{
                        background: `url(${bg_img}) no-repeat center center`,
                        backgroundSize: 'cover',
                    }}
                ></section>
                <section
                    className="dashboard-section section-bg-two"
                    style={{ marginBottom: '3rem' }}
                >
                    <div className="container">
                        <div className="dashboard-wrapper">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-8">
                                    <div className="dashboard-widget">
                                        <UserInfo />
                                        <ul className="dashboard-menu">
                                            <li
                                                className={`${location.pathname.includes('auction-activity') ? 'active' : ''}`}
                                            >
                                                <NavLink
                                                    to={'/auction-activity'}
                                                >
                                                    <img
                                                        src={dashboard_img}
                                                        alt="click-img"
                                                    />
                                                    <span>
                                                        Auction activity
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${location.pathname.includes('auction-product') ? 'active' : ''}`}
                                            >
                                                <NavLink
                                                    to={'/auction-product'}
                                                >
                                                    <img
                                                        src={auction_img}
                                                        alt="click-img"
                                                    />
                                                    <span>Auction product</span>
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${location.pathname.includes('order') ? 'active' : ''}`}
                                            >
                                                <NavLink to={'/order'}>
                                                    <img
                                                        src={win_img}
                                                        alt="click-img"
                                                    />
                                                    <span>Winning Orders</span>
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${location.pathname.includes('category') ? 'active' : ''}`}
                                            >
                                                <NavLink to={'/category'}>
                                                    <img
                                                        src={cate_img}
                                                        alt="click-img"
                                                    />
                                                    <span>Category</span>
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${location.pathname.includes('personal-profile') ? 'active' : ''}`}
                                            >
                                                <NavLink
                                                    to={'/personal-profile'}
                                                >
                                                    <img
                                                        src={person_img}
                                                        alt="click-img"
                                                    />
                                                    <span>
                                                        Personal Profile
                                                    </span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="dashboard-right-wrapper">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </ClientLayout>
    )
}
