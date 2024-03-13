'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function PaginationPage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)
  const page = params.get('page') || '1'

  function handleNextPage() {
    if (page) {
      params.set('page', String(Number(page) + 1))
    } else {
      params.delete('page')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  function handlePrevPage() {
    if (page) {
      params.set('page', String(Number(page) - 1))
    }
    if (Number(page) <= 2) {
      params.delete('page')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Pagination className='mt-5'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
