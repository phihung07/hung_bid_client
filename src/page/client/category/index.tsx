import { Button, Stack } from '@mui/material'
import { AddIC } from '../../../assets/icon'
import { CreateCategoryDialog } from './CreateCategoryDialog'
import { useEffect, useState } from 'react'
import { Category } from '../../../interface'
import { CateItem } from './CateItem'
import { ShowConfirmDeleteDialog, UseLocalStorage } from '../../../util'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { ApiUrl } from '../../../constant'
import { SESSION_KEY } from '../../../util/UseLocalStorage'
import { StatusCodes } from 'http-status-codes'

export const CategoryPage = () => {
    const handleClickOpen = () => {
        setCateSelected({} as Category)
    }

    const handleClose = () => {
        setCateSelected(null)
    }

    const [cateList, setCateList] = useState<Category[]>([])

    useEffect(() => {
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
        }
        axios
            .get(ApiUrl.HOST + ApiUrl.CATEGORY.LIST + '?sort=-createdAt', {
                headers: { authorization: 'Bearer ' + token },
            })
            .then((res) => {
                setCateList(res.data)
                console.log(cateList)
            })
    }, [])

    async function OnDelete(cate_id: string) {
        const result = await ShowConfirmDeleteDialog()
        if (result.isConfirmed) {
            const [getLocal] = UseLocalStorage()
            const token: string | null = getLocal(SESSION_KEY)
            if (!token) {
                enqueueSnackbar('You must be login', { variant: 'error' })
            }
            axios
                .delete(ApiUrl.HOST + ApiUrl.CATEGORY.DELETE + cate_id, {
                    headers: { authorization: 'Bearer ' + token },
                })
                .then((res) => {
                    if (res.data.status == StatusCodes.NOT_ACCEPTABLE) {
                        enqueueSnackbar(
                            "You can't delete so category has been used",
                            {
                                variant: 'error',
                            }
                        )
                        return
                    }
                    setCateList(cateList.filter((cate) => cate._id != cate_id))
                    enqueueSnackbar('Delete success', {
                        variant: 'success',
                    })
                })
        }
    }

    const [cateSelected, setCateSelected] = useState<Category | null>(null)

    function OnEdit(cate: Category): void {
        setCateSelected({ ...cate })
    }

    const OnUpdateSuccess = (update_cate: Category) => {
        console.log(update_cate)

        setCateList((): Category[] => {
            return cateList.map((cate) =>
                cate._id === update_cate._id ? update_cate : cate
            ) as Category[]
        })
    }

    const OnCreateSuccess = (new_cate: Category) => {
        setCateList((cates: Category[]) => {
            return [new_cate, ...cates]
        })
    }

    return (
        <>
            <CreateCategoryDialog
                OnCreateSuccess={OnCreateSuccess}
                OnUpdateSuccess={OnUpdateSuccess}
                cate={cateSelected}
                on_close={handleClose}
            />
            <div className="counter-box">
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    className="my-heading-border-bottom"
                >
                    <h5>My Category</h5>
                    <Button
                        variant="contained"
                        startIcon={<AddIC />}
                        color={'success'}
                        onClick={handleClickOpen}
                    >
                        New
                    </Button>
                </Stack>
            </div>
            <div className="activity-table">
                <table>
                    <tbody>
                        <tr className="border-none">
                            <th>Name</th>
                            <th>Create at</th>
                            <th>Action</th>
                        </tr>
                        {cateList.map((cate: Category, index: number) => (
                            <CateItem
                                key={index}
                                cate={cate}
                                OnDelete={() => OnDelete(cate._id)}
                                OnEdit={() => OnEdit(cate)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
