import React from "react";

import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLogin, startRegister } from "../../actions/auth";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const [formLoginValues, setLoginFormValue] = useForm({
    lEmail: "email12@test.com",
    lPassword: "123456",
  });

  const dispatch = useDispatch();

  const { lEmail, lPassword } = formLoginValues;

  const [formRegisterValues, setRegisterFormValue] = useForm({
    rName: "",
    rEmail: "",
    rPassword: "",
    rPassword2: "",
  });

  const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (rPassword !== rPassword2) {
      return Swal.fire("Error", "Passwords must be the same", "error");
    }

    dispatch(startRegister(rName, rEmail, rPassword));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-screen my-8 items-center justify-center">
      <div className="max-w-md h-80 flex-1 bg-white-100 mx-4 p-6 rounded-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-sky-500">Sign In</h3>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="input-primary"
            placeholder="Email"
            name="lEmail"
            value={lEmail}
            onChange={setLoginFormValue}
          />
          <input
            type="password"
            className="input-primary"
            placeholder="Password"
            name="lPassword"
            value={lPassword}
            onChange={setLoginFormValue}
          />
          <input type="submit" className="btn-primary" value="Login" />
        </form>
      </div>

      <div className="max-w-md h-80 flex-1 mx-4 p-6 rounded-md bg-sky-500 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-slate-50">Sign up</h3>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="input-primary"
            placeholder="Name"
            name="rName"
            value={rName}
            onChange={setRegisterFormValue}
          />
          <input
            type="email"
            className="input-primary"
            placeholder="Email"
            name="rEmail"
            value={rEmail}
            onChange={setRegisterFormValue}
          />
          <input
            type="password"
            className="input-primary"
            placeholder="Password"
            name="rPassword"
            value={rPassword}
            onChange={setRegisterFormValue}
          />

          <input
            type="password"
            className="input-primary"
            placeholder="Repeat password"
            name="rPassword2"
            value={rPassword2}
            onChange={setRegisterFormValue}
          />

          <input
            type="submit"
            className="btn-secondary"
            value="Create account"
          />
        </form>
      </div>
    </div>
  );
};
