import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import CustomModal from "../../components/CustomModal";
import Logo from "../../components/Logo";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { recoveryPassword, isLoading } = useAuthStore((state) => ({
  //   recoveryPassword: state.recoveryPassword,
  //   isLoading: state.isLoading,
  // }));

  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const navigate = useNavigate();

  const handleRecoveryPassword = async () => {
    setIsLoading(true);
    if (email) {
      setTimeout(() => {
        setIsLoading(false);
        handleShowModal();
      }, 1500);
    }
    // try {
    //   const response = await recoveryPassword(email);
    //   console.log(response);
    //   handleShowModal();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="max-w-[520px] w-full p-6 flex flex-col justify-start h-[620px] mx-auto bg-white drop-shadow-card rounded-2xl left-appear">
      {/* MODAL */}
      <CustomModal
        className="w-full"
        showModal={showModal}
        handleClose={handleShowModal}
      >
        <div className="flex flex-col text-center items-center p-10 gap-3">
          <FaCheckCircle className="text-primary-color text-[60px]" />
          <h1 className="text-xl">Contraseña reestablecida con exito</h1>
          <p>
            El correo contiene las instrucciones para reestablecer la contraseña
          </p>
          <p>Recuerda revisar tu carpeta de spam</p>
          <Button
            onClick={() => navigate("/auth/login")}
            className="py-2 w-full"
          >
            Ingresar
          </Button>
        </div>
      </CustomModal>

      {/* CONTENIDO */}
      <button
        className="text-primary-color flex items-center gap-2 text-base"
        onClick={() => navigate("/auth/login")}
      >
        {" "}
        <IoIosArrowBack />
        Regresar
      </button>
      <Logo />
      <div className="mt-5">
        <h1 className="mb-2 mt-2 text-xl">
          Ingresa tu correo eléctronico para restablecer tu contraseña
        </h1>
        <p className="mb-7">
          Te enviaremos instrucciones al correo electrónico asociado a tu cuenta
          para recuperarla
        </p>
        <Input
          label="Correo electrónico"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-center mt-12">
        <Button
          disabled={!email}
          onClick={handleRecoveryPassword}
          className="py-2 text-base"
        >
          {isLoading ? <Spinner size="sm" /> : "Reestablecer contraseña"}
        </Button>
      </div>
    </div>
  );
};
