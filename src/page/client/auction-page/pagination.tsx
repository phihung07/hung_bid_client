import { ArrowLeftIC, ArrowRightIC } from '../../../assets/icon'
import { ReactNode } from 'react'

type PaginationPros = {
    page:number,
    lastPage:number,
    onPageChange: (page : number) => void
}

export const Pagination = ({page, lastPage, onPageChange}:PaginationPros) => {
    console.log(page)
    console.log(lastPage)
    const PagesComponent = () : ReactNode => {
        const element = []
        for (let i = 1; i <= lastPage; i++) {
            element.push(<li key={i}>
                <span className={page == i ? 'pagi-active':''}
                      onClick={() => onPageChange(i)}
                >{i}</span>
            </li>)
        }
        return element
    }
    return (
        <ul className="pagination pagi-space">
            <li>
                {
                    page == 1 ? <></> : <span><ArrowLeftIC/></span>
                }
            </li>
            {
                PagesComponent()
            }
            <li>
                {
                    page == lastPage ? <></> : lastPage == null ? <></>: <span><ArrowRightIC /></span>
                }
            </li>
        </ul>
    )
}
