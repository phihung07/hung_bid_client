import { NavLink } from 'react-router-dom'
import left_img from '../../assets/image/left.png'
import right_img from '../../assets/image/right.png'
import main_img from '../../assets/image/r.png'
export const NotFoundPage = () => {
    return (
        <section className="error-section">
            <div className="error-man1">
                <img src={left_img} alt="error-left" />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="error-wrapper">
                            <div className="thumb">
                                <img src={main_img} alt="main-error" />
                            </div>
                            <div className="content">
                                <h3 className="title">Sorry, Page Not Found</h3>
                                <p>
                                    Sorry, but the page you are looking for is
                                    not found.
                                </p>
                                <NavLink to={'/'} className={'cmn--btn'}>
                                    Go Back Home
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="error-man2">
                <img src={right_img} alt="error-left" />
            </div>
        </section>
    )
}
