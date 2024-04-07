import Link from 'next/link'

export default function Home() {
  return (
    <main className='h-full grid place-items-center'>
      <div className='flex space-x-4'>
        <Link href={'/gemini'} className='px-4 py-2 border border-orange-400 hover:bg-orange-500 rounded'>
          Gemini
        </Link>
        <Link href={'/books'} className='px-4 py-2 border border-blue-400 hover:bg-blue-500 rounded'>
          Books
        </Link>
      </div>
    </main>
  )
}
