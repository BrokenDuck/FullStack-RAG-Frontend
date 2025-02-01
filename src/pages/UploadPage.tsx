import Header from '@components/Header'
import FileUpload from '@components/FileUpload'

const UploadPage = () => {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4">
      <Header />
      <FileUpload />
    </div>
  )
}

export default UploadPage
