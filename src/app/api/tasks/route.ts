import { prisma } from '@/lib/service/database'
import { auth } from '@/lib/service/auth'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const session = await auth()

  const searchParams = request.nextUrl.searchParams
  const pageUrl = searchParams.get('page')
  const perPageUrl = searchParams.get('perPage')

  const page = pageUrl ? parseInt(pageUrl) : 1
  const perPage = perPageUrl ? parseInt(perPageUrl) : 10

  const tasks = await prisma.todo.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * perPage,
    take: perPage,
  })

  return Response.json({ page, perPage, tasks: tasks })
}
