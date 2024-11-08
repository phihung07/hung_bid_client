import { useState } from 'react'
import { UseLoading } from '../hook/UseLoading.ts'
import { ApiUrl, Time } from '../constant'
import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { enqueueSnackbar } from 'notistack'

export const RegisterPopup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [error, setError] = useState('')
    const OnRegisterClicked = () => {
        const ValidateData = (): boolean => {
            if (fullName.length < 5) {
                setError(
                    'Full Name is required and must be at least 5 characters.'
                )
                return false
            }

            const email_pattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const is_valid_email = email_pattern.test(email)
            if (!is_valid_email) {
                setError('Invalid email address')
                return false
            }

            if (password.length < 8) {
                setError('Password must be at least 8 characters long')
            }
            if (password != confirmPassword) {
                setError('Passwords must match')
            }

            setError('')
            return true
        }

        if (ValidateData()) {
            UseLoading(true)
            const body = {
                full_name: fullName,
                email,
                password,
                confirm_password: confirmPassword,
            }
            setTimeout(() => {
                axios
                    .post(ApiUrl.HOST + ApiUrl.SECURITY.REGISTER, body)
                    .then((res) => {
                        UseLoading(false)
                        if (res.data.status == StatusCodes.OK) {
                            enqueueSnackbar('Register success!', {
                                variant: 'success',
                            })
                            const register_form =
                                document.getElementsByClassName('cd-popup')[0]
                            register_form.classList.remove('is-visible')
                            setEmail('')
                            setPassword('')
                            setError('')
                            setConfirmPassword('')
                            setFullName('')
                        } else if (res.data.status == StatusCodes.BAD_REQUEST) {
                            setError(res.data.mess)
                        } else {
                            setError('something went wrong')
                        }
                    })
            }, Time.DELAY_API)
        }
    }
    return (
        <div className="cd-popup" role="dialog">
            <div className="cd-popup-container">
                <div className="register-from">
                    <div className="head">
                        <h4>Create Account</h4>
                        <p>Sign Up to HungBid!</p>
                    </div>
                    <form>
                        <div className="items">
                            <div className="form-input">
                                <label
                                    htmlFor="full_name"
                                    className="form-label"
                                >
                                    Full Name
                                </label>
                                <input
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    type="text"
                                    id="full_name"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>
                        <div className="items">
                            <div className="form-input">
                                <label htmlFor="address" className="form-label">
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="address"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <div className="items">
                            <label
                                htmlFor="password-field"
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
                                    id="password-field"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                />
                            </div>
                        </div>
                        <div className="items">
                            <label
                                htmlFor="password-field2"
                                className="form-label"
                            >
                                Confirm Password
                            </label>
                            <div className="form-group">
                                <input
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
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
                                type="button"
                                className="cmn--btn"
                                onClick={OnRegisterClicked}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
