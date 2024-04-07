import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function BookSkeleton() {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='h-[310px] w-[175px] rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[175px]' />
        <Skeleton className='h-4 w-[175px]' />
      </div>
    </div>
  )
}
