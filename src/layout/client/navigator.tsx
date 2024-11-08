import { NavLink } from 'react-router-dom'
import logo from '../../../public/law.svg'
import { ArrowDropDownIC, SearchIC } from '../../assets/icon'

import dashboard_img from '../../assets/image/dashboard.png'
import person_img from '../../assets/image/personal-profile.png'
import auction_img from '../../assets/image/auction.png'
import win_img from '../../assets/image/win.png'
import cate_img from '../../assets/image/shape.png'
import { UseLocalStorage } from '../../util'
import { SESSION_KEY } from '../../util/UseLocalStorage.ts'
export default function Navigator() {
    const onNavClicked = (e : any) => {
        const my_navs = document.getElementsByClassName('my-nav')
        Array.from(my_navs).forEach((nav) => {
            nav.classList.remove('active')
        })

        e.target.classList.add('active')
    }

    const [getLocal] = UseLocalStorage()
    const token = getLocal(SESSION_KEY)
    return (
        <header className="header-section animated slideInUp">
            <div className="container">
                <div className="header-wrapper">
                    <div className="logo-menu">
                        <a href="#" className="logo">
                            <img src={logo} alt="logo" />
                        </a>
                    </div>

                    <div className="header-bar d-lg-none">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="menu-btn-wrapper"></div>
                    <ul className="main-menu">
                        <li>
                            <NavLink
                                to={'/'}
                                className={`my-nav ${location.pathname == '' ? 'active' : ''}`}
                                onClick={onNavClicked}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/auction'}
                                className={`my-nav ${location.pathname == '/auction' || location.pathname == '/auction-detail' ? 'active' : ''}`}
                                onClick={onNavClicked}
                            >
                                Auction
                            </NavLink>
                        </li>
                        <li className={`${token ? '' : 'd-none'}`}>
                            <a
                                href="#"
                                className={`my-nav ${['/auction-activity', '/auction-product', '/order', '/personal-profile'].includes(location.pathname) ? 'active' : ''}`}
                            >
                                Dashboard
                                <ArrowDropDownIC fontSize="small" />
                            </a>
                            <ul className="sub-menu">
                                <li>
                                    <NavLink to={'/auction-activity'}>
                                        <img
                                            src={dashboard_img}
                                            alt="icon"
                                            style={{ marginRight: '1rem' }}
                                        />
                                        Auction activity
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/auction-product'}>
                                        <img
                                            src={auction_img}
                                            alt="icon"
                                            style={{ marginRight: '1rem' }}
                                        />
                                        Auction product
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/order'}>
                                        <img
                                            src={win_img}
                                            alt="icon"
                                            style={{ marginRight: '1rem' }}
                                        />
                                        Winning bid
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/category'}>
                                        <img
                                            src={cate_img}
                                            alt="icon"
                                            style={{ marginRight: '1rem' }}
                                        />
                                        Category
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/personal-profile'}>
                                        <img
                                            src={person_img}
                                            alt="icon"
                                            style={{ marginRight: '1rem' }}
                                        />
                                        Personal profile
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="search-icon">
                            <a href="#search" className="serach">
                                <SearchIC fontSize="small" />
                            </a>
                            <div id="search">
                                <span className="close">X</span>
                                <input
                                    name="q"
                                    type="search"
                                    placeholder="Type search"
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
