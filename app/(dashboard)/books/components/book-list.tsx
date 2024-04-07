'use client'
import { IBookResponse } from '@/interfaces/books.interface'
import Book from './book'
import { useQuery } from '@tanstack/react-query'
import { getAllBooksApi } from '@/api/books.api'
import BookSkeleton from '@/components/book-skeleton'

interface BookListProps {
  handleChangeEditMode: (state: boolean, data: IBookResponse) => void
}

export default function BookList({ handleChangeEditMode }: BookListProps) {
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooksApi
  })

  return !isFetching && isSuccess ? (
    <div className='flex flex-row flex-wrap gap-2 overflow-y-auto max-h-full'>
      {data.map((book) => (
        <Book key={book.id} data={book} handleChangeEditMode={handleChangeEditMode} />
      ))}
    </div>
  ) : (
    <BookSkeleton />
  )
}
