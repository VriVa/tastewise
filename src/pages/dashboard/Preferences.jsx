import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Preferences = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Preferences</h1>
        <p className="text-muted-foreground">
          Dietary restrictions, cuisine preferences, and account settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            User preferences and settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Preferences
