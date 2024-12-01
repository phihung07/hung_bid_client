import { useState } from 'react'
import { UseLoading } from '../hook/UseLoading.ts'
import axios from 'axios'
import { ApiUrl, Time } from '../constant'
import { StatusCodes } from 'http-status-codes'
import { UseLocalStorage } from '../util'
import { SESSION_KEY, USER_ID_KEY } from '../util/UseLocalStorage.ts'
type LoginResponseType = {
    token: string
    role: string
    user_id: string
    status: number
}
export const LoginPopup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const onLoginClicked = () => {
        const Validate = (): boolean => {
            if (email.length == 0) {
                setError('Email is required')
                return false
            }

            if (password.length == 0) {
                setError('Password is required')
                return false
            }

            return true
        }

        if (Validate()) {
            setError('')
            UseLoading(true)
            const body = { email, password }
            setTimeout(() => {
                axios
                    .post(ApiUrl.HOST + ApiUrl.SECURITY.LOGIN, body)
                    .then((res) => {
                        UseLoading(false)
                        const data: LoginResponseType = res.data
                        if (data.status != StatusCodes.OK) {
                            setError('Email or password is invalid')
                            return
                        }

                        const [, saveLocal] = UseLocalStorage()
                        saveLocal(SESSION_KEY, data.token)
                        saveLocal(USER_ID_KEY, data.user_id)
                        document.location.reload()
                    })
            }, Time.DELAY_API)
        }
    }
    return (
        <div className="opent-code">
            <div className="popup-container">
                <div className="register-from">
                    <div className="head">
                        <h4>Welcome Back!</h4>
                        <p>
                            We're so excited to see you again! Log In to your
                            HungBid Account
                        </p>
                    </div>
                    <form>
                        <div className="items">
                            <div className="form-input">
                                <label htmlFor="email" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <div className="items">
                            <label
                                htmlFor="password-field3"
                                className="form-label"
                            >
                                Password
                            </label>
                            <div className="form-group">
                                <input
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    id="password-field3"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                />
                            </div>
                        </div>
                        <p style={{ color: 'red', textAlign: 'center' }}>
                            {error}
                        </p>
                        <div className="items">
                            <button
                                onClick={onLoginClicked}
                                type="button"
                                className="cmn--btn repopup"
                            >
                                Login
                            </button>
                            <p className="ptext text-center  mt-2 mb-0 text-white">
                                Don't have an account?
                                <a
                                    onClick={() => {}}
                                    className="text-base-2 ms-3 repopup cd-popup-close"
                                >
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
