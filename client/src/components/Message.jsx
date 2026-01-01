import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Prism from 'prismjs'

const Message = ({ message }) => {


  useEffect(() => {
    Prism.highlightAll()
  }, [message.content])


  const isImage =
    typeof message.content === 'string' &&
    /\.(jpg|jpeg|png)$/i.test(message.content)

  return (
    <div className="my-4 w-full">
      {/* USER MESSAGE */}
      {message.role === 'user' ? (
        <div className="flex w-full max-w-4xl justify-end gap-2 px-4">
          <div className="max-w-[520px] p-3 rounded-lg bg-[#57317C]/30 text-sm leading-relaxed">
            <p>{message.content}</p>
            <span className="block mt-1 text-[11px] text-gray-400 text-right">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          <img
            src={assets.user_icon}
            alt="user"
            className="w-8 h-8 rounded-full"
          />
        </div>
      ) : (
        /* AI MESSAGE */
        <div className="flex w-full justify-start px-4">
          <div className="flex flex-col items-start gap-2">
            {isImage ? (
              <img
                src={message.content}
                alt="generated"
                className="max-w-[640px] max-h-[55vh] rounded-xl border object-contain"
              />
            ) : (
              <div
                className="
                  max-w-[65%]
                  p-3
                  rounded-xl
                  bg-[#57317C]/10
                  text-sm
                  leading-relaxed
                  break-words

                  [&_ul]:list-disc
                  [&_ol]:list-decimal
                  [&_ul]:pl-5
                  [&_ol]:pl-5
                  [&_li]:mb-1
                  
                  [&_pre]:overflow-x-auto
                  [&_pre]:whitespace-pre-wrap
                  [&_code]:break-words

                "
              >
                <Markdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </Markdown>
              </div>
            )}

            <span className="text-[11px] text-gray-400 ml-1">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
