import PropTypes from "prop-types"

export default function HistoryChart({ waterData }) {
  const maxValue = Math.max(...waterData.map((d) => Math.max(d.intake, d.goal)))

  return (
    <div className="w-full h-64 flex items-end justify-between space-x-2">
      {waterData.map((day, index) => {
        const date = new Date(day.date)
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
        const intakeHeight = (day.intake / maxValue) * 100
        const goalHeight = (day.goal / maxValue) * 100
        const isToday = index === waterData.length - 1

        return (
          <div key={day.date} className="flex-1 flex flex-col items-center space-y-2">
            <div className="w-full relative h-48 flex items-end justify-center space-x-1">
              {/* Goal line */}
              <div className="w-3 bg-gray-300 rounded-t" style={{ height: `${goalHeight}%` }} />
              {/* Actual intake */}
              <div
                className={`w-3 rounded-t ${
                  day.intake >= day.goal
                    ? "bg-green-500"
                    : day.intake >= day.goal * 0.75
                      ? "bg-blue-500"
                      : "bg-orange-500"
                }`}
                style={{ height: `${intakeHeight}%` }}
              />
            </div>
            <div className={`text-xs text-center ${isToday ? "font-bold text-blue-600" : "text-gray-600"}`}>
              {dayName}
            </div>
            <div className="text-xs text-gray-500">{(day.intake / 1000).toFixed(1)}L</div>
          </div>
        )
      })}
    </div>
  )
}

HistoryChart.propTypes = {
  waterData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      intake: PropTypes.number.isRequired,
      goal: PropTypes.number.isRequired,
    }),
  ).isRequired,
}
