const BASE_URL = import.meta.env.VITE_API_URL

import { Question, Answer, StreamChunk } from './types'

import { fetchEventSource } from '@microsoft/fetch-event-source'

export async function query(question: Question): Promise<Answer> {
  const res = await fetch(BASE_URL + '/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(question)
  })
  const data = await res.json()
  if (!res.ok) {
    return Promise.reject({ status: res.status, data })
  }
  return data
}

export async function stream(
  question: Question,
  setter: (chunk: StreamChunk) => void
) {
  await fetchEventSource(`${BASE_URL}/stream`, {
    method: 'POST',
    headers: {
      Accept: 'text/event-stream',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(question),
    async onopen(res) {
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        console.log('Client-side error ', res)
      }
    },
    onmessage(event) {
      const parsedData = JSON.parse(event.data)
      setter(parsedData)
    },
    onerror(err) {
      console.log('There was an error from server', err)
    }
  })
}

export async function upload(fileList: File[]) {
  const formData = new FormData()

  // Append each file to the formData object
  fileList.forEach((file) => {
    formData.append('files', file)
  })

  try {
    const response = await fetch(BASE_URL + '/uploadfiles', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Upload failed: ${errorData.detail}`)
    }

    console.log('Files uploaded successfully!')
  } catch (error) {
    console.error('Error uploading files:', error)
  }
}
