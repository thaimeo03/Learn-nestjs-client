export interface IAddBookBody {
  id: string
  name: string
  author: string
  pages: number
  image?: string
}

export interface IBookResponse {
  id: string
  name: string
  author: string
  pages: number
  image?: string
  // more...
}

export interface IBookEditMode {
  state: boolean
  data: IBookResponse | null
}

export interface MessageResponse {
  message: string
}
