import { IAddBookBody, IBookResponse, MessageResponse } from '@/interfaces/books.interface'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9999'
})

export const getAllBooksApi = async () => {
  const res = await axiosInstance.get<IBookResponse[]>('/books')

  return res.data
}

export const addBookApi = async (body: IAddBookBody) => {
  const res = await axiosInstance.post<MessageResponse>('/books', body)

  return res.data
}

export const updateBookApi = async ({ id, body }: { id: string; body: IAddBookBody }) => {
  const res = await axiosInstance.put<MessageResponse>(`/books/${id}`, body)
  return res.data
}

export const deleteBookApi = async (id: string) => {
  const res = await axiosInstance.delete<MessageResponse>(`/books/${id}`)
  return res.data
}
