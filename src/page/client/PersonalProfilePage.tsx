import { useEffect, useState } from 'react'
import { SaveIC } from '../../assets/icon'
import { ApiUrl } from '../../constant'
import axios from 'axios'
import { UseLocalStorage } from '../../util'
import { SESSION_KEY } from '../../util/UseLocalStorage'
import { enqueueSnackbar } from 'notistack'
import { User } from '../../interface'
import { LoadingButtonStyle } from '../../theme'
import { LoadingButton } from '@mui/lab'

export const PersonalProfilePage = () => {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        if (!token) {
            enqueueSnackbar('You must be login', { variant: 'error' })
            return
        }
        axios
            .get(ApiUrl.HOST + ApiUrl.USER.VIEW_PROFILE, {
                headers: { authorization: 'Bearer ' + token },
            })
            .then((res) => {
                setUser(res.data)
            })
    }, [])

    const [isLoading, setIsloading] = useState(false)
    const OnUpdateProfile = () => {
        let is_valid = true
        if (!user?.full_name) {
            enqueueSnackbar('Full name is required', { variant: 'warning' })
            is_valid = false
        }

        if (!user?.phone) {
            enqueueSnackbar('Phone is required', { variant: 'warning' })
            is_valid = false
        }

        if (!Number(user?.phone)) {
            enqueueSnackbar('Phone must be number', { variant: 'warning' })
            is_valid = false
        }

        if (!user?.address) {
            enqueueSnackbar('Address is required', { variant: 'warning' })
            is_valid = false
        }

        if (!is_valid) {
            return
        }
        setIsloading(true)
        const [getLocal] = UseLocalStorage()
        const token: string | null = getLocal(SESSION_KEY)
        const body = {
            full_name: user?.full_name,
            address: user?.address,
            phone: user?.phone,
        }
        axios
            .put(ApiUrl.HOST + ApiUrl.USER.UPDATE, body, {
                headers: { authorization: 'Bearer ' + token },
            })
            .then((res) => {
                setIsloading(false)
                console.log(res.data)
                enqueueSnackbar('Update success', { variant: 'success' })
            })
    }
    return (
        <>
            <div className="personal-profile-inner">
                <h5 className="title pb-3">Personal Profile</h5>
                <div className="profile-items">
                    <h6 className="title">Email</h6>
                    <input
                        type="text"
                        className="my-input"
                        readOnly
                        value={user?.email}
                    />
                </div>
                <div className="profile-items">
                    <h6 className="title">Full name</h6>
                    <input
                        onChange={(e) =>
                            setUser((user): User => {
                                return {
                                    ...user,
                                    full_name: e.target.value,
                                } as User
                            })
                        }
                        value={user?.full_name}
                        type="text"
                        className="my-input"
                    />
                </div>
                <div className="profile-items">
                    <h6 className="title">Phone</h6>
                    <input
                        onChange={(e) =>
                            setUser((user): User => {
                                return {
                                    ...user,
                                    phone: e.target.value,
                                } as User
                            })
                        }
                        value={user?.phone}
                        placeholder={user?.phone ?? 'update now'}
                        type="text"
                        className="my-input"
                    />
                </div>
                <div className="profile-items">
                    <h6 className="title">Address</h6>
                    <input
                        type="text"
                        onChange={(e) =>
                            setUser((user): User => {
                                return {
                                    ...user,
                                    address: e.target.value,
                                } as User
                            })
                        }
                        placeholder={user?.address ?? 'update now'}
                        value={user?.address}
                        className="my-input"
                    />
                </div>
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="start"
                    variant="contained"
                    type="submit"
                    color="success"
                    startIcon={<SaveIC />}
                    sx={LoadingButtonStyle}
                    onClick={OnUpdateProfile}
                >
                    Update
                </LoadingButton>
            </div>
        </>
    )
}
