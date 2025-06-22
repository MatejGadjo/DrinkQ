import WaterIntakeCard from "./WaterIntakeCard"
import QuickActions from "./QuickActions"
import TodayProgress from "./TodayProgress"
import WeeklyOverview from "./WeeklyOverview"
import PropTypes from "prop-types"

export default function Dashboard({ currentIntake, dailyGoal, waterData, onAddWater, onUpdateGoal }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Water Tracking Dashboard</h1>
        <p className="text-gray-600">Stay hydrated and track your daily water intake</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Water Intake Display */}
        <div className="lg:col-span-2">
          <WaterIntakeCard currentIntake={currentIntake} dailyGoal={dailyGoal} />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions onAddWater={onAddWater} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Progress */}
        <TodayProgress currentIntake={currentIntake} dailyGoal={dailyGoal} />

        {/* Weekly Overview */}
        <WeeklyOverview waterData={waterData} />
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  currentIntake: PropTypes.number.isRequired,
  dailyGoal: PropTypes.number.isRequired,
  waterData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      intake: PropTypes.number.isRequired,
      goal: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddWater: PropTypes.func.isRequired,
  onUpdateGoal: PropTypes.func.isRequired,
}
