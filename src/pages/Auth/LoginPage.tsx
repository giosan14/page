import { FormEvent, SetStateAction, useState } from "react";
import Input from "../../components/Input/Input";
import InputPassword from "../../components/InputPassword/InputPassword";
import Button from "../../components/Button/Button";
import TextButton from "../../components/TextButton/TextButton";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import Logo from "../../components/Logo";
import { authApi } from "../../api/api-client";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
  
    setIsLoading(true);
  
    try {
      if (email && password) {
        console.log(email.value, password.value);
        await authApi.login(email.value.trim(), password.value.trim());
        localStorage.removeItem("error");
        navigate("/dashboard"); 
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return <div>Cargando..</div>;
  }

  return (
    <div className="max-w-[420px] w-full flex flex-col justify-center h-auto py-8 mx-auto bg-white drop-shadow-card rounded-2xl left-appear">
     <Logo/>

      <form
        className="px-12 w-full flex flex-col  text-center"
        onSubmit={onSubmit}
      >
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

        <div className="flex flex-col w-full items-center gap-3">
          <Button
            className="py-2 px-4 text-base"
            type="submit"
            disabled={!email || !password}
          >
            {isLoading ? (
              <Spinner size="sm" className="text-white" />
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </div>
      </form>
      <div className="w-full flex flex-col gap-3 items-center mt-4">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Inicio de sesión exitoso:", credentialResponse);
            // Aquí puedes guardar el token si necesitas almacenarlo

            // Redirige a /dashboard
            navigate("/dashboard");
          }}
          onError={() => {
            console.error("Error al iniciar sesión con Google");
          }}
        />
        <TextButton
          className="text-sm text-primary-color hover:text-blue-900"
          onClick={() => navigate("/auth/welcome")}
        >
          ¿Aún no tienes una cuenta?, registrate.
        </TextButton>

        <TextButton
          className="text-sm text-primary-color hover:text-blue-900"
          onClick={() => navigate("/auth/forgot-password")}
        >
          ¿Olvidaste tu contraseña?
        </TextButton>
      </div>
    </div>
  );
};
