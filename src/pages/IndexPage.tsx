import ChatBot from '@components/ChatBot'
import Header from '@components/header'

const IndexPage = () => {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4">
      <Header />
      <ChatBot />
    </div>
  )
}

export default IndexPage
