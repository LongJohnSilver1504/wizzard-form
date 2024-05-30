'use client'
import { Wizard } from '@/components/form-wizard/wizard'
import * as z from 'zod'
import * as React from 'react'
import { BasicInformationStep } from './forms/basic-information-step'
import { PhysicalAppearanceStep } from './forms/physical-appearance-step'
import { AbilitiesAndSkillsStep } from './forms/abilities-and-skills-step'
import { useStepIterator } from '@/components/form-wizard/providers/step-iterator-provider'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
  classes,
  eyeColors,
  genders,
  hairStyles,
  races,
  skinColors,
  specialAbilities,
} from '../shared'
import { Step } from '@/components/form-wizard/steps'

const wizardFormSchema = z.object({
  basicInFormation: z.object({
    name: z.string(),
    race: races,
    class: classes,
    gender: genders,
    age: z.number().min(18),
  }),
  physicalAppearance: z.object({
    hairStyle: hairStyles,
    eyeColor: eyeColors,
    skinColor: skinColors,
  }),
  abilitiesAndSkills: z.object({
    specialAbilities: z.array(specialAbilities),
    strength: z.number().min(1).max(10),
    intelligence: z.number().min(1).max(10),
    dexterity: z.number().min(1).max(10),
  }),
})

export const CreateWizard = () => {
  const handleSubmit = (data: any) => {
    console.log(data)
  }

  const wizardFormSettings = {
    onSubmit: handleSubmit,
    initialValues: {},
    schema: wizardFormSchema,
  }

  const SideBar = () => {
    const { current } = useStepIterator()
    const sidebar = [
      'Basic Information',
      'Physical Appearance',
      'Abilities and Skills',
    ]

    return (
      <div className="w-80 space-y-2">
        {sidebar.map((step, i) => {
          const id = `step-${i}`

          return (
            <div key={id} className="items-top flex space-x-2 ">
              <Checkbox
                id={id}
                className="rounded-full"
                checked={i <= current}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {step}
                </label>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Wizard wizardFormSettings={wizardFormSettings} sideBar={<SideBar />}>
      <Step>
        
      </Step>
      <PhysicalAppearanceStep />
      <AbilitiesAndSkillsStep />
    </Wizard>
  )
}
