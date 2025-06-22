"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import Dashboard from "./components/Dashboard"
import Progress from "./components/Progress"
import Account from "./components/Account"

// Mock data for smart water bottle simulation
const generateMockData = () => {
  const today = new Date()
  const data = []

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split("T")[0],
      intake: Math.floor(Math.random() * 2000) + 1500, // 1500-3500ml
      goal: 2500,
    })
  }
  return data
}

export default function App() {
  const [waterData, setWaterData] = useState(generateMockData())
  const [currentIntake, setCurrentIntake] = useState(1200)
  const [dailyGoal, setDailyGoal] = useState(2500)
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    weight: 70,
    activityLevel: "moderate",
  })

  // Simulate smart water bottle updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIntake((prev) => {
        const increment = Math.floor(Math.random() * 100) + 50
        return Math.min(prev + increment, dailyGoal + 500)
      })
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [dailyGoal])

  const addWaterIntake = (amount) => {
    setCurrentIntake((prev) => Math.min(prev + amount, dailyGoal + 1000))
  }

  const updateDailyGoal = (newGoal) => {
    setDailyGoal(newGoal)
    setWaterData((prev) => prev.map((day, index) => (index === prev.length - 1 ? { ...day, goal: newGoal } : day)))
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  currentIntake={currentIntake}
                  dailyGoal={dailyGoal}
                  waterData={waterData}
                  onAddWater={addWaterIntake}
                  onUpdateGoal={updateDailyGoal}
                />
              }
            />
            <Route
              path="/progress"
              element={<Progress waterData={waterData} currentIntake={currentIntake} dailyGoal={dailyGoal} />}
            />
            <Route
              path="/account"
              element={
                <Account
                  userProfile={userProfile}
                  onUpdateProfile={setUserProfile}
                  dailyGoal={dailyGoal}
                  onUpdateGoal={updateDailyGoal}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
