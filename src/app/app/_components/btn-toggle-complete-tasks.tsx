'use client'

import { updateTasksCompletedAction } from '@/actions/updated-task-completed'
import { Button } from '@/components/ui/button'

interface Props {
  userId: string
  completed: boolean
}

export function BtnToggleCompleteTasks({ completed, userId }: Props) {
   function handleUpdateTaskCompleted() {
     updateTasksCompletedAction(userId)
  }
  return (
    <Button
      className={`flex justify-start px-2`}
      variant='ghost'
      onClick={handleUpdateTaskCompleted}
    >
      {completed ? 'Desmarcar como concluida' : 'Marcar como concluida'}
    </Button>
  )
}
