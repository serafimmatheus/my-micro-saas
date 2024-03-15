import { auth } from '@/lib/service/auth'
import { TableTasks } from './tableTasks'
import { prisma } from '@/lib/service/database'



export async function ListingTableTasks() {
  const session = await auth()

  if (!session || !session.user) {
    return null
  }

  let page = 1

  const tasks = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
    skip: (page - 1) * 10,
  })


  return <TableTasks data={tasks} />
}
