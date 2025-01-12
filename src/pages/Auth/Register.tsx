// Register.tsx
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import CustomModal from '../../components/CustomModal';
import Button from '../../components/Button/Button';
import CustomInput from '../../components/CustomInput';
import { Spinner } from 'react-bootstrap';

export const Register: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const initialValues = {
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
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Nombre es obligatorio"),
    lastName: Yup.string().required("Apellido es obligatorio"),
    username: Yup.string().required("Nombre de usuario es obligatorio"),
    phoneNumber: Yup.string().required("Número de teléfono es obligatorio"),
    birthday: Yup.date().required("Fecha de nacimiento es obligatoria"),
    gender: Yup.string().required("Género es obligatorio"),
    country: Yup.string().required("País es obligatorio"),
    cityStateProvince: Yup.string().required("Ciudad/Estado/Provincia es obligatorio"),
    cp: Yup.string().required("Código postal es obligatorio"),
    interests: Yup.string(),
    hobbies: Yup.string(),
  });

  const handleRegister = async (values: typeof initialValues) => {
    setIsLoading(true);
    if (values.firstName) {
      setTimeout(() => {
        setIsLoading(false);
        handleShowModal();
      }, 1500);
    }
  };

  const inputFieldsColumn1 = [
    { label: "Nombre(s)", name: "firstName", type: "string"},
    { label: "Apellido(s)", name: "lastName", type: "string" },
    { label: "Nombre de usuario", name: "username", type: "string" },
    { label: "Número de teléfono", name: "phoneNumber", type: "string" },
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-[820px] w-full p-6 flex flex-col justify-start h-auto mx-auto bg-white drop-shadow-card rounded-2xl left-appear">
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
              <Button onClick={() => navigate("/auth/form-doctor")} className="py-2 w-full">
                Validar correo
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

          <div className="flex flex-col sm:flex-row sm:items-end items-center mt-10 gap-3">
            <div className="max-w-[400px] flex flex-col gap-3">
              <h1 className="mb-2 mt-2 text-xl">
                Por favor, llena este formulario para registrarte.
              </h1>
              <p className="mb-7">
                Te enviaremos instrucciones al correo electrónico asociado a tu cuenta para verificarla.
              </p>
              {inputFieldsColumn1.map(({ label, name, type = "text" }) => (
                <CustomInput className='flex flex-col' key={name} label={label} name={name} type={type} />
              ))}
            </div>

            <div className="w-full max-w-[400px] flex flex-col gap-3">
              {inputFieldsColumn2.map(({ label, name, type = "text" }) => (
                <CustomInput className='flex flex-col' key={name} label={label} name={name} type={type} />
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center mt-12">
            <Button disabled={isSubmitting} type="submit" className="py-2 text-base">
              {isLoading ? <Spinner size="sm" /> : "Registrarse"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
