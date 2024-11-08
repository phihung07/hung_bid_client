import './App.css'
import HungBidRouter from './router'
import { BrowserRouter } from 'react-router-dom'
import {SnackbarProvider} from 'notistack'

import './assets/css/bootstrap.min.css'
import './assets/css/animate.css'
import './assets/css/main.css'
import './assets/css/nice-select.css'
import './assets/css/odometer.css'
import './assets/css/owl.carousel.min.css'
import './assets/css/swiper.min.css'
import './assets/css/sweet-alert.css'

import { ThemeProvider } from '@mui/material/styles'
import { MyTheme } from './theme'

import 'jquery'
import './assets/js/jquery-3.6.0.min.js'
import './assets/js/jquery.nice-select.min.js'
import './assets/js/bootstrap.bundle.min.js'
import './assets/js/countdown.min.js'
import './assets/js/main.js'

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={MyTheme}>
                <SnackbarProvider
                    maxSnack={4}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                    <HungBidRouter />
                </SnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
