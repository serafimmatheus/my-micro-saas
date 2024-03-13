'use client'

import { updateTasksCompletedAction } from '@/actions/updated-task-completed'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@radix-ui/react-icons'

interface Props {
  userId: string
  completed: boolean
}

export function BtnToggleCompleteTasks({ completed, userId }: Props) {
  async function handleUpdateTaskCompleted() {
    await updateTasksCompletedAction(userId)
  }
  return (
    <Button
      className={`${completed && 'bg-green-500 text-white'}`}
      size='icon'
      variant='outline'
      onClick={handleUpdateTaskCompleted}
    >
      {completed ? <CheckIcon className='size-4' /> : ''}
    </Button>
  )
}
