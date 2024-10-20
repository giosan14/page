import { FormEvent, SetStateAction, useState } from "react";
// import { useAuthStore } from "../../stores/auth/auth.store";
// import { LoadingStatus } from "../../components/LoadingStatus";
// import { FaUser, FaLock } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { CONST_AUTH } from "./ConstantsAuth";
import Input from "../../components/Input/Input";
import InputPassword from "../../components/InputPassword/InputPassword";
import Button from "../../components/Button/Button";
import TextButton from "../../components/TextButton/TextButton";
import { SiCircleci } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
// import Button from "../../components/Button/Button";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const loginUser = useAuthStore((state) => state.loginUser);
  // const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { showAlert } = useAlert();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    
    setIsLoading(true);
    if (email && password) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard")
      }, 1500);
    }
    console.log(email.value, password.value);

    // await loginUser(email.value.trim(), password.value.trim())
    //   .then(() => {
    //     setIsLoading(false);
    //     // showAlert(`¡Bienvenido al Portal Evaluaciones!`);
    //     localStorage.removeItem("error");
    //   })
    //   .catch((error: Error) => {
    //     setIsLoading(false);
    //     const storedError = localStorage.getItem("error");
    //     setLoginError(storedError ?? error.message);
    //   });
  };

  // if (isLoading) {
  //   return <div>Cargando..</div>;
  // }

  return (
    <div className="max-w-[420px] w-full flex flex-col justify-center h-[620px] pb-6 mx-auto bg-white drop-shadow-card rounded-2xl">
      <div className="p-6 flex w-full justify-center flex-col items-center">
        <SiCircleci className="text-blue-600" size={45} />
        <p>Nexus</p>
      </div>

      <form className="px-12 w-full flex flex-col  text-center" onSubmit={onSubmit}>
        <h1 className="mt-3 text-xl mb-10 text-main-black-100 font-bold">
          Iniciar Sesión
        </h1>
        <div className="mb-8">
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={email}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="mb-14 relative">
          <InputPassword
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setPassword(e.target.value)
            }
          />
        </div>

        {/* {loginError ? (
          <div className="bg-red-200 mb-4 rounded-md py-1">
            <label className="text-red-600 font-medium flex items-center gap-2 px-5">
              <IoIosWarning /> {loginError}
            </label>
          </div>
        ) : null} */}
        <div className="flex flex-col w-full items-center gap-3">
          <Button
            className="py-2 px-4 text-base"
            type="submit"
            disabled={!email || !password}
          >
           {isLoading ? <Spinner size="sm" className="text-white"/> :  "Iniciar sesión"}
          </Button>
          <TextButton className="text-sm" onClick={() => {}}>
            ¿Olvidaste tu contraseña?
          </TextButton>
        </div>
      </form>
    </div>
  );
};
