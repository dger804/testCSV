
import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import './App.css'
import { uploadFile } from './services/upload'
import { type Data } from './types'

const APP_STATUS = {
  IDLE: 'idle', // starting point
  ERROR: 'error', // when error exist
  READY_UPLOAD: 'ready_upload', // choosen file
  UPLOADING: 'uploading', // uploading file
  READY_USAGE: 'ready_usage' // uploaded file
} as const
const BUTTON_TEXT = {
  [APP_STATUS.READY_UPLOAD]: 'Subir Archivo',
  [APP_STATUS.UPLOADING]: 'Subiendo ...',
}

type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS]

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE)
  const [data, setData] = useState<Data>()
  const [file, setFile] = useState<File | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? []

    if (file) {
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      return
    }

    setAppStatus(APP_STATUS.UPLOADING)

    const [err, newData] = await uploadFile(file)

    if (err) {
      setAppStatus(APP_STATUS.ERROR)
      toast.error(err.message)
      return
    }

    console.log({ newData })

    setAppStatus(APP_STATUS.READY_USAGE)
    if (newData) setData(newData)
    toast.success('Archivo subido correctamente')
  }
  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING

  return (
    <>
      <Toaster />
      <h4>Challenge: Upload CSV + Search</h4>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            disabled={appStatus === APP_STATUS.UPLOADING}
            onChange={handleInputChange}
            name='file'
            type="file"
            accept='.csv'
          />
        </label>
        {
          showButton && (
            <button
              disabled={appStatus === APP_STATUS.UPLOADING}
            >
              {BUTTON_TEXT[appStatus]}
            </button>
          )
        }
      </form>
    </>
  )
}

export default App
