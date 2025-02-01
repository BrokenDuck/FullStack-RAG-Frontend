import { useState } from 'react'
import { useImmer } from 'use-immer'

import { stream } from '@utils/api'
import { StreamChunk, Citation } from '@utils/types'

import ChatMessages from '@components/ChatMessages'
import ChatInput from '@components/ChatInput'

export interface Message {
  role: 'user' | 'assistant'
  content: string
  loading?: boolean
  error?: boolean
  citations: Citation[]
}

function ChatBot() {
  const [messages, setMessages] = useImmer<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [advanced, setAdvanced] = useState<boolean>(false)

  const isLoading = messages.length > 0 && messages[messages.length - 1].loading

  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim()
    if (!trimmedMessage || isLoading) return

    setMessages((draft) => [
      ...draft,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: '', loading: true, citations: [] }
    ])
    setNewMessage('')

    const setter = (chunk: StreamChunk) => {
      if (chunk.type === 'response-chunk') {
        setMessages((draft) => {
          draft[draft.length - 1].content += chunk.text
        })
      } else if (chunk.type === 'citation') {
        setMessages((draft) => {
          draft[draft.length - 1].citations.push({
            title: chunk.title,
            text: chunk.text
          })
        })
      }
    }

    try {
      await stream({ question: trimmedMessage, rerank: advanced }, setter)
      setMessages((draft) => {
        draft[draft.length - 1].loading = false
      })
    } catch (err) {
      console.log(err)
      setMessages((draft) => {
        draft[draft.length - 1].loading = false
        draft[draft.length - 1].error = true
      })
    }
  }

  return (
    <div className="relative flex grow flex-col gap-6">
      {messages.length === 0 && (
        <div className="mt-3 space-y-2 font-urbanist text-xl font-light text-primary-blue">
          <p>👋 Welcome!</p>
        </div>
      )}
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
        setAdvanced={setAdvanced}
      />
    </div>
  )
}

export default ChatBot
