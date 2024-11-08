import { LoadingButton } from '@mui/lab'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
} from '@mui/material'
import { LoadingButtonStyle } from '../../../theme'
import { AddIC, CloudUploadIC } from '../../../assets/icon'
import { TextFieldLightStyle } from '../../../theme'
import { VisuallyHiddenInput, ImgPreview } from '../../../components'
import React, { ChangeEvent, useReducer, useState } from 'react'
import { ImagePreview, UseLocalStorage } from '../../../util'
import axios from 'axios'
import ApiUrl from '../../../constant/ApiUrl'
import { SESSION_KEY } from '../../../util/UseLocalStorage'
import { enqueueSnackbar } from 'notistack'
import { Category, Product } from '../../../interface'
import { StatusCodes } from 'http-status-codes'
type CreateAuctionDialogType = {
    is_open: boolean
    OnClose: () => void
    OnCreated: (product: Product) => void
    categories: Category[]
}
export const CreateAuctionDialog: React.FC<CreateAuctionDialogType> = ({
    is_open,
    OnClose,
    OnCreated,
    categories,
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [img_preview, setImgPreview] = useState('')
    const preview_img = (e: ChangeEvent<HTMLInputElement>) => {
        ImagePreview(
            e,
            (url) => {
                setImgPreview(url)
            },
            () => {
                setImgPreview('')
            }
        )
    }
    const [getLocal] = UseLocalStorage()
    const token: string | null = getLocal(SESSION_KEY)
    if (!token) {
        enqueueSnackbar('You must be login', { variant: 'error' })
    }
    const [, forceUpdate] = useReducer((x) => x + 1, 0)

    const handleClose = () => {
        if (img_preview) {
            setImgPreview('')
            window.URL.revokeObjectURL(img_preview)
        }
        setIsLoading(false)
        forceUpdate()
        OnClose()
    }

    const OnSubmitProduct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries((formData as any).entries())

        const { category_id, name, start_price, step_price, upload } = formJson

        if (
            !category_id ||
            !name ||
            !start_price ||
            !step_price ||
            upload.size == 0
        ) {
            enqueueSnackbar('Please enter all field', { variant: 'warning' })
            return
        }

        if (start_price <= 0 || step_price <= 0) {
            enqueueSnackbar('Price must be greater than 0', {
                variant: 'warning',
            })
            return
        }

        setIsLoading(true)
        axios
            .post(ApiUrl.HOST + ApiUrl.OWNER.CREATE_PRODUCT, formData, {
                headers: { authorization: 'Bearer ' + token },
            })
            .then((res) => {
                setIsLoading(false)
                if (res.data.status != StatusCodes.CREATED) {
                    enqueueSnackbar(res.data.mess || res.data.error, {
                        variant: 'error',
                    })
                    return
                }
                const product: Product = res.data.product
                console.log(product)

                OnCreated(product)
                handleClose()
            })
    }
    return (
        <Dialog
            fullWidth={true}
            open={is_open}
            PaperProps={{
                style: {
                    background: '#101046',
                    border: '1px solid #6d69f4',
                },
                component: 'form',
                onSubmit: OnSubmitProduct,
            }}
        >
            <DialogTitle>New Auction</DialogTitle>
            <DialogContent>
                <TextField
                    className="pb-4"
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="name"
                    sx={TextFieldLightStyle}
                />
                <TextField
                    className="pb-4"
                    style={{ width: '100%' }}
                    id="standard-select-currency"
                    select
                    label="Category"
                    name="category_id"
                    variant="standard"
                    sx={TextFieldLightStyle}
                >
                    {categories.map((cate: Category, index: number) => (
                        <MenuItem key={index} value={cate._id}>
                            {cate.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    className="pb-4"
                    margin="dense"
                    label="Start price"
                    type="number"
                    name="start_price"
                    fullWidth
                    variant="standard"
                    error={false}
                    helperText=""
                    sx={TextFieldLightStyle}
                />
                <TextField
                    className="pb-4"
                    margin="dense"
                    label="Step price"
                    type="number"
                    name="step_price"
                    fullWidth
                    variant="standard"
                    error={false}
                    helperText=""
                    sx={TextFieldLightStyle}
                />
                <Button
                    className="mb-3"
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIC />}
                >
                    Upload file
                    <VisuallyHiddenInput
                        name="upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => preview_img(e)}
                    />
                </Button>
                {img_preview != '' ? <ImgPreview url={img_preview} /> : <></>}
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="start"
                    variant="contained"
                    type="submit"
                    color="success"
                    startIcon={<AddIC />}
                    sx={LoadingButtonStyle}
                >
                    Create
                </LoadingButton>
                <Button onClick={handleClose} variant="outlined" color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
