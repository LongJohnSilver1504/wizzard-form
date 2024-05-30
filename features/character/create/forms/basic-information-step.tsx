'use client'
import { useStepIterator } from '@/components/form-wizard/providers/step-iterator-provider'
import { Button } from '@/components/ui/button'
import * as React from 'react'

export const BasicInformation = () => {
  const { moveNext, movePrevious, hasNext, hasPrevious } = useStepIterator()
  return (
    <div className="h-full flex w-full justify-between flex-col">
     basic information form
    </div>
  )
}
