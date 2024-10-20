import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useRole } from '../helpers/useRole';

const RedirectBasedOnRole = () => {
  const navigate = useNavigate();
  // const role = useRole();
  const role: string = "Admin";

  useEffect(() => {
    switch (role) {
      case 'Technician':
        navigate('/dashboard');
        break;
      case 'Admin':
        navigate('/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  }, [navigate, role]);

  return null;
};

export default RedirectBasedOnRole;
