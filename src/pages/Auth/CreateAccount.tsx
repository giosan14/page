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
import Input from "../../components/Input/Input";
import Logo from "../../components/Logo";
import authStore from "../../stores/auth.store";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setBasicInfo = authStore((state) => state.setBasicInfo);
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log(token);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
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
    setBasicInfo({
      [name]: value, 
    });
  };

  const handleCreateAccount = async () => {
    setIsLoading(true);
    if (formData?.password && formData?.confirmPassword) {
      setTimeout(() => {
        setIsLoading(false);
        handleShowModal();
      }, 1500);
    }
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
    <div className="max-w-[520px] w-full p-6 flex flex-col justify-center h-auto pb-6 mx-auto bg-white drop-shadow-card rounded-2xl left-appear">
      <CustomModal
        className="w-full"
        showModal={showModal}
        handleClose={handleShowModal}
      >
        <div className="flex flex-col text-center items-center p-10 gap-3">
          <FaCheckCircle className="text-primary-color text-[60px]" />
          <h1 className="text-xl">Cuenta creada con éxito</h1>

          <p>Sigue adelante con el registro de información</p>
          <Button
            onClick={() => navigate("/auth/register")}
            className="py-2 w-full"
          >
            Continuar
          </Button>
        </div>
      </CustomModal>
      <div className="text-left">
        <Logo />
        <h1 className="mb-4 text-2xl font-bold text-center">Primeros pasos</h1>
        <p className="mb-7 mt-[-10px] text-center">
          Por favor ingresa estos datos para crear tu cuenta.
        </p>
        <div className="mb-4">
          <div className="flex items-center mb-4 gap-4">
            <Input
              label="Nombre(s)"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Apellido(s)"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <Input
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <InputPassword
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 relative">
          <InputPassword
            label="Confirmar contraseña"
            name="confirmPassword"
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
              !isSamePassword ||
              !formData.email ||
              !formData.name ||
              !formData.lastname
            }
            onClick={handleCreateAccount}
          >
            {isLoading ? <Spinner size="sm" /> : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
