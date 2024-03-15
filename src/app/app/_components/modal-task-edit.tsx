'use client'

import { updateTasksAction } from '@/actions/update-tasks'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  title: string
  description: string
  id: string
}

const schemaCreateTask = z.object({
  title: z.string(),
  description: z.string(),
})

type CreateTask = z.infer<typeof schemaCreateTask>

export function ModalTaskEdit({ title, description, id }: Props) {
  const { toast } = useToast()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    
    
  } = useForm<CreateTask>({
    resolver: zodResolver(schemaCreateTask),
    defaultValues: {
      title,
      description,
    },
  })

   function handleUpdateTask(data: CreateTask) {
    toast({
      title: 'Tarefa atualizada!',
      description: 'A tarefa foi atualizada com sucesso.',
    })

     updateTasksAction(id, data)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar tarefa!</DialogTitle>
        <DialogDescription>
          Edite os campos abaixo para atualizar a tarefa.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateTask)}>
        <div className='flex flex-col gap-2'>
          <div>
            <Label htmlFor='title'>Título</Label>
            <Input type='text' id='title' {...register('title')} />
          </div>

          <div>
            <Label htmlFor='description'>Descrição</Label>
            <Textarea
              id='description'
              className='resize-none h-20'
              {...register('description')}
            />
          </div>

          <DialogFooter className='pt-4'>
            <DialogClose asChild>
              <Button
                variant='destructive'
                type='button'
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button type='submit' disabled={isSubmitting}>
              Atualizar
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  )
}
