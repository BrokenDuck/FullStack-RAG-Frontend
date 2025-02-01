import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { upload } from '@utils/api'

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true
  })

  const handleUpload = () => {
    if (files.length > 0) {
      upload(files)
    }
  }

  return (
    <div className="bg-gray-100 p-6">
      <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700">
          Upload Documents
        </h2>
        <p className="text-sm text-gray-500">
          Drag and drop files or click to select.
        </p>

        <div
          {...getRootProps()}
          className="mt-4 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:bg-gray-50"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <span className="text-gray-600">Drop the files here...</span>
          ) : (
            <span className="text-gray-600">
              Drag & drop files here, or click to select
            </span>
          )}
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Selected Files</h3>
            <ul className="mt-2 space-y-1">
              {files.map((file, index) => (
                <li key={index} className="truncate text-sm text-gray-700">
                  {file.name}
                </li>
              ))}
            </ul>
            <button
              onClick={handleUpload}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Upload Files
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUpload
