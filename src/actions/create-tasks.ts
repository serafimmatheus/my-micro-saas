'use server'

import { auth } from '@/lib/service/auth'
import { prisma } from '@/lib/service/database'
import { revalidatePath } from 'next/cache'

export async function createTasksAction(title: string, description: string) {
  const session = await auth()
  if (!session?.user?.id || !session) {
    return null
  }

  const newSlug = title.toLowerCase().replace(/ /g, '-')

  const tasks = await prisma.todo.create({
    data: {
      title,
      slug: newSlug,
      description,
      userId: session.user.id,
    },
  })

  revalidatePath('/app')

  return tasks
}
