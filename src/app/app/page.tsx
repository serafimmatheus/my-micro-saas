import { auth } from '@/lib/service/auth'
import { UserInfo } from './_components/user-info'

export default async function AppPage() {
  const session = await auth()

  return (
    <div className='max-w-7xl mx-auto w-full p-4'>
      <div className='flex justify-between items-center'>
        <h1>Logo App</h1>
        <UserInfo user={session?.user} />
      </div>
    </div>
  )
}
