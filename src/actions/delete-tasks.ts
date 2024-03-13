'use server'

import { auth } from '@/lib/service/auth'
import { prisma } from '@/lib/service/database'
import { revalidatePath } from 'next/cache'

export async function deleteTasksAction(id: string) {
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

  await prisma.todo.delete({
    where: {
      id: tasks.id,
    },
  })

  revalidatePath('/app')

  return tasks
}
