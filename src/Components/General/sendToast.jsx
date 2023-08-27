import { toast } from "react-toastify";
import React from "react";

export const setErrorToast = (httpcode) => {
  // // console.log(httpcode);
  if (httpcode === 500) {
    toastErrorStatus("Something went wrong. Try Again!!");
  } else if (httpcode === 401) {
    toastErrorStatus("Invalid credentials!!");
  } else if (httpcode === 400) {
    toastErrorStatus("Incomplete Details!!");
  }
};

export const toastSuccessStatus = (message) => {
  toast.success(message, {
    closeOnClick: true,
    theme: "dark",
    autoClose: 3000,
    hideProgressBar: false,
    position: "top-right",
    pauseOnHover: false,
  });
};
export const toastErrorStatus = (message) => {
  toast.error(message, {
    closeOnClick: true,
    theme: "dark",
    autoClose: 3000,
    hideProgressBar: false,
    position: "top-right",
    pauseOnHover: false,
  });
};
