'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '../../../../components/ui/button'

import { Pencil2Icon } from '@radix-ui/react-icons'
import { Dialog, DialogTrigger } from '../../../../components/ui/dialog'
import { ModalTaskEdit } from '@/app/app/_components/modal-task-edit'
import { ActionsButtonsTasks } from './actions-button-tasks'
import { BtnToggleCompleteTasks } from '@/app/app/_components/btn-toggle-complete-tasks'
import { DatePickerWithRange } from './date-picker'
import { PaginationPage } from './pagination'

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

export function TableTasks({ tasks }: Task) {
  console.log(tasks)
  return (
    <main className='flex flex-col px-8'>
      <Table className='flex flex-col flex-1'>
        <TableHeader>
          <TableRow className='grid grid-cols-12'>
            <TableHead className='col-span-2 flex items-center'>ID</TableHead>
            <TableHead className='col-span-4 flex items-center'>
              Titulo
            </TableHead>
            <TableHead className='col-span-2 flex items-center'>Data</TableHead>
            <TableHead className='col-span-2 flex items-center'>
              Status
            </TableHead>
            <TableHead className='col-span-2 flex justify-end items-center'>
              <DatePickerWithRange />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task: any) => (
              <TableRow
                key={task.id}
                className='grid grid-cols-12 items-center'
              >
                <TableCell className='font-medium col-span-2'>
                  {task.id}
                </TableCell>
                <TableCell className='col-span-4 font-bold text-md'>
                  {task.title}
                </TableCell>
                <TableCell className='col-span-2'>
                  <div className='flex items-center gap-2'>
                    <p className=''>
                      {/* {task.createdAt.toLocaleDateString('pt-BR')} */}
                    </p>
                  </div>
                </TableCell>

                <TableCell className='col-span-2'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`rounded-full size-4 ${
                        task.completed === true
                          ? 'bg-green-500'
                          : 'bg-destructive'
                      }`}
                    ></div>
                    <p className=''>
                      {task.completed === true
                        ? 'Completada'
                        : 'Não completada'}
                    </p>
                  </div>
                </TableCell>
                <TableCell className='text-right col-span-2'>
                  <div className='flex items-center gap-2 justify-end'>
                    <BtnToggleCompleteTasks
                      userId={task.id}
                      completed={task.completed}
                    />
                    <Dialog key={task.id}>
                      <DialogTrigger asChild>
                        <Button variant='outline' size='icon'>
                          <Pencil2Icon className='size-4' />
                        </Button>
                      </DialogTrigger>

                      <ModalTaskEdit
                        title={task.title}
                        description={task.description || ''}
                        id={task.id}
                      />
                    </Dialog>

                    <ActionsButtonsTasks userId={task.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <div className='border border-dashed border-border mt-5 h-32 flex flex-col items-center justify-center'>
              <p className='font-bold text-lg'>Você não possui tarefas!</p>
            </div>
          )}
        </TableBody>
      </Table>

      {tasks.length > 0 && <PaginationPage />}
    </main>
  )
}
