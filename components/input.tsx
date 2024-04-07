interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...rest }: InputProps) {
  const className =
    rest.type !== 'file'
      ? 'border-b border-gray-300 w-full py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit '
      : 'flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium cursor-pointer'

  return (
    <div className='w-full relative mt-3'>
      <input id={rest.name} name={rest.name} {...rest} className={`${className} ${rest.className}`} />

      <label
        htmlFor={rest.name}
        className={`absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-white first-letter:uppercase opacity-10 peer-focus:opacity-100 ${
          rest.type === 'file' && 'hidden'
        }`}
      >
        {rest.name}
      </label>
    </div>
  )
}
