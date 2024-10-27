/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import InputPassword from "../../components/InputPassword/InputPassword";
import Button from "../../components/Button/Button";
import PasswordValidationList from "../../components/PasswordValidationList.tsx/PasswordValidationList";
import { useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { validatePassword } from "../../helpers/passwordValidation";
import CustomModal from "../../components/CustomModal";

export const ResetPassword = () => {
  const navigate = useNavigate();
  // const { showErrorAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log(token);
  const [showModal, setShowModal] = useState(false);
  // const { updatePassword, isLoading } = useAuthStore((state) => ({
  //   updatePassword: state.updatePassword,
  //   isLoading: state.isLoading,
  // }));

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  console.log(formData);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResetPassword = async () => {

    setIsLoading(true);
    if (formData?.password && formData?.confirmPassword) {
      setTimeout(() => {
        setIsLoading(false);
        handleShowModal();
      }, 1500);
    }
    // try {
    //   const response = await updatePassword(token ?? "", formData.password);

    //   handleShowModal();

    //   // showErrorAlert(passwordMessage);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // Llamamos a la función de validación
  const passwordValidation = validatePassword(formData.password);
  // Función para determinar si todas las validaciones son true
  const isPasswordValid = Object.values(passwordValidation).every(
    (value) => value === true
  );

  //Función para la comparación de contraseñas
  const isSamePassword = formData.password === formData.confirmPassword;
  console.log(isSamePassword);

  return (
    <div className="max-w-[420px] w-full p-6 flex flex-col justify-center h-[620px] pb-6 mx-auto bg-white drop-shadow-card rounded-2xl left-appear">
      <CustomModal
        className="max-w-[370px]"
        showModal={showModal}
        handleClose={handleShowModal}
      >
        <div className="flex flex-col text-center items-center p-10 gap-3">
          <FaCheckCircle className="text-primary-color text-[60px]" />
          <h1 className="text-xl">Contraseña reestablecida con exito</h1>

          <p>Inicia sesión con la nueva contraseña</p>
          <Button
            onClick={() => navigate("/auth/login")}
            className="py-2 w-full"
          >
            Ingresar
          </Button>
        </div>
      </CustomModal>
      <div className="text-left">
        <h1 className="mb-4 text-2xl font-bold">Cambiar contraseña</h1>
        <p className="mb-7 mt-[-10px]">
          Crea una nueva contraseña para acceder a tu cuenta
        </p>
        <div className="mb-4">
          <InputPassword
            label="Nueva contraseña"
            name="password"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 relative">
          <InputPassword
            label="Confirmar contraseña"
            name="confirmPassword"
            autoComplete="off"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {!isSamePassword ? (
          <div className="bg-red-200 mb-4 rounded-md py-1">
            <label className="text-red-600 font-medium flex items-center gap-2 px-5 text-base">
              <IoIosWarning /> Las contraseñas no son iguales
            </label>
          </div>
        ) : null}

        {/* Indicadores de validación */}
        <PasswordValidationList validation={passwordValidation} />

        <div className="flex w-full justify-between items-center gap-8 mt-10">
          <Button
            onClick={() => navigate("/auth/login")}
            className="py-2 px-12"
            color="white"
          >
            Cancelar
          </Button>
          <Button
            className="py-2 px-12"
            disabled={
              !formData.confirmPassword ||
              !formData.password ||
              !isPasswordValid ||
              !isSamePassword
            }
            onClick={handleResetPassword}
          >
            {isLoading ? <Spinner size="sm" /> : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
