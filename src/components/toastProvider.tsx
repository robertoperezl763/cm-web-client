"use client";

import { ToastContainer } from "react-toastify";


interface ToastProviderProps {
    children: React.ReactNode;
}

const ToastProvider = ({children}: ToastProviderProps) => {
    const contextClass = {
        success: "bg-green5",
        error: "bg-red5",
        info: "bg-grey5",
        warning: "bg-yellow5",
        default: "bg-pink5",
        dark: "bg-white font-grey5",
    }

    return (
        <>
        {children}
        <ToastContainer 
        toastClassName={(context) =>
            contextClass[context?.type || "default"] +
            " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          }
        bodyClassName={() => "text-sm font-white font-md block p-3"}
        position="bottom-left"
        autoClose={2000}
        />
        </>
    )

}

export default ToastProvider