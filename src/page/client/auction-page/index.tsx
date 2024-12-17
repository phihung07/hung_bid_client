import thumb_img from '../../../assets/image/about1.png'
import { Filter } from './filter'
import { Pagination } from './pagination'
import { BidItem } from '../auction-activity/BidItem.tsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ApiUrl, Time } from '../../../constant'
import { UseLoading } from '../../../hook/UseLoading.ts'
import { Product, ProductResponse } from '../../../interface'

export const AuctionPage = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [lastPage, setLastPage] = useState<number>(0)

    const [products, setProducts] = useState<Product[]>([])
    const GetProduct = (page: number, limit: number) => {
        UseLoading(true)
        const query = `?page=${page}&limit=${limit}`
        setTimeout(() => {
            UseLoading(false)
            axios.get(ApiUrl.HOST + ApiUrl.PRODUCT.LIST + query).then((res) => {
                const product_res: ProductResponse = res.data
                setProducts(product_res.product)
                setLastPage(product_res.lastpage)
                console.log(product_res.product)
            })
        }, Time.DELAY_API)
    }

    useEffect(() => {
        GetProduct(pageNumber, 9)
    }, [pageNumber])

    const OnPageChange = (page: number) => {
        setPageNumber(page)
    }

    const OnSearch = debounce((pro_name: string) => {
        UseLoading(true)
        const query = `?name=/${pro_name}/i`
        setTimeout(() => {
            UseLoading(false)
            axios.get(ApiUrl.HOST + ApiUrl.PRODUCT.LIST + query).then((res) => {
                const product_res: ProductResponse = res.data
                setProducts(product_res.product)
                setLastPage(product_res.lastpage)
            })
        }, Time.DELAY_API)
    }, 1000)
    function debounce<T extends (...args: any[]) => any>(
        func: T,
        delay: number
    ) {
        let timeoutId: ReturnType<typeof setTimeout>
        return function (this: any, ...args: Parameters<T>) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }
    const OnRefresh = () => {
        GetProduct(pageNumber, 9)
    }

    return (
        <>
            <section className="breadcumnd-section section-bg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="breadcumnd-content">
                                <h1>Auction</h1>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="breadcumnd-thumb">
                                <img src={thumb_img} alt="brea-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="auction-filter section-bg-two "
                style={{ marginBottom: '5rem', paddingTop: '5rem' }}
            >
                <div className="container">
                    <div className="main-filter-auction">
                        <Filter OnSearch={OnSearch} OnRefresh={OnRefresh} />
                        <div className="row">
                            {products.map((product: Product, index: number) => (
                                <div
                                    key={index}
                                    className="col-lg-4 col-md-6 wow fadeInLeft"
                                    style={{
                                        visibility: 'visible',
                                        animationDelay: '0.1s',
                                        animationName: 'fadeInLeft',
                                    }}
                                >
                                    <BidItem
                                        product={product}
                                        OnCheckOut={() => {}}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {products.length == 0 ? (
                        <></>
                    ) : (
                        <Pagination
                            page={pageNumber}
                            lastPage={lastPage}
                            onPageChange={OnPageChange}
                        />
                    )}
                </div>
            </section>
        </>
    )
}
