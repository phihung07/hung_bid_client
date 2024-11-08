import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material'
import { LoadingButtonStyle, TextFieldLightStyle } from '../../../theme'
import { LoadingButton } from '@mui/lab'
import { CheckBoxIC } from '../../../assets/icon'
import { enqueueSnackbar } from 'notistack'
import { UseLoading } from '../../../hook/UseLoading'
import { UseLocalStorage } from '../../../util'
import { SESSION_KEY } from '../../../util/UseLocalStorage'
import axios from 'axios'
import { ApiUrl } from '../../../constant'
import { StatusCodes } from 'http-status-codes'
import { Product } from '../../../interface'

type PublishDialogType = {
    is_open: boolean
    OnCLose: () => void
    pro_id: string
    OnPublished: (product: Product) => void
}
type PublishDateTimeType = {
    date: string
    time: string
}
export const PublishDialog: React.FC<PublishDialogType> = ({
    pro_id,
    is_open,
    OnCLose,
    OnPublished,
}) => {
    const [startDatetime, setStartDateTime] = useState<PublishDateTimeType>(
        (): PublishDateTimeType => {
            const current_date = new Date()
            const month = current_date.getMonth() + 1
            const date = [
                current_date.getFullYear(),
                String(month).padStart(2, '0'),
                current_date.getDate(),
            ].join('-')
            const time = [
                current_date.getHours(),
                current_date.getMinutes(),
            ].join(':')
            return {
                date,
                time,
            }
        }
    )
    const [endDatetime, setEndDateTime] = useState<PublishDateTimeType>(
        (): PublishDateTimeType => {
            const current_date = new Date()
            const month = current_date.getMonth() + 1
            const date = [
                current_date.getFullYear(),
                String(month).padStart(2, '0'),
                current_date.getDate(),
            ].join('-')
            const time = [
                current_date.getHours(),
                current_date.getMinutes(),
            ].join(':')
            return {
                date,
                time,
            }
        }
    )
    const OnPublishClick = () => {
        if (
            !startDatetime.date ||
            !startDatetime.time ||
            !endDatetime.date ||
            !endDatetime.time
        ) {
            enqueueSnackbar('Please enter all field', { variant: 'error' })
            return
        }

        const current_date = new Date()
        const start_date = new Date(startDatetime.date)
        const end_date = new Date(endDatetime.date)
        if (start_date < current_date) {
            enqueueSnackbar('Start date must be greate than current date', {
                variant: 'warning',
            })
            return
        }

        if (end_date < current_date) {
            enqueueSnackbar('End date must be greate than current date', {
                variant: 'warning',
            })
            return
        }

        if (end_date < start_date) {
            enqueueSnackbar(
                'End date must be equal or greate than start date',
                {
                    variant: 'warning',
                }
            )
            return
        }

        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
            return
        }
        UseLoading(true)
        const body = {
            auctionProductId: pro_id,
            start_time: `${startDatetime.date} ${startDatetime.time}`,
            end_time: `${endDatetime.date} ${endDatetime.time}`,
        }

        axios
            .post(ApiUrl.HOST + ApiUrl.OWNER.PUBLISH_PRODUCT, body, {
                headers: { authorization: 'Bearer ' + token },
            })
            .then((res) => {
                UseLoading(false)
                handleClose()
                if (res.data.status != StatusCodes.OK) {
                    enqueueSnackbar('Puslish fail ' + res.data.mess, {
                        variant: 'error',
                    })

                    return
                }
                OnPublished(res.data.product)
                enqueueSnackbar('Puslish successfully!', { variant: 'success' })
            })
    }
    const handleClose = () => {
        OnCLose()
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
            <DialogTitle>Publish</DialogTitle>
            <DialogContent>
                <label style={{ color: 'white', fontWeight: 'bold' }}>
                    Start time
                </label>
                <Stack
                    direction="row"
                    spacing={2}
                    style={{ marginBottom: '1rem' }}
                >
                    <TextField
                        value={startDatetime.date}
                        onChange={(e) =>
                            setStartDateTime({
                                ...startDatetime,
                                date: e.target.value,
                            })
                        }
                        className="pb-4"
                        autoFocus
                        margin="dense"
                        type="date"
                        fullWidth
                        variant="standard"
                        sx={TextFieldLightStyle}
                    />

                    <TextField
                        value={startDatetime.time}
                        onChange={(e) =>
                            setStartDateTime({
                                ...startDatetime,
                                time: e.target.value,
                            })
                        }
                        className="pb-4"
                        autoFocus
                        margin="dense"
                        type="time"
                        fullWidth
                        variant="standard"
                        sx={TextFieldLightStyle}
                    />
                </Stack>
                <label style={{ color: 'white', fontWeight: 'bold' }}>
                    End time
                </label>
                <Stack
                    direction="row"
                    spacing={2}
                    style={{ marginBottom: '1rem' }}
                >
                    <TextField
                        value={endDatetime.date}
                        onChange={(e) =>
                            setEndDateTime({
                                ...endDatetime,
                                date: e.target.value,
                            })
                        }
                        className="pb-4"
                        autoFocus
                        margin="dense"
                        type="date"
                        fullWidth
                        variant="standard"
                        sx={TextFieldLightStyle}
                    />

                    <TextField
                        value={endDatetime.time}
                        onChange={(e) =>
                            setEndDateTime({
                                ...endDatetime,
                                time: e.target.value,
                            })
                        }
                        className="pb-4"
                        autoFocus
                        margin="dense"
                        type="time"
                        fullWidth
                        variant="standard"
                        sx={TextFieldLightStyle}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    loading={false}
                    loadingPosition="start"
                    variant="contained"
                    type="submit"
                    color="success"
                    startIcon={<CheckBoxIC />}
                    sx={LoadingButtonStyle}
                    onClick={OnPublishClick}
                >
                    Publish
                </LoadingButton>
                <Button onClick={handleClose} variant="outlined" color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
