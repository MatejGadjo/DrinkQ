import { Plus, Coffee, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PropTypes from "prop-types"

export default function QuickActions({ onAddWater }) {
  const quickAmounts = [
    { amount: 250, label: "Glass", icon: Droplets },
    { amount: 500, label: "Bottle", icon: Coffee },
    { amount: 750, label: "Large", icon: Plus },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Quick Add</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickAmounts.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.amount}
              onClick={() => onAddWater(item.amount)}
              variant="outline"
              className="w-full justify-start space-x-2 h-12"
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
              <span className="ml-auto text-sm text-gray-500">{item.amount}ml</span>
            </Button>
          )
        })}

        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 text-center">Smart bottle updates automatically</p>
        </div>
      </CardContent>
    </Card>
  )
}

QuickActions.propTypes = {
  onAddWater: PropTypes.func.isRequired,
}
