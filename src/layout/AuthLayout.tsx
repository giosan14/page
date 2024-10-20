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
    <div className="flex justify-center relative px-2">
      <div className="w-full max-w-[1300px] flex flex-col pb-4">
      <div className="h-[500px] mt-[70px] mb-4">
          <div
            className={`w-full flex justify-center px-1`}
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