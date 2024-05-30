'use client'
import * as React from 'react'

type IteratorContextType = {
  current: number
  moveNext: () => void
  movePrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export const IteratorContext = React.createContext<IteratorContextType | null>(
  null
)

export type StepIteratorSettings = {
  moveNext?: (current: number) => number
  movePrevious?: (current: number) => number
  count: number
  initialStep?: number
}

type StepIteratorProviderProps = React.PropsWithChildren<StepIteratorSettings>

export const StepIteratorProvider = ({
  moveNext = (current: number) => current + 1,
  movePrevious = (current: number) => current - 1,
  count,
  initialStep = 0,
  children,
}: StepIteratorProviderProps) => {
  const [currentStep, setCurrentStep] = React.useState(initialStep)

  const hasNext = () => moveNext(currentStep) < count

  const handleMoveNext = () => {
    const nextStep = moveNext(currentStep)

    if (hasNext()) {
      setCurrentStep(nextStep)
    }
  }

  const hasPrevious = () => movePrevious(currentStep) >= initialStep

  const handleMovePrevious = () => {
    const previousStep = movePrevious(currentStep)

    if (hasPrevious()) {
      setCurrentStep(previousStep)
    }
  }

  return (
    <IteratorContext.Provider
      value={{
        current: currentStep,
        hasNext: hasNext(),
        moveNext: handleMoveNext,
        hasPrevious: hasPrevious(),
        movePrevious: handleMovePrevious,
      }}
    >
      {children}
    </IteratorContext.Provider>
  )
}

export const useStepIterator = () => {
  const context = React.useContext(IteratorContext)

  if (context === null) {
    throw new Error(
      'useMultiStepIterator must be used within a StepIteratorProvider'
    )
  }

  return context
}
