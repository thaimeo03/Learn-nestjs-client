import axios from 'axios'
import { IGeminiContent } from '../interfaces/gemini.interface'

const axiosInstance = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com'
})

export const sendMessageGeminiApi = async (content: IGeminiContent) => {
  const res = await axiosInstance.post(
    '/v1beta/models/gemini-pro:generateContent?key=AIzaSyA-j7O73EbcXsDLTzDy2g90yWdjBsDUsdU',
    content
  )

  return res.data
}
