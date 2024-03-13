import { cn } from '@/lib/utils'
import Link from 'next/link'

export type PageGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function Page({ children, className }: PageGenericProps) {
  return <div className={cn(['', className])}>{children}</div>
}

export function PageMain({ children, className }: PageGenericProps) {
  return <main className={cn(['p-4', className])}>{children}</main>
}

export function PageHeader({ children, className }: PageGenericProps) {
  return (
    <header className={cn(['border-b border-border py-2.5 px-4', className])}>
      {children}
    </header>
  )
}

export function PageHeaderTitle({ children, className }: PageGenericProps) {
  return <h1 className={cn(['font-bold text-xl', className])}>{children}</h1>
}

export function PageHeaderNav({ children, className }: PageGenericProps) {
  return <nav className={cn(['', className])}>{children}</nav>
}

type PageHeaderNavLinkProps = {
  href: string
}

export function PageHeaderNavLink({
  children,
  className,
  href,
}: PageGenericProps<PageHeaderNavLinkProps>) {
  return (
    <Link href={href} className={cn(['', className])}>
      {children}
    </Link>
  )
}
