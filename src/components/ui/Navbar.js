import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { eventLogout } from "../../actions/calendar";
import { LogoutIcon } from "@heroicons/react/solid";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(eventLogout());
    dispatch(startLogout());
  };

  return (
    <div className="shadow-md px-2 py-2 flex justify-between items-center mb-4">
      <span className="text-slate-500 font-bold">Welcome {name}</span>

      <button
        className="flex items-center border border-red-500 text-red-500 text-bold bg-transparent px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition-colors"
        onClick={handleLogout}
      >
        <LogoutIcon className="w-4 h-4" />
        Exit
      </button>
    </div>
  );
};
