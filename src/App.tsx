import React from 'react'
import { ThemeProvider } from 'context/ThemeContext'
import './App.css'
import ProjectBoard from 'components/ProjectBoard'

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Trello clone</h1>
        </header>
        <section className="app-content">
          <ProjectBoard />
        </section>
      </div>
    </ThemeProvider>
  )
}

export default App
