import { IconButton } from '@mui/material'
import { CameraIC } from '../../../assets/icon'
import avt_img from '../../../assets/image/profile.svg'
import { ChangeEvent, useEffect, useState } from 'react'
import { ImagePreview, UseLocalStorage } from '../../../util'
import { ApiUrl } from '../../../constant'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { SESSION_KEY } from '../../../util/UseLocalStorage'
import { User } from '../../../interface'
export const UserInfo = () => {
    const [user, setUser] = useState<User>()
    const upload_avatar = (e: ChangeEvent<HTMLInputElement>) => {
        ImagePreview(
            e,
            (url) => {
                console.log(url)

                const [getLocal] = UseLocalStorage()
                const token: string | null = getLocal(SESSION_KEY)

                const form_data = new FormData()
                const avt_file = document.getElementById(
                    'file_avatar'
                ) as HTMLInputElement
                if (!avt_file?.files) {
                    return
                }

                form_data.append('avatar', avt_file?.files[0])
                axios
                    .put(ApiUrl.HOST + ApiUrl.USER.UPDATE_AVATAR, form_data, {
                        headers: { authorization: 'Bearer ' + token },
                    })
                    .then((res) => {
                        const user: User = res.data
                        if (user.avatar.url != 'default') {
                            enqueueSnackbar('Update avatar success', {
                                variant: 'success',
                            })
                            setUser(user)
                        }
                    })
            },
            () => {}
        )
    }

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
                const user: User = res.data
                setUser(user)
            })
    }, [])

    return (
        <div className="user-box">
            <div className="thumb" style={{ position: 'relative' }}>
                <img
                    src={
                        user?.avatar.url == 'default'
                            ? avt_img
                            : user?.avatar.url
                    }
                    alt="user-imc"
                    style={{ borderRadius: '100%' }}
                />
                <input
                    type="file"
                    id="file_avatar"
                    hidden
                    onChange={upload_avatar}
                />
                <IconButton
                    color="info"
                    style={{
                        position: 'absolute',
                        right: '-5px',
                        bottom: '-20px',
                    }}
                    onClick={() =>
                        document.getElementById('file_avatar')?.click()
                    }
                >
                    <CameraIC fontSize="large" color="info" />
                </IconButton>
            </div>
            <div className="content">
                <h5>
                    <a href="#">{user?.full_name}</a>
                </h5>
                <span>{user?.email}</span>
            </div>
        </div>
    )
}
