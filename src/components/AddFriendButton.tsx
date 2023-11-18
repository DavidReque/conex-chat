'use client'

import { addFriendValidator } from "@/app/lib/validations/add-friend";
import { Button, Input } from "@nextui-org/react";
import axios, { AxiosError } from 'axios'
import { useState } from "react";
import {z} from 'zod';
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
 
export default function AddFriendButton() {
  const [showSuccesState, setSetshowSuccesState] = useState<boolean>(false)

  type FormData = z.infer<typeof addFriendValidator>

  const {
    register, handleSubmit, setError, formState: {errors}
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  })

  async function addFriend(email:string) {
    try {
      const validateEmail = addFriendValidator.parse({email})

      await axios.post('/api/friends/add', {
        email: validateEmail
      })
      
      setSetshowSuccesState(true)

    } catch (error) {
      if (error instanceof z.ZodError) {
        setError('email', {message: error.message})
        return
      }

      if (error instanceof AxiosError) {
        setError('email', {message: error.response?.data})
        return
      }
      
      setError('email', {message: 'Something went wrong'})

      console.error(error);
    }
  }

  const onSubmit = (data: FormData) => {
    addFriend(data.email)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md p-4">
      <h2 className="text-2xl my-5">Add a friend by E-mail</h2>
      <div className="space-y-4">
        <Input
          {...register('email')}
          type="email"
          variant="flat"
          label="Email"
          color="success"
        />
        <Button
          type="submit"
          className="py-6"
          color="success"
          variant="bordered"
          startContent={
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            </>
          }
        >
          Add
        </Button>
        <p className="text-red-500">{errors.email?.message}</p>
        {showSuccesState ? (
          <p className="text-green-500">Friend request sent</p>
        ) : null}
      </div>
    </form>
  );
}
