'use client'

import { createTasksAction } from '@/actions/create-tasks'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'

import { PlusIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schemaCreateTask = z.object({
  title: z.string(),
  description: z.string(),
})

type CreateTask = z.infer<typeof schemaCreateTask>

export function ModalTask() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateTask>({
    resolver: zodResolver(schemaCreateTask),
  })

  async function handleCreateTask(data: CreateTask) {
    await createTasksAction(data.title, data.description)
    reset()
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size='icon'
          variant='outline'
          className='bg-green-500 text-white hover:bg-green-600 hover:text-white'
        >
          <PlusIcon className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova tarefa!</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateTask)}>
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
                Criar
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
