'use client'

import * as React from 'react'
import {
  StepIteratorSettings,
  useStepIterator,
} from './providers/step-iterator-provider'
import * as z from 'zod'
import { Button } from '../ui/button'
import { useForm, FormProvider, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWizard } from './providers/wizard-form-provider'
export type StepsSettings = Pick<
  StepIteratorSettings,
  'moveNext' | 'movePrevious' | 'initialStep'
>

type StepsContainerProps = React.PropsWithChildren<{}>

export const StepsContainer = ({ children }: StepsContainerProps) => {
  const context = useStepIterator()

  if (context === null) {
    throw new Error(
      'Steps component must be used inside a StepIteratorProvider'
    )
  }

  const steps = React.Children.toArray(children)

  const currentStep = steps[context.current]

  return <>{currentStep}</>
}

type StepProps<T> = React.PropsWithChildren<{
  title: string
  formSchema: z.ZodSchema<T>

  nextLabel?: string
  onSubmitCallback?: (data: T) => void
}>

export const Step = <T extends FieldValues>({
  children,
  formSchema,
  nextLabel = 'Next',
}: StepProps<T>) => {
  const { movePrevious, hasPrevious, hasNext, moveNext } = useStepIterator()
  const { updateFormData } = useWizard()

  type FormData = z.infer<typeof formSchema>

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log('here data', data)
    // if (hasNext) {
    //   moveNext()
    // }
  }

  return (
    <div className="h-full flex w-full justify-between flex-col">
      <p>Basic Information</p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {children}
          <div className="space-x-2  self-end w-fit">
            {hasPrevious && (
              <Button onClick={movePrevious} variant="ghost">
                Previous
              </Button>
            )}
            <Button type="submit">{nextLabel}</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
