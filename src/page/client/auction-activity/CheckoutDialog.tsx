import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material'
import { LoadingButtonStyle, TextFieldLightStyle } from '../../../theme'
import { LoadingButton } from '@mui/lab'
import { CheckBoxIC } from '../../../assets/icon'
import { enqueueSnackbar } from 'notistack'
import { UseLocalStorage } from '../../../util'
import { SESSION_KEY } from '../../../util/UseLocalStorage'
import axios from 'axios'
import { ApiUrl, Time } from '../../../constant'
import { Product, User } from '../../../interface'
import { StatusCodes } from 'http-status-codes'

type CheckoutDialogType = {
    product: Product | undefined
    user: User | undefined
    is_open: boolean
    OnCLose: () => void
    OnCheckoutSuccess: (pro_id: string | undefined) => void
}
export const CheckoutDialog: React.FC<CheckoutDialogType> = ({
    product,
    user,
    is_open,
    OnCLose,
    OnCheckoutSuccess,
}) => {
    const handleClose = () => {
        OnCLose()
    }
    const [isLoading, setIsLoading] = useState(false)
    function OnCheckout() {
        if (!user?.address || !user?.phone) {
            enqueueSnackbar('Please Update Address and Phone to check out', {
                variant: 'warning',
            })
            return
        }
        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
            return
        }

        setTimeout(() => {
            axios
                .post(
                    ApiUrl.HOST + ApiUrl.CUSTOMER.CHECK_OUT + product?._id,
                    {},
                    {
                        headers: { authorization: 'Bearer ' + token },
                    }
                )
                .then((res) => {
                    setIsLoading(false)
                    if (res.data.status != StatusCodes.OK) {
                        enqueueSnackbar('Check out fail', { variant: 'error' })
                        return
                    }

                    OnCheckoutSuccess(product?._id)
                    enqueueSnackbar('Check out success', { variant: 'success' })
                })
        }, Time.DELAY_API)
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
            }}
        >
            <DialogTitle>Check Out</DialogTitle>
            <DialogContent>
                <TextField
                    aria-readonly={true}
                    value={user?.email}
                    className="pb-4"
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    label="Email"
                    variant="standard"
                    sx={TextFieldLightStyle}
                />
                <TextField
                    className="pb-4"
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    value={product?.name}
                    label="Product name"
                    aria-readonly="true"
                    variant="standard"
                    sx={TextFieldLightStyle}
                />

                <TextField
                    className="pb-4"
                    autoFocus
                    margin="dense"
                    type="text"
                    value={product?.bids[product?.bids.length - 1].price}
                    fullWidth
                    label="Product Price"
                    variant="standard"
                    sx={TextFieldLightStyle}
                />
                <TextField
                    aria-readonly={true}
                    value={user?.phone ?? 'Not Update'}
                    className="pb-4"
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    label="Phone"
                    variant="standard"
                    sx={TextFieldLightStyle}
                />
                <TextField
                    className="pb-4"
                    autoFocus
                    margin="dense"
                    value={user?.address ?? 'Not Update'}
                    type="text"
                    fullWidth
                    label="Address"
                    variant="standard"
                    sx={TextFieldLightStyle}
                />
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="start"
                    variant="contained"
                    type="submit"
                    color="success"
                    startIcon={<CheckBoxIC />}
                    sx={LoadingButtonStyle}
                    onClick={OnCheckout}
                >
                    Check
                </LoadingButton>
                <Button onClick={handleClose} variant="outlined" color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
