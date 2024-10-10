import React from 'react'
import { Grid, Home, FileText, GraduationCap, Bell, Settings } from 'lucide-react'

const Navigation = () => {
  return (
    <nav className="nav-gradient w-16 flex flex-col items-center py-8 space-y-8">
      <Grid className="text-white" size={24} />
      <Home className="text-white" size={24} />
      <FileText className="text-white" size={24} />
      <GraduationCap className="text-white" size={24} />
      <Bell className="text-white" size={24} />
      <Settings className="text-white" size={24} />
    </nav>
  )
}

export default Navigation