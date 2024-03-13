'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Session } from 'next-auth'
import { ListingUserModalEdit } from '../(dashboard)/_components/listing-modal-user-edit'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { RocketIcon } from '@radix-ui/react-icons'
type UserDropdownProps = {
  user: Session['user']
}

export function UserDropdown({ user }: UserDropdownProps) {
  if (!user) return

  function handleSignOut() {
    signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-full rounded-full px-0'
        >
          <Avatar className='h-8 w-8 mr-3'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>
              {user.email?.split('')[0].toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className='flex flex-col flex-1 space-y-1 text-left'>
            {user.name && (
              <p className='text-sm font-medium leading-none'>{user.name}</p>
            )}

            {user.email && (
              <p className='text-xs leading-none text-muted-foreground'>
                {user.email}
              </p>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            {user.name && (
              <p className='text-sm font-medium leading-none'>{user.name}</p>
            )}

            {user.email && (
              <p className='text-xs leading-none text-muted-foreground'>
                {user.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ListingUserModalEdit />

          <DropdownMenuItem className='gap-2'>
            <RocketIcon className='w-4 h-4' />
            Upgrade
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='gap-2' onClick={handleSignOut}>
          <LogOutIcon className='w-4 h-4' />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
