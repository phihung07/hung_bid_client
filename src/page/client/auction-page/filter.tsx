import { useState } from 'react'
import { Button } from '@mui/material'
type OnSearchType = {
    OnSearch: (pro_name: string) => void
    OnRefresh: () => void
}
export const Filter = ({ OnSearch, OnRefresh }: OnSearchType) => {
    const [searchText, setSearchText] = useState<string>('')
    const OnType = (e: any) => {
        setSearchText(e.target.value)
        OnSearch(e.target.value)
    }
    return (
        <div className="filter-short-wrapper">
            <div className="short-left">
                {/*<div className="short">*/}
                {/*    <p>Short By :</p>*/}
                {/*    <select className="form-select" style={{ display: 'none' }}>*/}
                {/*        <option value="1">All</option>*/}
                {/*        <option value="2">Type</option>*/}
                {/*    </select>*/}
                {/*    <div className="nice-select form-select" tabIndex={0}>*/}
                {/*        <span className="current">All</span>*/}
                {/*        <ul className="list">*/}
                {/*            <li data-value="1" className="option selected">*/}
                {/*                All*/}
                {/*            </li>*/}
                {/*            <li data-value="2" className="option">*/}
                {/*                Type*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        OnRefresh()
                        setSearchText('')
                    }}
                >
                    Refresh
                </Button>
            </div>

            <div className="short-right">
                <form>
                    <input
                        value={searchText}
                        type="text"
                        onChange={OnType}
                        placeholder="Product Name..."
                    />
                    <i className="fas fa-magnifying-glass"></i>
                </form>
            </div>
        </div>
    )
}
