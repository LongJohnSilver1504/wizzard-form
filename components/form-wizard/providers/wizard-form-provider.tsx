'use client'
import * as React from 'react'
import * as z from 'zod'

export type WizardDataType = Record<string, unknown>

type WizardContextType<T extends WizardDataType> = {
  formData: Partial<T>
  updateFormData: (data: Partial<T>) => void
  onSubmit: () => void
}

export const createWizardFormContext = <T extends WizardDataType>() =>
  React.createContext<WizardContextType<T> | null>(null)

export type WizardFormSettings<T> = {
  initialState?: Partial<T>
  onSubmit: (data: T) => void
  schema: z.ZodSchema<T>
}

export type WizardProviderProps<T extends WizardDataType> =
  React.PropsWithChildren<WizardFormSettings<T>>

export const WizardProvider = <T extends WizardDataType>({
  children,
  initialState = {},
  onSubmit,
  schema,
}: WizardProviderProps<T>) => {
  const [formData, setFormData] = React.useState<Partial<T>>(initialState)

  const updateFormData = (newData: Partial<T>) =>
    setFormData((currentFormData) => ({ ...currentFormData, ...newData }))

  const handleSubmit = () => {
    const result = schema.safeParse(formData)

    if (result.success) {
      onSubmit(result.data)
    } else {
      console.error(result.error)
    }
  }

  const context = createWizardFormContext<T>()

  const value: WizardContextType<T> = {
    formData,
    updateFormData,
    onSubmit: handleSubmit,
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

export const useWizard = <T extends WizardDataType>() => {
  const context = React.useContext(createWizardFormContext<T>())

  if (context === null) {
    throw new Error('useWizardForm must be used within a WizardFormProvider')
  }

  return context
}
