import { useMutation } from 'react-query'
import axiosInstance from 'services/axiosInstance'
import { IParams } from 'interfaces'

const post = async ({ url, payload, config = {} }: IParams) => {
  const { data } = await axiosInstance.post(url, payload, config)
  return data
}

const usePost = () => useMutation(post)

export default usePost
