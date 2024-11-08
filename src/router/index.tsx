import { Route, Routes } from 'react-router-dom'
import {
    AuctionPage,
    HomePage,
    AuctionDetailPage,
    PersonalProfilePage,
    AuctionActivityPage,
    OrderPage,
    AuctionProductPage,
    CategoryPage,
} from '../page/client'
import {
    ClientLayout,
    AdminLayout,
    EmptyLayout,
    DashboardClientLayout,
} from '../layout'
import { NotFoundPage } from '../page/common'
import { PrivateRoute } from './PrivateRoute.tsx'
const public_routes = [
    { path: '/', Page: HomePage, Layout: ClientLayout },
    { path: '/auction', Page: AuctionPage, Layout: ClientLayout },
    { path: '/auction-detail/:id', Page: AuctionDetailPage, Layout: ClientLayout },
    { path: '/not-found-404', Page: NotFoundPage, Layout: EmptyLayout },
    { path: '/*', Page: NotFoundPage, Layout: EmptyLayout },
]

const private_routes = [
    {
        path: '/personal-profile',
        Page: PersonalProfilePage,
        Layout: DashboardClientLayout,
    },
    {
        path: '/auction-activity',
        Page: AuctionActivityPage,
        Layout: DashboardClientLayout,
    },
    {
        path: '/auction-product',
        Page: AuctionProductPage,
        Layout: DashboardClientLayout,
    },
    {
        path: '/order',
        Page: OrderPage,
        Layout: DashboardClientLayout,
    },
    {
        path: '/category',
        Page: CategoryPage,
        Layout: DashboardClientLayout,
    },
    { path: '/dashboard', Page: AuctionActivityPage, Layout: AdminLayout },
]
interface IRoute {
    path: string
    Page: React.FC<any>
    Layout: React.FC<any>
}
function PublicRoutes(routes: Array<IRoute>) {
    return routes.map((route: IRoute, index) => {
        const { Page, Layout, path } = route
        return (
            <Route
                key={index}
                path={path}
                element={
                    <Layout>
                        <Page />
                    </Layout>
                }
            ></Route>
        )
    })
}

function PrivateRoutes(routes: Array<IRoute>) {
    return routes.map((route: IRoute, index) => {
        const { Page, Layout, path } = route
        return (
            <Route
                key={index}
                path={path}
                element={
                <PrivateRoute>
                    <Layout>
                        <Page />
                    </Layout>
                </PrivateRoute>
                }
            ></Route>
        )
    })
}

export default function HungBidRouter() {
    return (
        <Routes>
            {PrivateRoutes(private_routes)}
            {PublicRoutes(public_routes)}
        </Routes>
    )
}
