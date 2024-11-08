import React from 'react'
import Header from './header'
import Navigator from './navigator'
import Footer from './footer'
import ChildrenPros from '../../interface/ChildrenPros'
import { RegisterPopup, ClientLoading, LoginPopup } from '../../components'
export const ClientLayout: React.FC<ChildrenPros> = ({ children }) => {
    return (
        <>
            <ClientLoading />
            <Header />
            <Navigator />
            {children}
            <Footer />
            <RegisterPopup />
            <LoginPopup />
        </>
    )
}
