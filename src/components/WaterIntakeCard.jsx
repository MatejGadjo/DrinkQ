import { Droplets, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import PropTypes from "prop-types"

export default function WaterIntakeCard({ currentIntake, dailyGoal }) {
  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100)
  const remainingIntake = Math.max(dailyGoal - currentIntake, 0)

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Droplets className="h-6 w-6" />
          <span>{"Today's Water Intake"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Intake Display */}
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">{(currentIntake / 1000).toFixed(1)}L</div>
          <div className="text-blue-100">of {(dailyGoal / 1000).toFixed(1)}L goal</div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-3 bg-blue-400" />
          <div className="flex justify-between text-sm text-blue-100">
            <span>{progressPercentage.toFixed(0)}% Complete</span>
            <span>{(remainingIntake / 1000).toFixed(1)}L Remaining</span>
          </div>
        </div>

        {/* Goal Status */}
        <div className="flex items-center justify-center space-x-2 bg-white/10 rounded-lg p-3">
          <Target className="h-5 w-5" />
          <span>{currentIntake >= dailyGoal ? "🎉 Goal Achieved!" : `${remainingIntake}ml to go!`}</span>
        </div>
      </CardContent>
    </Card>
  )
}

WaterIntakeCard.propTypes = {
  currentIntake: PropTypes.number.isRequired,
  dailyGoal: PropTypes.number.isRequired,
}
