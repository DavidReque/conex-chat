'use client'

import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

export default function Provider({children}: {children: ReactNode}) {
  return (
    <>
        <Toaster position="top-center" reverseOrder={false}/>
        {children}
    </>
  )
}
