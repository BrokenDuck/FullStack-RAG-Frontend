import { Link } from 'react-router'

import logo from '@assets/logo.svg'

const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex shrink-0 flex-row justify-between bg-white">
      <div className="flex flex-col gap-1 pb-2 pt-4">
        <a href="/">
          <img src={logo} className="w-32" alt="logo" />
        </a>
        <h1 className="font-urbanist text-[1.65rem] font-semibold">
          AI Chatbot
        </h1>
      </div>
      <Link
        className="top-1/2 inline-flex items-center font-urbanist text-[1.3rem] no-underline transition duration-200 hover:underline"
        to="/upload"
      >
        Upload Files
      </Link>
    </header>
  )
}

export default Header
