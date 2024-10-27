import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import CustomModal from "../../components/CustomModal";

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    gender: "",
    country: "",
    cityStateProvince: "",
    cp: "",
    interests: "",
    hobbies: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    setIsLoading(true);
    if (formData.email) {
      setTimeout(() => {
        setIsLoading(false);
        handleShowModal();
      }, 1500);
    }
  };

  const inputFieldsColumn1 = [
    { label: "Nombre(s)", name: "firstName" },
    { label: "Apellido(s)", name: "lastName" },
    { label: "Nombre de usuario", name: "username" },
    { label: "Correo electrónico", name: "email", type: "email" },
    { label: "Número de teléfono", name: "phoneNumber" },
  ];

  const inputFieldsColumn2 = [
    { label: "Fecha de nacimiento", name: "birthday", type: "date" },
    { label: "Género", name: "gender" },
    { label: "País", name: "country" },
    { label: "Ciudad / Estado / Provincia", name: "cityStateProvince" },
    { label: "Código Postal", name: "cp" },
    { label: "Intereses", name: "interests" },
    { label: "Aficiones", name: "hobbies" },
  ];

  return (
    <div className="max-w-[820px] w-full p-6 flex flex-col justify-start h-auto mx-auto bg-white drop-shadow-card rounded-2xl left-appear">
      {/* MODAL */}
      <CustomModal
        className="max-w-[370px]"
        showModal={showModal}
        handleClose={handleShowModal}
      >
        <div className="flex flex-col text-center items-center p-10 gap-3">
          <FaCheckCircle className="text-primary-color text-[60px]" />
          <h1 className="text-xl">¡Registro exitoso!</h1>
          <p>Te enviamos un correo para verificar tu cuenta</p>
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
        <IoIosArrowBack />
        Regresar
      </button>

      <div className="flex items-end mt-10 gap-3">
        <div className="max-w-[400px] flex flex-col gap-3">
          <h1 className="mb-2 mt-2 text-xl">
            Por favor, llena este formulario para registrarte.
          </h1>
          <p className="mb-7">
            Te enviaremos instrucciones al correo electrónico asociado a tu cuenta para verificarla.
          </p>
          {inputFieldsColumn1.map(({ label, name, type = "text" }) => (
            <Input
              key={name}
              label={label}
              name={name}
              type={type}
              onChange={handleInputChange}
            />
          ))}
        </div>

        <div className="w-full max-w-[400px] flex flex-col gap-3">
          {inputFieldsColumn2.map(({ label, name, type = "text" }) => (
            <Input
              key={name}
              label={label}
              name={name}
              type={type}
              onChange={handleInputChange}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center mt-12">
        <Button
          disabled={!formData.email}
          onClick={handleRegister}
          className="py-2 text-base"
        >
          {isLoading ? <Spinner size="sm" /> : "Registrarse"}
        </Button>
      </div>
    </div>
  );
};
