import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import CustomModal from "../../components/CustomModal";
import Button from "../../components/Button/Button";
import { Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import Input from "../../components/Input/Input";

export const Register: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const navigate = useNavigate();

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const initialValues = {
    birthday: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    municipality: "",
    address1: "",
    addressNumber: "",
  };

  const validationSchema = Yup.object({
    birthday: Yup.date().required("Fecha de nacimiento es obligatoria"),
    gender: Yup.string().required("Género es obligatorio"),
    country: Yup.string().required("País es obligatorio"),
    state: Yup.string().required("Estado/Provincia es obligatorio"),
    city: Yup.string().required("Ciudad es obligatoria"),
    postalCode: Yup.string().required("Código postal es obligatorio"),
    municipality: Yup.string().required("Municipio/Delegación es obligatorio"),
    address1: Yup.string().required("Dirección 1 es obligatoria"),
    addressNumber: Yup.string().required("Número de calle es obligatorio"),
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

  const genderOptions = [
    { value: "male", label: "Masculino" },
    { value: "female", label: "Femenino" },
    { value: "other", label: "Otro" },
  ];

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry?.value, selectedState?.value).map(
        (city) => ({
          value: city.name,
          label: city.name,
        })
      )
    : [];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({ setFieldValue }) => (
        <Form className="max-w-[820px] w-full p-6 flex flex-col justify-start h-auto mx-auto bg-white drop-shadow-card rounded-2xl left-appear">
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
                onClick={() => navigate("/auth/form-doctor")}
                className="py-2 w-full"
              >
                Validar correo
              </Button>
            </div>
          </CustomModal>

          <button
            className="text-primary-color flex items-center gap-2 text-base"
            onClick={() => navigate("/auth/login")}
          >
            <IoIosArrowBack />
            Regresar
          </button>

          <div className="flex flex-col sm:items-start items-center mt-10 gap-6">
            <div className="w-full flex flex-col gap-3">
              <h1 className="mb-0 mt-2 text-xl">
                Por favor, llena este formulario para registrarte.
              </h1>
              <p className="mb-7">
                Te enviaremos instrucciones al correo electrónico asociado a tu
                cuenta para verificarla.
              </p>
            </div>
            <div className="w-full flex justify-between gap-6">
              {/* Columna 1 */}
              <div className="flex flex-col gap-4 w-full max-w-[400px]">
                <Input
                  label="Fecha de nacimiento"
                  name="birthday"
                  type="date"
                />
                <div className="w-full">
                  <label className="text-gray-600 text-xs font-semibold">Teléfono</label>
                  <PhoneInput
                    country={"us"}
                    inputStyle={{width: '100%'}}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-semibold">Género</label>
                  <Select
                    options={genderOptions}
                    onChange={(option) =>
                      setFieldValue("gender", option?.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-semibold">País</label>
                  <Select
                    options={countryOptions}
                    onChange={(option) => {
                      setSelectedCountry(option);
                      setFieldValue("country", option?.value);
                    }}
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-semibold">Estado/Provincia</label>
                  <Select
                    options={stateOptions}
                    onChange={(option) => {
                      setSelectedState(option);
                      setFieldValue("state", option?.value);
                    }}
                  />
                </div>
              </div>

              {/* Columna 2 */}
              <div className="flex flex-col gap-4 w-full max-w-[400px]">
                <div>
                  <label className="text-gray-600 text-xs font-semibold">Ciudad</label>
                  <Select
                    options={cityOptions}
                    onChange={(option) => setFieldValue("city", option?.value)}
                  />
                </div>
                <Input label="Código Postal" name="postalCode" type="text" />
                <Input
                  label="Municipio/Delegación"
                  name="municipality"
                  type="text"
                />
                <Input label="Dirección 1" name="address1" type="text" />
                <Input
                  label="Número de calle"
                  name="addressNumber"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-12">
            <Button type="submit" className="py-2 text-base">
              {isLoading ? <Spinner size="sm" /> : "Registrarse"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
