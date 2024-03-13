'use client'

import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarNavLink,
} from '../(dashboard)/_components/aside'

import { HomeIcon, GearIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { UserDropdown } from './user-dropdown'
import { Session } from 'next-auth'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'

type MainAsideProps = {
  user: Session['user']
}

const schemaSearch = z.object({
  search: z.string(),
})

type SearchParams = z.infer<typeof schemaSearch>

export function MainAside({ user }: MainAsideProps) {
  const path = usePathname()

  const { register, handleSubmit } = useForm<SearchParams>({
    resolver: zodResolver(schemaSearch),
  })

  function handleSearch(data: SearchParams) {
    console.log(data)
  }

  function isActive(href: string) {
    return path === href ? true : false
  }

  return (
    <Sidebar>
      <SidebarHeader className='px-8 pt-4'>
        <Logo />
      </SidebarHeader>
      <SidebarMain className='flex-grow flex flex-col'>
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className='pb-4 relative'>
            <Button
              size='icon'
              type='submit'
              variant='ghost'
              className='absolute top-2 left-2 size-5 hover:bg-inherit'
            >
              <MagnifyingGlassIcon className='size-5' />
            </Button>
            <Input id='search' className='pl-8' {...register('search')} />
          </div>
        </form>
        <SidebarNav>
          <SidebarNavLink href='/app' active={isActive('/app')}>
            <HomeIcon className='size-4' />
            Tarefas
          </SidebarNavLink>
          <SidebarNavLink
            href='/app/settings'
            active={isActive('/app/settings')}
          >
            <GearIcon className='size-4' />
            Configurações
          </SidebarNavLink>
        </SidebarNav>

        <SidebarNav className='mt-auto'>
          <SidebarNavHeader>
            <SidebarNavHeaderTitle>Links extras</SidebarNavHeaderTitle>
          </SidebarNavHeader>
          <SidebarNavLink href='/'>Precisa de ajuda?</SidebarNavLink>
          <SidebarNavLink href='/site'>Site</SidebarNavLink>
        </SidebarNav>
      </SidebarMain>

      <SidebarFooter>
        <UserDropdown user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
