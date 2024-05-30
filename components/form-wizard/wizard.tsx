'use client'

import * as React from 'react'
import {
  WizardDataType,
  WizardFormSettings,
  WizardProvider,
} from './providers/wizard-form-provider'

import { StepsContainer, StepsSettings } from './steps'
import { StepIteratorProvider } from './providers/step-iterator-provider'
import { Separator } from '../ui/separator'

type WizardProps<T extends WizardDataType> = React.PropsWithChildren<{
  stepsSettings?: StepsSettings
  wizardFormSettings: WizardFormSettings<T>
  sideBar: React.ReactNode
  children: React.ReactNode
}>

export const Wizard = ({
  children,
  stepsSettings,
  wizardFormSettings,
  sideBar,
}: WizardProps<WizardDataType>) => {
  const count = React.Children.count(children)

  return (
    <WizardProvider {...wizardFormSettings}>
      <StepIteratorProvider count={count} {...stepsSettings}>
        <div className="flex h-full w-full gap-x-4">
          {sideBar}
          <Separator orientation="vertical" />
          <div className="h-full w-full">
            <StepsContainer {...stepsSettings}>{children}</StepsContainer>
          </div>
        </div>
      </StepIteratorProvider>
    </WizardProvider>
  )
}
