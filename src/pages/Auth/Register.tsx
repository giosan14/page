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
import Logo from "../../components/Logo";
import authStore from "../../stores/auth.store";
import { authApi } from "../../api/api-client";
import { toast } from "react-toastify";

export const Register: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const setBasicInfo = authStore((state) => state.setBasicInfo);
  const basicInfo = authStore((state) => state.basicInfo);

  const [selectedCountry, setSelectedCountry] = useState({
    value: "",
    label: "",
  });
  const [selectedState, setSelectedState] = useState({
    value: "",
    label: "",
  });
  const [selectedCity, setSelectedCity] = useState({
    value: "",
    label: "",
  });
  console.log(selectedCity, phone);
  

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
    // municipality: "",
    address1: "",
    addressNumber: "",
  };

  const handleFormikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicInfo({ [name]: value });
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

  const genderOptions = [
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
    { value: "otro", label: "Otro" },
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

  // useEffect(() => {
  //   const updatePostalCode = async () => {
  //     const code = await fetchPostalCode(
  //       selectedCountry,
  //       selectedState,
  //       selectedCity,
  //     );
  //     setPostalCode(code);
  //   };

  //   updatePostalCode();
  // }, [selectedCountry, selectedState, selectedCity]);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Creamos el objeto con la data combinada de Formik y Zustand
    const registerData = {
      ...basicInfo,
    };

    try {
      const response = await authApi.register(registerData); // Llamada al servicio
      console.log("Registro exitoso:", response);
      handleShowModal();
      setBasicInfo({
        type: "",
        name: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        gender: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        // municipality: "",
        address1: "",
        addressNumber: "",
      });
      // Manejar lógica después del registro exitoso (navegación, mensajes, etc.)
    } catch (error) {
      console.error("Error al registrar:", error);
      toast.error("Ocurrio un error al registrarse");
      // Manejar errores aquí
    }
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="max-w-[820px] w-full p-6 flex flex-col justify-start h-auto mx-auto bg-white drop-shadow-card rounded-2xl left-appear">
          <CustomModal
            className="w-full"
            showModal={showModal}
            handleClose={handleShowModal}
          >
            <div className="flex flex-col text-center items-center p-10 gap-3">
              <FaCheckCircle className="text-primary-color text-[60px]" />
              <h1 className="text-xl">
                ¡Datos personales guardados con éxito!
              </h1>
              <p>
                Por favor, llena el formulario de registro de profesionales{" "}
              </p>
              <Button
                onClick={() => navigate("/auth/data-doctor")}
                className="py-2 w-full"
              >
                Continuar
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
          <Logo />
          <div className="flex flex-col sm:items-start items-center gap-6">
            <div className="w-full flex flex-col gap-3 text-center">
              <h1 className="mb-0 text-xl">
                Por favor, llena este formulario para registrarte.
              </h1>
              <p className="mb-7">
                Te enviaremos instrucciones al correo electrónico asociado a tu
                cuenta para verificarla.
              </p>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between gap-6">
              {/* Columna 1 */}
              <div className="flex flex-col gap-4 w-full max-w-[400px]">
                <Input
                  label="Fecha de nacimiento"
                  name="birthday"
                  type="date"
                  value={basicInfo.birthday}
                  onChange={handleFormikChange}
                />
                <div className="w-full">
                  <label className="text-gray-600 text-xs font-semibold">
                    Teléfono
                  </label>
                  <PhoneInput
                    country={"us"}
                    inputStyle={{ width: "100%" }}
                    value={basicInfo.phone}
                    onChange={(phone) => {
                      setPhone(phone);
                      setBasicInfo({ phone });
                    }}
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-semibold">
                    Género
                  </label>
                  <Select
                    options={genderOptions}
                    value={genderOptions.find((gender) => gender.value === basicInfo.gender)}
                    onChange={(option) => {
                      setFieldValue("gender", option?.value);
                      setBasicInfo({ gender: option?.value });
                    }}
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-semibold">
                    País
                  </label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find((country) => country.value === basicInfo.country)}
                    onChange={(option) => {
                      setSelectedCountry(option ?? { value: "", label: "" });
                      setFieldValue("country", option?.value);
                      setBasicInfo({ country: option?.value });
                    }}
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-semibold">
                    Estado/Provincia
                  </label>
                  <Select
                    options={stateOptions}
                    value={stateOptions.find((state) => state.value === basicInfo.state)}
                    onChange={(option) => {
                      setSelectedState(option ?? { value: "", label: "" });
                      setFieldValue("state", option?.value);
                      setBasicInfo({ state: option?.value });
                    }}
                    isDisabled={!selectedCountry}
                  />
                </div>
              </div>

              {/* Columna 2 */}
              <div className="flex flex-col gap-4 w-full max-w-[400px]">
                <div>
                  <label className="text-gray-600 text-xs font-semibold">
                    Municipio/Delegación
                  </label>
                  <Select
                    options={cityOptions}
                    value={cityOptions.find((city) => city.value === basicInfo.city)}
                    onChange={(option) => {
                      setSelectedCity(option ?? { value: "", label: "" });
                      setFieldValue("city", option?.value);
                      setBasicInfo({ city: option?.value });
                    }}
                    isDisabled={!selectedState}
                  />
                </div>
                <Input
                  label="Código Postal"
                  name="postalCode"
                  type="text"
                  value={basicInfo.postalCode}
                  maxLength={7}
                  onChange={handleFormikChange}
                />
                <Input
                  label="Dirección 1"
                  name="address1"
                  type="text"
                  value={basicInfo.address1}
                  onChange={handleFormikChange}
                />
                <Input
                  label="Número de calle"
                  name="addressNumber"
                  type="text"
                  value={basicInfo.addressNumber}
                  onChange={handleFormikChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-12">
            <Button
              type="submit"
              className="py-2 text-base"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Registrarse"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
