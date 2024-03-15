'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '../../../../components/ui/button'
import { deleteTasksAction } from '@/actions/delete-tasks'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useFormStatus } from 'react-dom'

interface Props {
  userId: string
}

export function ActionsButtonsTasks({ userId }: Props) {
  const { pending } = useFormStatus()

  const { toast } = useToast()

   function deleteTask(id: string) {
    try {
       deleteTasksAction(id)

      toast({
        title: 'Tarefa deletada com sucesso!',
        description: 'A tarefa foi deletada com sucesso.',
        variant: 'default',
      })
    } catch (error) {
      toast({
        title: 'Erro ao deletar tarefa!',
        description: 'Ocorreu um erro ao deletar a tarefa.',
        variant: 'destructive',
        action: (
          <ToastAction onClick={() => deleteTask(userId)} altText='Try again'>
            Try again
          </ToastAction>
        ),
      })
    }
  }

  return (
    <Button
      variant='destructive'
      size='icon'
      onClick={() => deleteTask(userId)}
      disabled={pending}
    >
      {pending ? (
        <span className='animate-spin'>⏳</span>
      ) : (
        <TrashIcon className='size-4' />
      )}
    </Button>
  )
}
