import Markdown from 'react-markdown'
import useAutoScroll from '@hooks/useAutoScroll'
import Spinner from '@components/Spinner'
import userIcon from '@assets/user.svg'
import errorIcon from '@assets/error.svg'
import CitationComponent from '@components/Citations'
import { Message } from '@components/ChatBot'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean | undefined
}

function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollContentRef = useAutoScroll(isLoading)

  return (
    <div ref={scrollContentRef} className="grow space-y-4">
      {messages.map(({ role, content, loading, error, citations }, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-4 rounded-xl px-3 py-4 ${
            role === 'user' ? 'bg-primary-blue/10' : ''
          }`}
        >
          {role === 'user' && (
            <img className="size-[26px] shrink-0" src={userIcon} alt="user" />
          )}
          <div>
            <div className="markdown-container">
              {loading && !content ? (
                <Spinner />
              ) : role === 'assistant' ? (
                <>
                  <Markdown>{content}</Markdown>
                  {citations.map((citation, idx) => (
                    <CitationComponent
                      key={idx}
                      idx={idx}
                      citation={citation}
                    />
                  ))}
                </>
              ) : (
                <div className="whitespace-pre-line">{content}</div>
              )}
            </div>
            {error && (
              <div
                className={`flex items-center gap-1 text-sm text-error-red ${
                  content && 'mt-2'
                }`}
              >
                <img className="size-5" src={errorIcon} alt="error" />
                <span>Error generating the response</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatMessages
