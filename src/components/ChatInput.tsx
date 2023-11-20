'use client'

import axios from 'axios'
import React, { FC, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'
import ButtonVariants from './ButtonVariants'

interface ChatInputProps {
  chatPartner: User
  chatId: string
}

const ChatInput: FC<ChatInputProps> = ({chatPartner, chatId}) => {

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function sendMessage() {
    if (!input) {
      return 
    }

    setIsLoading(true)

    try {
      await axios.post('/api/message/send', { text: input, chatId })
      setInput('')
      textareaRef.current?.focus()
    } catch (error) {
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  } 

  return (
    <div className='border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0'>
      <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
          <TextareaAutosize ref={textareaRef} onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          placeholder={`Message ${chatPartner.name}`}
          className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:leading-6'
          />

          <div 
          onClick={() => textareaRef.current?.focus()} 
          className='py-2'
          aria-hidden>
              <div className='py-px'>
                <div className='h-9'/>
              </div>
          </div>

          <div className='absolute ring-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
            <div className='flex-shrink-0'>
            <ButtonVariants className='bg-indigo-500 hover:bg-indigo-400' isLoading={isLoading} onClick={sendMessage} type='submit'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

            </ButtonVariants>

            </div>
          </div>
      </div>
    </div>
  )
}

export default ChatInput
