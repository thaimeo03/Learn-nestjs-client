'use client'
import { addBookApi, updateBookApi } from '@/api/books.api'
import Input from '@/components/input'
import { IAddBookBody, IBookEditMode, IBookResponse } from '@/interfaces/books.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

interface BookFormProps {
  isEditMode: IBookEditMode
  handleChangeEditMode: (state: boolean, data: IBookResponse | null) => void
}

export default function BookForm({ isEditMode, handleChangeEditMode }: BookFormProps) {
  const [addBookForm, setAddBookForm] = useState<IAddBookBody | null>(null)
  const queryClient = useQueryClient()

  const addBookMutation = useMutation({
    mutationFn: (body: IAddBookBody) => addBookApi(body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books']
      })
    }
  })

  const updateBookMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: IAddBookBody }) => updateBookApi({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books']
      })
    }
  })

  useEffect(() => {
    if (isEditMode.state) {
      setAddBookForm(isEditMode.data as IAddBookBody)
    } else {
      setAddBookForm(null)
    }
  }, [isEditMode])

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddBookForm({
      ...addBookForm,
      [e.target.name]: e.target.value
    } as IAddBookBody)
  }

  const handleChangeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAddBookForm({
        ...addBookForm,
        image: e.target.files[0]
      } as IAddBookBody)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (addBookForm) {
      if (!isEditMode.state) {
        // add book
        addBookMutation.mutate({
          ...addBookForm,
          pages: +addBookForm.pages
        })
      } else {
        // update book
        updateBookMutation.mutate({
          id: isEditMode.data?.id as string,
          body: {
            ...addBookForm,
            pages: +addBookForm.pages
          }
        })
      }
    }
  }

  const handleAddBookMode = () => {
    handleChangeEditMode(false, null)
    return setAddBookForm(null)
  }

  return (
    <div className='relative grid place-items-center h-full px-3'>
      <div className='absolute top-2 left-2'>
        <button type='button' onClick={handleAddBookMode} className='bg-emerald-500 p-2 rounded hover:bg-opacity-80'>
          Add Book Mode
        </button>
      </div>

      <div className={`rounded-lg p-4 border ${!isEditMode.state ? 'border-emerald-500' : 'border-blue-500'}`}>
        <div className='w-full max-w-lg'>
          <h1 className={`text-2xl font-medium ${!isEditMode.state ? 'text-emerald-500' : 'text-blue-500'}`}>
            Book Form
          </h1>
          <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
            <div className='grid gap-1.5'>
              <Input name='name' type='text' value={addBookForm?.name || ''} onChange={handleChangeValues} />
            </div>
            <div className='grid gap-1.5'>
              <Input name='author' type='text' value={addBookForm?.author || ''} onChange={handleChangeValues} />
            </div>
            <div className='grid gap-1.5'>
              <Input
                name='pages'
                type='number'
                value={addBookForm?.pages || ''}
                onChange={handleChangeValues}
                className='max-w-24'
              />
            </div>
            <div className='grid gap-1.5'>
              <Input name='image' type='file' onChange={handleChangeFileUpload} />
            </div>
            <button
              className={`justify-center w-full mt-3 ${
                !isEditMode.state ? 'bg-emerald-500' : 'bg-blue-500'
              } py-2 rounded hover:bg-opacity-80`}
              type='submit'
            >
              {isEditMode.state ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
