import { useState } from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'
import MainPage from './routes/MainPage'
import NavBar from './components/NavBar'
import EducationPage from './routes/education'
import ProjectsPage from './routes/projects'
import BackgroundPage from './routes/background'
import ContactPage from './routes/contact'

function App() {

  return (
    <>
      <NavBar />
      <div className="routes">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/background" element={<BackgroundPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
