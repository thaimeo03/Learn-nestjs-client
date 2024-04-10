import { IAddBookBody, IBookResponse, MessageResponse } from '@/interfaces/books.interface'
import { IUploadImageResponse } from '@/interfaces/medias.interface'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9999'
})

export const uploadImageApi = async (body: File) => {
  const bodyFormData = new FormData()

  bodyFormData.append('image', body)

  const res = await axiosInstance.post<IUploadImageResponse>('/medias/upload-image', bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}
