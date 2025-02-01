import * as Tooltip from '@radix-ui/react-tooltip'
import { Citation } from '@utils/types'
import Markdown from 'react-markdown'

interface CitationProps {
  citation: Citation
  idx: number
}

const CitationComponent = ({ citation, idx }: CitationProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {idx}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-sm rounded-md border border-gray-300 bg-white p-2 text-gray-900 shadow-lg"
            side="top"
            sideOffset={5}
          >
            <span className="font-semibold">{citation.title}:</span>{' '}
            <Markdown>{citation.text}</Markdown>
            <Tooltip.Arrow className="fill-gray-300" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default CitationComponent
