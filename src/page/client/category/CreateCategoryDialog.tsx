import { LoadingButton } from '@mui/lab'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material'
import { LoadingButtonStyle } from '../../../theme'
import { AddIC, SaveIC } from '../../../assets/icon'
import { TextFieldLightStyle } from '../../../theme'
import { Category } from '../../../interface'
import { UseLocalStorage } from '../../../util'
import { enqueueSnackbar } from 'notistack'
import { SESSION_KEY } from '../../../util/UseLocalStorage'
import axios from 'axios'
import { ApiUrl } from '../../../constant'
import { useEffect, useState } from 'react'

export interface CreateCategoryDialogType {
    on_close: () => void
    cate: Category | null
    OnCreateSuccess: (cate: Category) => void
    OnUpdateSuccess: (cate: Category) => void
}

export const CreateCategoryDialog: React.FC<CreateCategoryDialogType> = ({
    on_close,
    cate,
    OnCreateSuccess,
    OnUpdateSuccess,
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [cate_name, setCateName] = useState(cate?.name)
    useEffect(() => setCateName(cate?.name), [cate])
    const OnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries((formData as any).entries())
        const cate_name = formJson.cate_name

        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
        }
        const body = {
            category_name: cate_name,
        }
        const query = !cate?._id
            ? ApiUrl.HOST + ApiUrl.CATEGORY.CREATE
            : ApiUrl.HOST + ApiUrl.CATEGORY.UPDATE + cate?._id
        const req = !cate?._id
            ? axios.post(query, body, {
                  headers: { authorization: 'Bearer ' + token },
              })
            : axios.put(query, body, {
                  headers: { authorization: 'Bearer ' + token },
              })

        req.then((res) => {
            setIsLoading(false)
            OnClose()
            if (!res.data) {
                enqueueSnackbar(!cate?._id ? 'Create' : 'Update' + 'fail', {
                    variant: 'error',
                })
                return
            }
            if (!cate) {
                return
            }
            cate.name = cate_name

            !cate?._id ? OnCreateSuccess(res.data) : OnUpdateSuccess(cate)
        })
    }

    const OnClose = () => {
        on_close()
    }

    return (
        <Dialog
            fullWidth={true}
            open={cate ? true : false}
            PaperProps={{
                style: {
                    background: '#101046',
                    border: '1px solid #6d69f4',
                },
                component: 'form',
                onSubmit: OnSubmit,
            }}
        >
            <DialogTitle>{!cate?._id ? 'New' : 'Edit'} Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    name="cate_name"
                    fullWidth
                    onChange={(e) => setCateName(e.target.value)}
                    value={cate_name}
                    variant="standard"
                    sx={TextFieldLightStyle}
                />
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    loadingPosition="start"
                    variant="contained"
                    color="success"
                    startIcon={!cate?._id ? <AddIC /> : <SaveIC />}
                    sx={LoadingButtonStyle}
                >
                    {!cate?._id ? 'Create' : 'Save'}
                </LoadingButton>
                <Button onClick={OnClose} variant="outlined" color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
