import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../lib/auth'
import { logout } from '../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            className='inline-block cursor-pointer px-6 py-2 hover:bg-zinc-100 hover:text-black transition duration-200 rounded-full'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn