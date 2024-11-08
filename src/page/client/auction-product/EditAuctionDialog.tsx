import { LoadingButton } from '@mui/lab'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    NativeSelect,
    TextField,
} from '@mui/material'
import { LoadingButtonStyle } from '../../../theme'
import { TextFieldLightStyle } from '../../../theme'
import { VisuallyHiddenInput, ImgPreview } from '../../../components'
import React, { ChangeEvent, useState } from 'react'
import { ImagePreview, UseLocalStorage } from '../../../util'
import axios from 'axios'
import ApiUrl from '../../../constant/ApiUrl'
import { SESSION_KEY } from '../../../util/UseLocalStorage'
import { enqueueSnackbar } from 'notistack'
import { Category, Product } from '../../../interface'
import { StatusCodes } from 'http-status-codes'
import { CloudUploadIC, SaveIC } from '../../../assets/icon'
type EditAuctionDialogType = {
    OnClose: () => void
    OnUpdate: (product: Product) => void
    product: Product | null
    categories: Category[]
}
export const EditAuctionDialog: React.FC<EditAuctionDialogType> = ({
    OnClose,
    OnUpdate,
    product,
    categories,
}) => {
    const [edit_product, setEditProduct] = useState<Product | null>(product)
    const [isLoading, setIsLoading] = useState(false)
    const [img_preview, setImgPreview] = useState(edit_product?.img_url ?? '')
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

    const handleClose = () => {
        if (img_preview) {
            setImgPreview('')
            window.URL.revokeObjectURL(img_preview)
        }
        setIsLoading(false)
        OnClose()
    }

    const OnSubmitProduct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries((formData as any).entries())
        const { category_id, name, start_price, step_price } = formJson

        if (!category_id || !name || !start_price || !step_price) {
            enqueueSnackbar('Please enter all field', { variant: 'warning' })
            return
        }

        if (start_price <= 0 || step_price <= 0) {
            enqueueSnackbar('Price must be greater than 0', {
                variant: 'warning',
            })
            return
        }
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        setIsLoading(true)
        axios
            .put(
                ApiUrl.HOST + ApiUrl.OWNER.UPDATE_PRODUCT + product?._id,
                formData,
                {
                    headers: { authorization: 'Bearer ' + token },
                }
            )
            .then((res) => {
                setIsLoading(false)
                if (res.data.status != StatusCodes.OK) {
                    enqueueSnackbar(res.data.mess || res.data.error, {
                        variant: 'error',
                    })
                    return
                }
                const product: Product = res.data.product
                OnUpdate(product)

                OnClose()
            })
    }

    return (
        <Dialog
            fullWidth={true}
            open={product ? true : false}
            PaperProps={{
                style: {
                    zIndex: 99999999,
                    background: '#101046',
                    border: '1px solid #6d69f4',
                },
                component: 'form',
                onSubmit: OnSubmitProduct,
            }}
        >
            <DialogTitle>Edit Auction</DialogTitle>
            <DialogContent>
                <TextField
                    className="pb-4"
                    autoFocus
                    margin="dense"
                    value={edit_product?.name}
                    onChange={(e) =>
                        setEditProduct({
                            ...edit_product,
                            name: e.target.value,
                        } as Product)
                    }
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="name"
                    sx={TextFieldLightStyle}
                />
                <FormControl
                    fullWidth
                    sx={TextFieldLightStyle}
                    className="pb-4"
                >
                    <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                    >
                        Category
                    </InputLabel>
                    <NativeSelect
                        defaultValue={edit_product?.cate._id}
                        inputProps={{
                            name: 'category_id',
                            id: 'uncontrolled-native',
                        }}
                    >
                        {categories.map((cate: Category, index: number) => {
                            return (
                                <option
                                    key={index}
                                    style={{ color: 'black' }}
                                    value={cate._id}
                                >
                                    {cate.name}
                                </option>
                            )
                        })}
                    </NativeSelect>
                </FormControl>
                <TextField
                    onChange={(e) =>
                        setEditProduct({
                            ...edit_product,
                            start_price: Number(e.target.value),
                        } as Product)
                    }
                    value={edit_product?.start_price}
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
                    value={edit_product?.step_price}
                    onChange={(e) =>
                        setEditProduct({
                            ...edit_product,
                            step_price: Number(e.target.value),
                        } as Product)
                    }
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
                {(edit_product?.img_url ?? img_preview != '') ? (
                    <ImgPreview
                        url={
                            img_preview == ''
                                ? (edit_product?.img_url ?? '')
                                : img_preview
                        }
                    />
                ) : (
                    <></>
                )}
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="start"
                    variant="contained"
                    type="submit"
                    color="success"
                    startIcon={<SaveIC />}
                    sx={LoadingButtonStyle}
                >
                    Update
                </LoadingButton>
                <Button onClick={handleClose} variant="outlined" color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
