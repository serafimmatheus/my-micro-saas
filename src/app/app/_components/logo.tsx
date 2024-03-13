import { RocketIcon } from '@radix-ui/react-icons'

export function Logo() {
  return (
    <div className='flex items-center gap-2'>
      <RocketIcon className='size-6' />
      <h1 className='text-2xl font-bold'>Painel</h1>
    </div>
  )
}
