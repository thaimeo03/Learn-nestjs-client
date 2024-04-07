'use client'
import { useState } from 'react'
import BookForm from './components/book-form'
import BookList from './components/book-list'
import { IBookEditMode, IBookResponse } from '@/interfaces/books.interface'

export default function Books() {
  const [isEditMode, setIsEditMode] = useState<IBookEditMode>({
    state: false,
    data: null
  })

  const handleChangeEditMode = (state: boolean, data: IBookResponse | null) => {
    setIsEditMode({
      state,
      data
    })
  }

  return (
    <div className='h-full'>
      <div className='mt-4 h-full'>
        <div className='grid grid-cols-2 h-full'>
          <div className='col-span-2 md:col-span-1 border p-2'>
            <BookList handleChangeEditMode={handleChangeEditMode} />
          </div>

          <div className='col-span-2 md:col-span-1 border'>
            <BookForm isEditMode={isEditMode} handleChangeEditMode={handleChangeEditMode} />
          </div>
        </div>
      </div>
    </div>
  )
}
