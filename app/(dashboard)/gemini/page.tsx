'use client'
import { useEffect, useState } from 'react'
import PrettyButton from './components/pretty-button'
import { IGeminiContent } from '@/interfaces/gemini.interface'
import { sendMessageGeminiApi } from '@/api/gemini.api'

export default function Gemini() {
  const [value, setValue] = useState('')
  const [data, setData] = useState<any>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const content: IGeminiContent = {
      contents: [
        {
          parts: [
            {
              text: value
            }
          ]
        }
      ]
    }

    const data = await sendMessageGeminiApi(content)
    setData(data)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='px-4 h-full'>
      <form className='mt-8' onSubmit={handleSubmit}>
        <input
          className='rounded-full bg-violet-100 text-lg border-2 border-red-400 px-4 py-2 placeholder-red-400 focus:text-orange-950 focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-red-500'
          placeholder='Enter anything...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <PrettyButton className='ml-4' />
      </form>

      <div className='w-full h-[80%] mt-5 bg-neutral-800 bg-opacity-65 rounded-lg p-4'>
        <p>{data && data.candidates[0].content.parts[0].text}</p>
      </div>
    </div>
  )
}
