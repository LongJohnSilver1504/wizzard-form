import * as z from 'zod'

export const races = z.enum(['elf', 'dwarf', 'human', 'orc', 'goblin'])

export const classes = z.enum([
  'warrior',
  'mage',
  'rogue',
  'cleric',
  'ranger',
  'bard',
  'paladin',
  'druid',
])

export const genders = z.enum(['male', 'female', 'other'])

export const hairStyles = z.enum([
  'short',
  'long',
  'bald',
  'mohawk',
  'dreadlocks',
])

export const eyeColors = z.enum([
  'blue',
  'green',
  'brown',
  'hazel',
  'grey',
  'amber',
  'purple',
])

export const skinColors = z.enum([
  'pale',
  'tan',
  'olive',
  'brown',
  'black',
  'red',
  'blue',
  'green',
])

export const specialAbilities = z.enum([
  'fireBreath',
  'invisibility',
  'teleportation',
  'healing',
  'flying',
  'superStrength',
  'superSpeed',
  'mindReading',
  'mindControl',
  'timeTravel',
])

export const initialEquipment = z.enum([
  'sword',
  'staff',
  'dagger',
  'bow',
  'lute',
  'shield',
  'armor',
  'potion',
  'wand',
  'book',
])
