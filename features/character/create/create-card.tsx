import * as React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateWizard } from './create-wizard'

export const CreateCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Create your character</CardTitle>
    </CardHeader>
    <CardContent className="h-72">
      <CreateWizard />
    </CardContent>
  </Card>
)
