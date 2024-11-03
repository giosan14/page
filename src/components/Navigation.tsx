import React from 'react'
import { Grid, Home, FileText, GraduationCap, Bell, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token de Google del almacenamiento local
    localStorage.removeItem('googleToken');

    // Redirige al usuario a la página de inicio de sesión
    navigate('/auth/login');
  };
  return (
    <nav className="nav-gradient w-16 flex flex-col items-center py-8 space-y-8">
      <Grid className="text-white" size={24} />
      <Home className="text-white" size={24} />
      <FileText className="text-white" size={24} />
      <GraduationCap className="text-white" size={24} />
      <Bell className="text-white" size={24} />
      <Settings onClick={handleLogout} className="text-white cursor-pointer" size={24} />
    </nav>
  )
}

export default Navigation