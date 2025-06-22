import { Clock, Droplets, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PropTypes from "prop-types"

export default function TodayProgress({ currentIntake, dailyGoal }) {
  const hourlyTarget = dailyGoal / 16 // Assuming 16 waking hours
  const currentHour = new Date().getHours()
  const expectedIntake = hourlyTarget * Math.max(currentHour - 6, 1) // Start counting from 6 AM
  const isOnTrack = currentIntake >= expectedIntake

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>{"Today's Progress"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-blue-600">{(currentIntake / 1000).toFixed(1)}L</div>
            <div className="text-sm text-gray-600">Current</div>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-green-600">{(expectedIntake / 1000).toFixed(1)}L</div>
            <div className="text-sm text-gray-600">Expected</div>
          </div>
        </div>

        <div
          className={`p-3 rounded-lg text-center ${
            isOnTrack ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
          }`}
        >
          <div className="font-medium">{isOnTrack ? "✅ On Track!" : "⚠️ Behind Schedule"}</div>
          <div className="text-sm mt-1">
            {isOnTrack
              ? "Great job staying hydrated!"
              : `Drink ${((expectedIntake - currentIntake) / 1000).toFixed(1)}L to catch up`}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

TodayProgress.propTypes = {
  currentIntake: PropTypes.number.isRequired,
  dailyGoal: PropTypes.number.isRequired,
}
