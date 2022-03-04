import React from 'react';
import './login.css';

import {useForm} from '../../hooks/useForm'
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
    const [formLoginValues, setLoginFormValue] = useForm({
        lEmail: "email12@test.com",
        lPassword: "1234test"
    })

    const dispatch = useDispatch()

    const {lEmail, lPassword} = formLoginValues;

    const [formRegisterValues, setRegisterFormValue] = useForm({
        rName: "User",
        rEmail: "email999@test.com",
        rPassword: "1234test",
        rPassword2: "1234test"
    })

    const {rName, rEmail, rPassword, rPassword2} = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault()
        
        dispatch(startLogin(lEmail, lPassword))
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if(rPassword !== rPassword2){
            return Swal.fire('Error', 'Passwords must be the same', 'error')
        }

        dispatch(startRegister(rName, rEmail, rPassword))
        
        console.log(formRegisterValues);
    }

    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Sign In</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="lEmail"
                                value={lEmail}
                                onChange={setLoginFormValue}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="lPassword"
                                value={lPassword}
                                onChange={setLoginFormValue}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign up</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="rName"
                                value={rName}
                                onChange={setRegisterFormValue}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={rEmail}
                                onChange={setRegisterFormValue}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name="rPassword"
                                value={rPassword}
                                onChange={setRegisterFormValue}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password" 
                                name="rPassword2"
                                value={rPassword2}
                                onChange={setRegisterFormValue}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}