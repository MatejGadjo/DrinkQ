import { Calendar, TrendingUp, Award, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HistoryChart from "./HistoryChart"
import { Progress as ProgressBar } from "@/components/ui/progress"
import PropTypes from "prop-types"

function calculateStreak(waterData) {
  let streak = 0
  for (let i = waterData.length - 1; i >= 0; i--) {
    if (waterData[i].intake >= waterData[i].goal) {
      streak++
    } else {
      break
    }
  }
  return streak
}

export default function Progress({ waterData, currentIntake, dailyGoal }) {
  const weeklyAverage = waterData.reduce((sum, day) => sum + day.intake, 0) / waterData.length
  const goalsAchieved = waterData.filter((day) => day.intake >= day.goal).length
  const currentStreak = calculateStreak(waterData)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracking</h1>
        <p className="text-gray-600">Detailed insights into your hydration journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{(weeklyAverage / 1000).toFixed(1)}L</div>
            <div className="text-sm text-gray-600">Weekly Average</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{goalsAchieved}/7</div>
            <div className="text-sm text-gray-600">Goals Achieved</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((goalsAchieved / waterData.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day History</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoryChart waterData={waterData} />
        </CardContent>
      </Card>

      {/* Detailed Daily Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {waterData.map((day, index) => {
              const date = new Date(day.date)
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })
              const percentage = (day.intake / day.goal) * 100
              const isToday = index === waterData.length - 1

              return (
                <div key={day.date} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                      {dayName} {isToday && "(Today)"}
                    </span>
                    <span className="text-sm text-gray-600">
                      {(day.intake / 1000).toFixed(1)}L / {(day.goal / 1000).toFixed(1)}L
                    </span>
                  </div>
                  <ProgressBar value={Math.min(percentage, 100)} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{percentage.toFixed(0)}% of goal</span>
                    <span className={percentage >= 100 ? "text-green-600" : "text-orange-600"}>
                      {percentage >= 100 ? "✅ Goal achieved" : `${((day.goal - day.intake) / 1000).toFixed(1)}L short`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

Progress.propTypes = {
  waterData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      intake: PropTypes.number.isRequired,
      goal: PropTypes.number.isRequired,
    }),
  ).isRequired,
  currentIntake: PropTypes.number.isRequired,
  dailyGoal: PropTypes.number.isRequired,
}
