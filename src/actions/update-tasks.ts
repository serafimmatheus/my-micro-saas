'use server'

import { auth } from '@/lib/service/auth'
import { prisma } from '@/lib/service/database'
import { revalidatePath } from 'next/cache'

interface UpdateTasks {
  title?: string
  description?: string
}

export async function updateTasksAction(id: string, user: UpdateTasks) {
  const session = await auth()
  if (!session?.user?.id || !session) {
    return null
  }

  const tasks = await prisma.todo.findUnique({
    where: {
      id,
    },
  })

  if (!tasks) {
    return 'task not found'
  }

  if (tasks.userId !== session.user.id) {
    return 'You are not authorized to delete this task'
  }

  await prisma.todo.update({
    where: {
      id: tasks.id,
    },
    data: {
      title: user.title,
      description: user.description,
    },
  })

  revalidatePath('/app')

  return tasks
}
