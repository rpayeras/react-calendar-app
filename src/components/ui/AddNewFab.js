import { PlusIcon } from "@heroicons/react/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(uiOpenModal());
  };

  return (
    <button
      className="absolute right-2 bottom-2 w-12 h-12 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-white hover:text-blue-500 transition-colors"
      onClick={handleClick}
    >
      <PlusIcon className="" />
    </button>
  );
};
