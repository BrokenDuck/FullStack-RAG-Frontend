export interface Question {
  question: string
  rerank: boolean
}

export interface Citation {
  title: string
  text: string
}

export interface Answer {
  answer: string
  citation: Citation[]
}

export interface StreamChunk {
  type: 'response-chunk' | 'citation'
  text: string
  title: string
}
