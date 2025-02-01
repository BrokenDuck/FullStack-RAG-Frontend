import useAutosize from '@hooks/useAutoSize'
import sendIcon from '@assets/send.svg'
import brainIcon from '@assets/brain.svg'
import React, { SetStateAction } from 'react'

interface ChatInputProps {
  newMessage: string
  isLoading: boolean | undefined
  setNewMessage: React.Dispatch<SetStateAction<string>>
  submitNewMessage: () => Promise<void>
  setAdvanced: React.Dispatch<SetStateAction<boolean>>
}

function ChatInput({
  newMessage,
  isLoading,
  setNewMessage,
  submitNewMessage,
  setAdvanced
}: ChatInputProps) {
  const textareaRef = useAutosize(newMessage)

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (['Enter', 'NumpadEnter'].includes(e.key) && !e.shiftKey && !isLoading) {
      e.preventDefault()
      submitNewMessage()
    }
  }

  return (
    <div className="sticky bottom-0 bg-white py-4">
      <div className="animate-chat duration-400 font-mono z-50 origin-bottom rounded-3xl bg-primary-blue/35 p-1.5">
        <div className="relative shrink-0 overflow-hidden rounded-3xl bg-white pr-0.5 ring-1 ring-primary-blue transition-all focus-within:ring-2">
          <textarea
            className="block max-h-[140px] w-full resize-none rounded-3xl bg-white px-4 py-2 pr-11 placeholder:-translate-y-1 placeholder:leading-4 placeholder:text-primary-blue focus:outline-none sm:placeholder:translate-y-0 sm:placeholder:leading-normal"
            ref={textareaRef}
            rows={1}
            value={newMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewMessage(e.target.value)
            }
            onKeyDown={handleKeyDown}
          />
          <button
            className="absolute right-12 top-1/2 flex -translate-y-1/2 flex-row gap-1 rounded-md bg-primary-blue/20 p-1 hover:bg-primary-blue/40"
            onClick={() => setAdvanced((advanced) => !advanced)}
          >
            Think Deeper <img src={brainIcon} alt="brain" />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-primary-blue/20 p-1 hover:bg-primary-blue/40"
            onClick={submitNewMessage}
          >
            <img src={sendIcon} alt="send" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
