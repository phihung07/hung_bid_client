export default function Footer() {
    return (
        <footer className="footer-section section-bg pt-5">
            <div className="container">
                <div className="footer-bottom">
                    <div className="footer-logo"></div>
                    <ul className="footer-bottom-link">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Predict</a>
                        </li>
                        <li>
                            <a href="#">Auction</a>
                        </li>
                    </ul>
                </div>
                <div className="main-bottom">
                    <p>Copyright © {new Date().getFullYear()} HungBid</p>
                </div>
            </div>
        </footer>
    )
}
