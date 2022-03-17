import Swal from "sweetalert2";
import { fetchNoToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        try{
            const res = await fetchNoToken('auth', {email, password}, 'POST')
            const {ok, data, msg} = await res.json()

            if(ok){
                const {name, uid, token} = data;

                localStorage.setItem('token', token)
                localStorage.setItem('token-created', new Date().getTime())
                
                dispatch(login({
                    uid,
                    name
                }))
            } else {
                Swal.fire('Error',msg, 'error')
            }
        } catch(err){
            Swal.fire('Error', err, 'error')
        }
    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        try{
            const res = await fetchNoToken('auth/new', {name, email, password}, 'POST')
            const {ok, data, msg, errors} = await res.json()
            let errMsg = '';
            
            if(errors){
                errors.forEach(({msg}, idx) => {
                    errMsg += `\n${idx}: ${msg} \n`
                })
            }

            if(ok){
                const {name, uid, token} = data;

                localStorage.setItem('token', token)
                localStorage.setItem('token-created', new Date().getTime())
                
                dispatch(register({
                    uid,
                    name
                }))
            } else {
                Swal.fire('Error', errMsg, 'error')
            }
        } catch(err){
            Swal.fire('Error', err, 'error')
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        try{
            const res = await fetchWithToken('auth/renew')
            const {ok, data, msg} = await res.json()

            if(ok){
                const {name, uid, token} = data;

                localStorage.setItem('token', token)
                localStorage.setItem('token-created', new Date().getTime())
                
                dispatch(login({
                    uid,
                    name
                }))
            } else {
                console.log(msg)
                //Swal.fire('Error', msg, 'error')
            }

            dispatch(checkingFinish())
        } catch(err){
            console.log(err)
            dispatch(checkingFinish())
            // Swal.fire('Error', err, 'error')
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(logout())
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

export const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const register = (user) => ({
    type: types.authRegister,
    payload: user
})

export const logout = () => ({
    type: types.authLogout
})
