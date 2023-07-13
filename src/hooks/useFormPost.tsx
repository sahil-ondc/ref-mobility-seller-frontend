import { useMutation } from 'react-query'
import workForceInstance from 'services/axiosInstance'
import { IParam } from 'interfaces'

const post = async ({ url, payload, formData }: IParam) => {
  const authToken = localStorage.getItem('accessToken') || ''
  const data = await workForceInstance.post(url, payload, {
    headers: { authorization: authToken, 'Content-Type': formData },
  })
  return data
}

const useFormPost = () => useMutation(post)

export default useFormPost
