'use client'
import { useStepIterator } from '@/components/form-wizard/providers/step-iterator-provider'
import { Button } from '@/components/ui/button'
import * as React from 'react'

export const PhysicalAppearanceStep = () => {
  const { moveNext, movePrevious, hasNext, hasPrevious } = useStepIterator()
  return (
    <div className="flex w-full justify-between flex-col h-full">
      <p>Physical Appearance</p>
      <div className="space-x-2 self-end">
        <Button onClick={movePrevious} disabled={!hasPrevious} variant="ghost">
          Previous
        </Button>
        <Button onClick={moveNext} disabled={!hasNext}>
          Next
        </Button>
      </div>
    </div>
  )
}
