import { PropsWithChildren } from 'react'
import { MainAside } from './_components/main-aside'
import { auth } from '@/lib/service/auth'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()
  return (
    <div className='grid grid-cols-[16rem_1fr] h-screen'>
      <MainAside user={session?.user} />

      <main>{children}</main>
    </div>
  )
}
