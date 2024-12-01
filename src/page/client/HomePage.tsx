import hero_img from '../../assets/image/hero.png'
import shape_img from '../../assets/image/shape1.png'
import coin_img from '../../assets/image/coin.png'
import tv_img from '../../assets/image/w1.png'
import cart_img from '../../assets/image/w2.png'
import axe_img from '../../assets/image/w3.png'
import cup_img from '../../assets/image/w4.png'
import arrow_img from '../../assets/image/arrow.png'
export const HomePage = () => {
    return (
        <>
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div
                            className="col-lg-7 wow fadeInUp"
                            data-wow-delay="0.2s"
                            style={{
                                visibility: 'visible',
                                animationDelay: '0.2s',
                                animationName: 'fadeInUp',
                            }}
                        >
                            <div className="hero-content">
                                <h1>
                                    Exclusive Online Bid for Unbeatable Deals!
                                </h1>
                                <p>
                                    Participate in bid and get hottest gadgets
                                    on your Ticket Cost.
                                </p>
                            </div>
                        </div>
                        <div
                            className="col-lg-5 wow fadeInDown"
                            data-wow-delay="0.2s"
                            style={{
                                visibility: 'visible',
                                animationDelay: '0.2s',
                                animationName: 'fadeInDown',
                            }}
                        >
                            <div className="hero-thumb">
                                <img src={hero_img} alt="hero-img" />
                                <div className="shape1">
                                    <img src={shape_img} alt="shape-img" />
                                </div>
                                <div className="shape2">
                                    <img src={coin_img} alt="shape-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="working-section section-bg-two pb-120 pt-5">
                <div className="container">
                    <div
                        className="section-header section-center wow fadeInDown"
                        style={{
                            visibility: 'visible',
                            animationName: 'fadeInDown',
                        }}
                    >
                        <h2>How it works?</h2>
                        <p>Follow these simple steps and make profits !</p>
                    </div>
                    <div className="overflow">
                        <div className="work-wrapper">
                            <div className="row g-5">
                                <div
                                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                                    data-wow-delay="0.2s"
                                    style={{
                                        visibility: 'visible',
                                        animationDelay: '0.2s',
                                        animationName: 'fadeInUp',
                                    }}
                                >
                                    <div className="work-items space-sol">
                                        <div className="thumb">
                                            <img src={tv_img} alt="work-img" />
                                            <span className="serial">01</span>
                                        </div>
                                        <div className="content">
                                            <h5>Register for free</h5>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                                    data-wow-delay="0.4s"
                                    style={{
                                        visibility: 'visible',
                                        animationDelay: '0.4s',
                                        animationName: 'fadeInUp',
                                    }}
                                >
                                    <div className="work-items">
                                        <div className="arrow arrow-none-1">
                                            <img
                                                src={arrow_img}
                                                alt="arrow-img"
                                            />
                                        </div>
                                        <div className="thumb">
                                            <img
                                                src={cart_img}
                                                alt="work-img"
                                            />
                                            <span className="serial">02</span>
                                        </div>
                                        <div className="content">
                                            <h5>Buy or Bid</h5>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                                    data-wow-delay="0.7s"
                                    style={{
                                        visibility: 'visible',
                                        animationDelay: '0.7s',
                                        animationName: 'fadeInUp',
                                    }}
                                >
                                    <div className="work-items">
                                        <div className="arrow arrow-none-2">
                                            <img
                                                src={arrow_img}
                                                alt="arrow-img"
                                            />
                                        </div>
                                        <div className="thumb">
                                            <img src={axe_img} alt="work-img" />
                                            <span className="serial">03</span>
                                        </div>
                                        <div className="content">
                                            <h5>Submit a Bid</h5>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                                    data-wow-delay="0.9s"
                                    style={{
                                        visibility: 'visible',
                                        animationDelay: '0.9s',
                                        animationName: 'fadeInUp',
                                    }}
                                >
                                    <div className="work-items">
                                        <div className="arrow arrow-none-3">
                                            <img
                                                src={arrow_img}
                                                alt="arrow-img"
                                            />
                                        </div>
                                        <div className="thumb">
                                            <img src={cup_img} alt="work-img" />
                                            <span className="serial">04</span>
                                        </div>
                                        <div className="content">
                                            <h5>Win</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
