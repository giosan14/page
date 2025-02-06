import { Outlet } from 'react-router-dom';
// import { useAuthStore } from '../stores';
// import alertwaysLogo from '../assets/logo-Alertways.png';
// import { AlertError, AlertSuccess } from '../components/AlertMessages/AlertMessages';
// import { useAlert } from '../hooks/useAlert';

export const AuthLayout = () => {
  // const authStatus = useAuthStore((state: { status: unknown; }) => state.status);
  // const { alertMessage, alertErrorMessage } = useAlert();
  // if(authStatus === 'authorized'){
  //   return <Navigate to='/dashboard/gestion-proyectos'/>
  // }
  
  return (
    <div className="flex justify-center relative px-2 py-5 min-h-screen">
      <div className="w-full max-w-[1300px] justify-center flex flex-col flex-1">
      <div className="mb-4">
          <div
            className={`px-1 flex items-center justify-center left-appear`}
          >
            <Outlet />
          </div>
        </div>
      </div>
      {/* {alertMessage && <AlertSuccess message={alertMessage} />}
      {alertErrorMessage && <AlertError message={alertErrorMessage} />} */}
    </div>
  );
};