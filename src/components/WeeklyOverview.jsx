import { BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PropTypes from "prop-types"

export default function WeeklyOverview({ waterData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Weekly Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {waterData.map((day, index) => {
            const date = new Date(day.date)
            const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
            const percentage = (day.intake / day.goal) * 100
            const isToday = index === waterData.length - 1

            return (
              <div key={day.date} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className={`font-medium ${isToday ? "text-blue-600" : "text-gray-600"}`}>
                    {dayName} {isToday && "(Today)"}
                  </span>
                  <span className="text-gray-500">
                    {(day.intake / 1000).toFixed(1)}L / {(day.goal / 1000).toFixed(1)}L
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      percentage >= 100 ? "bg-green-500" : percentage >= 75 ? "bg-blue-500" : "bg-orange-500"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

WeeklyOverview.propTypes = {
  waterData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      intake: PropTypes.number.isRequired,
      goal: PropTypes.number.isRequired,
    }),
  ).isRequired,
}
