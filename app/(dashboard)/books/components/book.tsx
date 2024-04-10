'use client'
import { deleteBookApi } from '@/api/books.api'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { IBookResponse } from '@/interfaces/books.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GripHorizontal, Pencil, Trash } from 'lucide-react'

interface IBookProps {
  handleChangeEditMode: (state: boolean, data: IBookResponse) => void
  data: IBookResponse
}

export default function Book({ handleChangeEditMode, data }: IBookProps) {
  const queryClient = useQueryClient()
  const deleteBookMutation = useMutation({
    mutationFn: (id: string) => deleteBookApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books']
      })
    }
  })

  const handleEditBook = () => {
    handleChangeEditMode(true, data)
  }

  const handleDeleteBook = () => {
    deleteBookMutation.mutate(data.id)
  }

  const isBase64 = (str: string) => {
    if (str === '' || str.trim() === '') {
      return false
    }
    try {
      return btoa(atob(str)) === str
    } catch (err) {
      return false
    }
  }

  return (
    <div className='relative border max-h-[90%] w-fit rounded-lg'>
      <div className='grid items-start gap-2 justify-center'>
        <div className='overflow-hidden h-[250px] rounded-lg cursor-pointer'>
          <img
            alt=''
            className='rounded-lg w-[175px] max-w-[175px] object-cover hover:scale-110 transition duration-200'
            src={`${
              data.image && isBase64(data.image)
                ? `data:image;base64,${data.image}`
                : 'https://i.docln.net/lightnovel/covers/s9193-28267b79-2581-420f-be87-d3cb0ea0f46d-m.jpg'
            }`}
          />
        </div>

        <div className='px-2 py-1'>
          <p className='text-sm text-gray-500'>Name: {data.name}</p>
          <p className='text-sm text-gray-500'>Author: {data.author}</p>
          <p className='text-sm text-gray-500'>Pages: {data.pages}</p>
        </div>
      </div>

      <div className='absolute right-[2px] top-0'>
        <Popover>
          <PopoverTrigger>
            <div className='bg-neutral-700 rounded-md hover:opacity-70'>
              <GripHorizontal size={24} />
            </div>
          </PopoverTrigger>
          <PopoverContent className='bg-neutral-700 w-28 p-0'>
            <div className='p-1'>
              <div
                onClick={handleEditBook}
                className='p-1 text-white flex space-x-2 items-center hover:bg-blue-500 cursor-pointer rounded'
              >
                <Pencil size={20} />
                <span>Edit</span>
              </div>
              <div
                onClick={handleDeleteBook}
                className='mt-1 p-1 text-white flex space-x-2 items-center hover:bg-red-500 cursor-pointer rounded'
              >
                <Trash size={20} />
                <span>Delete</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
