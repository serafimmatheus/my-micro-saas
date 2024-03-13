import { auth } from '@/lib/service/auth'
import { TableTasks } from './tableTasks'
import { prisma } from '@/lib/service/database'

interface Task {
  tasks: {
    id: string
    title: string
    slug: string
    description: string | null
    completed: boolean
    userId: string
    createdAt: Date
    updatedAt: Date
  }[]
}

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

  const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['tasks'],
    },
  })

  const data = (await response.json()) as Task

  return <TableTasks tasks={data.tasks} />
}
