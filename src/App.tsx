import React, { useState } from 'react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'
import axiosInstance from 'services/axiosInstance'
import Routes from 'routes'
import './App.css'
import { AppProvider } from 'context/payloadContext'
import ERROR_CODE from 'constants/error'
import APIS from 'constants/api'
import Modal from 'components/Modal'
import Spinner from 'components/Loader'
import SuccessfulModal from 'views/successfulModal'

const App = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(false)

  const showError = async (message: string, logout: boolean = false) => {
    toast.dismiss()
    if (logout)
      toast.error(message, {
        onClose: () => {
          toast.dismiss()
          window.localStorage.clear()
          window.location.reload()
        },
      })
    else toast.error(message)
  }

  //Global Success Modal
  const showSuccess = (message: string, sendtohome: boolean) => {
    setIsSuccess(true)
    setRedirect(sendtohome)
    setSuccessMessage(message)
  }

  //Global Api Error Handling
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: async (error: any) => {
            if (error.config.url === APIS.GET_PROFILE_INFO) {
              showError(error?.response?.data?.error, true)
            } else {
              showError(error?.response?.data?.error)
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: async (error: any) => {
            switch (error?.response?.status) {
              case ERROR_CODE.UN_AUTHORIZED_ACCESS:
                showError(error?.response?.data?.error)
                return
              default:
                showError(error?.response?.data?.error)
                break
            }
          },
          onSuccess: async (data: any) => {
            if (data?.message) {
              showSuccess(data?.message, data?.redirect || false)
            }
          },
        }),
      }),
  )

  //Global Loader
  axiosInstance.interceptors.request.use((config) => {
    setLoading(true)
    return config
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      setLoading(false)
      return response
    },
    (error) => {
      setLoading(false)
      throw error
    },
  )

  return (
    <QueryClientProvider client={queryClient}>
      {loading && <Spinner />}
      <AppProvider>
        <ToastContainer />
        <Routes />
      </AppProvider>
      <Modal isOpen={isSuccess ? true : false}>
        <SuccessfulModal
          showModal={(action: boolean) => setIsSuccess(action)}
          modalData={{
            heading: 'Successful',
            detail: successMessage,
          }}
          action={redirect}
        />
      </Modal>
    </QueryClientProvider>
  )
}

export default App
