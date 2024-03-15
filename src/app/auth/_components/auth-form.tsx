'use client'

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

import { ReloadIcon } from '@radix-ui/react-icons'

const authFormSchema = z.object({
  email: z.string().email(),
})

type AuthFormSchema = z.infer<typeof authFormSchema>

export function AuthForm() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
  })

  const handleOnSubmitForm = (data: AuthFormSchema) => {
    try {
      signIn('nodemailer', {
        email: data.email,
        redirect: false,
        // callbackUrl: `${window.location.origin}/auth/callback`,
      })

      toast({
        title: 'Email enviado',
        description: `Um email foi enviado para ${data.email}`,
      })
    } catch (error) {
      toast({
        title: 'Erro ao enviar email',
        description: 'Ocorreu um erro ao enviar o email, tente novamente.',
      })
    }
  }

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Login</CardTitle>
        <CardDescription>
          Entre com seu email para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmitForm)}>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='m@example.com'
                required
                type='email'
                {...register('email')}
              />
            </div>
            <Button disabled={isSubmitting} type='submit' className='w-full'>
              {isSubmitting && <ReloadIcon className='size-3 animate-spin' />}
              {!isSubmitting && 'Enviar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
