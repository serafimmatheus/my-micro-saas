import { cn } from '@/lib/utils'
import Link from 'next/link'

export type SidebarGenericProps<T = any> = {
  children: React.ReactNode
  className?: string
} & T

export function Sidebar({ className, children }: SidebarGenericProps) {
  return (
    <aside className={cn(['border-r border-border flex flex-col', className])}>
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, children }: SidebarGenericProps) {
  return (
    <header className={cn(['border-b border-border', className])}>
      {children}
    </header>
  )
}

export function SidebarHeaderTitle({
  className,
  children,
}: SidebarGenericProps) {
  return (
    <h2 className={cn(['text-xs text-muted-foreground uppercase', className])}>
      {children}
    </h2>
  )
}

export function SidebarMain({ className, children }: SidebarGenericProps) {
  return (
    <main className={cn(['flex flex-col p-6', className])}>{children}</main>
  )
}

export function SidebarNav({ className, children }: SidebarGenericProps) {
  return <nav className={cn(['flex flex-col', className])}>{children}</nav>
}

export function SidebarNavHeader({ className, children }: SidebarGenericProps) {
  return <header className={cn(['px-2', className])}>{children}</header>
}

export function SidebarNavHeaderTitle({
  className,
  children,
}: SidebarGenericProps) {
  return (
    <h4 className={cn(['text-sm text-muted-foreground uppercase', className])}>
      {children}
    </h4>
  )
}

export function SidebarNavMain({ className, children }: SidebarGenericProps) {
  return (
    <main className={cn(['p-6 flex flex-col', className])}>{children}</main>
  )
}

type SidebarNavListProps = {
  href: string
  active?: boolean
}

export function SidebarNavLink({
  className,
  children,
  href,
  active,
}: SidebarGenericProps<SidebarNavListProps>) {
  return (
    <Link
      href={href}
      className={cn([
        'flex items-center text-sm rounded-md px-2 py-2 gap-2 font-medium',
        active && 'bg-secondary',
        className,
      ])}
    >
      {children}
    </Link>
  )
}

export function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer className={cn(['p-6 mt-auto border-t border-border', className])}>
      {children}
    </footer>
  )
}
