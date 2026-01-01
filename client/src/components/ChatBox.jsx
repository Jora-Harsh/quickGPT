import React, { use, useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

  const containerRef = useRef(null);

  const { selectedChat, theme } = useAppContext()
  const [messages, setMessages] = useState([])

  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState();
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  // Auto Scroll to Bottom on New Message
  useEffect(() => {
    if(containerRef.current){
      containerRef.current.scrollTo ({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  } ,[messages])

  return (
    <div className="flex-1 h-full flex flex-col p-5 md:p-10 xl:px-28 max-md:pt-14 2xl:pr-40">

      {/* CHAT MESSAGES  */}
      <div ref={containerRef} className="flex-1 min-h-0 overflow-y-auto pr-2 pb-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <img
              src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
              alt="QuickGPT"
              className="w-full max-w-56 sm:max-w-68"
            />
            <p className="text-4xl sm:text-5xl text-center text-gray-400 dark:text-white">
              Ask me anything.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Three Dots Loading */}
        {
          loading && <div className='loader flex items-center gap-1.5'>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          </div>
        }

      </div>

        { mode === 'image' && (
          <label htmlFor="" className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
            <p className='text-sm'>Publish Generated Image to Community</p>
            <input type="checkbox" className='cursor-pointer'  checked= {isPublished} onChange={(e)=> setIsPublished(e.target.checked)} />
          </label>
        )}


      {/* Prompt Input Box */}
      <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>
        <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
          <option className='dark:bg-purple-900' value="text">Text</option>
          <option className='dark:bg-purple-900' value="image">Image</option>
        </select>
        <input onChange={(e)=> setPrompt(e.target.value)} value={prompt} type="text" placeholder='Type your prompt here...' className='flex-1 w-full text-sm outline-none' required />

       <button disabled={loading}>
        <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' />
       </button>
      </form>
    </div>
  )
}

export default ChatBox
