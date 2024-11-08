import {
    FacebookIC,
    MessageIC,
    PhoneIC,
    InstagIC,
    TwitterIC,
} from '../../assets/icon'
import { UseLocalStorage } from '../../util'
import { SESSION_KEY } from '../../util/UseLocalStorage.ts'

export default function Header() {
    const [getLocal, saveLocal] = UseLocalStorage()
    const token = getLocal(SESSION_KEY)
    const OnLogoutClicked = () => {
        saveLocal(SESSION_KEY, '')
        document.location = '/'
    }
    return (
        <div className="hader-top">
            <div className="container">
                <div className="header-top-wrapper">
                    <ul className="header-top-left">
                        <li>
                            <div className="icon">
                                <MessageIC fontSize="small" />
                            </div>
                            <a href="#">tphphihung@gmail.com</a>
                        </li>
                        <li>
                            <div className="icon">
                                <PhoneIC fontSize="small" />
                            </div>
                            <a href="#">+0336253483</a>
                        </li>
                    </ul>
                    <div className="header-top-right">
                        <ul className="social">
                            <li>
                                <a href="https://facebook.com" className="icon">
                                    <FacebookIC fontSize="small" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com"
                                    className="icon"
                                >
                                    <InstagIC fontSize="small" />
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" className="icon">
                                    <TwitterIC fontSize="small" />
                                </a>
                            </li>
                        </ul>
                        {
                            token ? <span className={'login'} onClick={OnLogoutClicked}>Logout </span>
                                :
                                <span className={`login mypopup`}>Login
                    </span>
                        }


                        <span className="cmn--btn cd-popup-trigger">
                            <i className="fas fa-circle-user"></i> Register
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
