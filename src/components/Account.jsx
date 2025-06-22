import { useState } from "react"
import { User, Settings, Target, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PropTypes from "prop-types"

export default function Account({ userProfile, onUpdateProfile, dailyGoal, onUpdateGoal }) {
  const [profile, setProfile] = useState(userProfile)
  const [goal, setGoal] = useState(dailyGoal)
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = () => {
    onUpdateProfile(profile)
    setIsEditing(false)
  }

  const handleSaveGoal = () => {
    onUpdateGoal(goal)
  }

  const calculateRecommendedIntake = () => {
    const baseIntake = profile.weight * 35 // 35ml per kg
    const activityMultiplier =
      {
        low: 1,
        moderate: 1.2,
        high: 1.4,
      }[profile.activityLevel] || 1

    return Math.round(baseIntake * activityMultiplier)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your profile and hydration preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: Number.parseInt(e.target.value) })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select
                value={profile.activityLevel}
                onValueChange={(value) => setProfile({ ...profile, activityLevel: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Activity</SelectItem>
                  <SelectItem value="moderate">Moderate Activity</SelectItem>
                  <SelectItem value="high">High Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={handleSaveProfile} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setProfile(userProfile)
                      setIsEditing(false)
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Goal Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Hydration Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dailyGoal">Daily Water Goal (ml)</Label>
              <Input
                id="dailyGoal"
                type="number"
                value={goal}
                onChange={(e) => setGoal(Number.parseInt(e.target.value))}
                step="250"
                min="1000"
                max="5000"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Recommended Intake</h4>
              <p className="text-blue-700 text-sm mb-2">
                Based on your weight ({profile.weight}kg) and activity level ({profile.activityLevel}):
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {(calculateRecommendedIntake() / 1000).toFixed(1)}L per day
              </p>
            </div>

            <Button onClick={handleSaveGoal} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Update Goal
            </Button>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                💡 <strong>Tips:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Increase intake during hot weather</li>
                <li>Drink more before, during, and after exercise</li>
                <li>{"Listen to your body's thirst signals"}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Bottle Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Smart Bottle Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-green-900">Connected</p>
                <p className="text-sm text-green-700">Smart bottle is syncing data</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Reconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

Account.propTypes = {
  userProfile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    activityLevel: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
  dailyGoal: PropTypes.number.isRequired,
  onUpdateGoal: PropTypes.func.isRequired,
}
