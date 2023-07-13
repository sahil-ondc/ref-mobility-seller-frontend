import { createContext, useContext, useState } from 'react'

const AppContext = createContext<any>('defaultValue')

const AppProvider = ({ children }: any) => {
  const [payloadData, setPayloadData] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [urls, setUrls] = useState<any>([])

  return (
    <AppContext.Provider value={{ payloadData, setPayloadData, setUserInfo, userInfo, urls, setUrls }}>
      {children}
    </AppContext.Provider>
  )
}
const usePostContext = () => {
  return useContext(AppContext)
}

export { AppProvider, AppContext, usePostContext }
