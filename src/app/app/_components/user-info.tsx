import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'

type Props = {
  user: Session['user']
}

export function UserInfo({ user }: Props) {
  if (!user) return null

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex gap-2 items-center'>
        <Avatar>
          <AvatarFallback className='font-bold'>
            {user.email?.split('')[0].toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className='flex flex-col'>
          <span>{user.email}</span>
          <Button>
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
