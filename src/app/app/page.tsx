import { ListingTableTasks } from './(dashboard)/_components/listing-table-tasks'
import { PageHeader, PageHeaderTitle } from './(dashboard)/page'
import { ModalTask } from './_components/modal-task'
import { FileTextIcon } from '@radix-ui/react-icons'

export default function PageApp() {
  return (
    <>
      <PageHeader className='flex justify-between items-center mb-10'>
        <PageHeaderTitle className='flex items-center gap-2'>
          <FileTextIcon className='size-6' />
          Tasks
        </PageHeaderTitle>

        <ModalTask />
      </PageHeader>
      <ListingTableTasks />
    </>
  )
}
