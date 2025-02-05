import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import { FaCheckCircle } from "react-icons/fa";
import CustomModal from "../../components/CustomModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { City, Country, State } from "country-state-city";
import Select from "../../components/Select/Select";
import Input from "../../components/Input/Input";
import { Spinner } from "react-bootstrap";
import Logo from "../../components/Logo";
import { LocationOption } from "../../interface/countries.interface";

const ResidenceDetailsForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmitForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  const [selectedCountry, setSelectedCountry] = useState<LocationOption | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<LocationOption | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<LocationOption | null>(null);

  const countryOptions = Country.getAllCountries().map((country, index) => ({
    id: index,
    value: country.isoCode,
    label: country.name,
  }));

  const [stateOptions, setStateOptions] = useState<LocationOption[]>([]);
  const [cityOptions, setCityOptions] = useState<LocationOption[]>([]);
  console.log(countryOptions);
  console.log(cityOptions);
  console.log(selectedCountry);
  console.log(stateOptions);
  console.log(selectedState);
  console.log(selectedCity);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value).map(
        (state, index) => ({
          id: index,
          value: state.isoCode,
          label: state.name,
        })
      );
      setStateOptions(states);
      setSelectedState(null); // Reset state when country changes
      setCityOptions([]); // Clear cities
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry) {
      const cities = City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value
      ).map((city, index) => ({
        id: index,
        value: city.name,
        label: city.name,
      }));
      setCityOptions(cities);
      setSelectedCity(null); // Reset city when state changes
    }
  }, [selectedState, selectedCountry]);

  // useEffect(() => {
  //   const updatePostalCode = async () => {
  //     const code = await fetchPostalCode(
  //       selectedCountry,
  //       selectedState,
  //       selectedCity
  //     );
  //     setPostalCode(code);
  //   };

  //   updatePostalCode();
  // }, [selectedCountry, selectedState, selectedCity]);

  return (
    <>
      <CustomModal
        className="max-w-[370px]"
        showModal={showModal}
        handleClose={handleShowModal}
      >
        <div className="flex flex-col text-center items-center p-10 gap-3">
          <FaCheckCircle className="text-primary-color text-[60px]" />
          <h1 className="text-xl">¡Datos de residencia guardados con éxito!</h1>

          <p>Por favor, verifica tu correo electrónico</p>
          <Button
            onClick={() => navigate("/auth/email-validate")}
            className="py-2 w-full"
          >
            Verificar
          </Button>
        </div>
      </CustomModal>
      <Formik
        initialValues={{
          residences: [
            {
              type: "",
              name: "",
              country: "",
              postalCode: "",
              state: "",
              city: "",
              neighborhood: "",
              street: "",
              interiorNumber: "",
              exteriorNumber: "",
            },
          ],
        }}
        validationSchema={Yup.object({
          residences: Yup.array().of(
            Yup.object({
              type: Yup.string().required(
                "El tipo de residencia es obligatorio"
              ),
              name: Yup.string().required(
                "El nombre de la residencia es obligatorio"
              ),
              country: Yup.string().required("El país es obligatorio"),
              postalCode: Yup.string().required(
                "El código postal es obligatorio"
              ),
              state: Yup.string().required(
                "El estado/provincia es obligatorio"
              ),
              city: Yup.string().required("La ciudad es obligatoria"),
              neighborhood: Yup.string().required("La colonia es obligatoria"),
              street: Yup.string().required("La calle es obligatoria"),
              interiorNumber: Yup.string(),
              exteriorNumber: Yup.string().required(
                "El número exterior es obligatorio"
              ),
            })
          ),
        })}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, setFieldValue, handleChange }) => {
          console.log("Valores del formulario:", values);
          return (
            <Form className="max-w-[820px] w-full p-6 flex flex-col mx-auto bg-white drop-shadow-card rounded-2xl">
              <Logo />
              <h1 className="text-xl mb-4 text-center">
                Información de Atención Medica
              </h1>
              <p className="text-center">
                En este apartado debes agregar la residencia hospitales/clínicas
                o consultorio privado en los cuales ofreces tu servicio. Ingresa
                nombre de hospital/clínica o consultorio junto con la dirección
                en la que reside.
              </p>

              <FieldArray name="residences">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-6">
                    {values.residences.map((residence, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-4 border-b pb-4"
                      >
                        <Input
                          label="Tipo de Residencia"
                          name={`residences.${index}.type`}
                          type="text"
                          placeholder="Clínica, Hospital, etc."
                          value={residence.type}
                          onChange={handleChange}
                        />

                        <Input
                          label="Nombre de Residencia"
                          name={`residences.${index}.name`}
                          placeholder="Ingresa el nombre"
                          value={residence.name}
                          onChange={handleChange}
                        />

                        <div className="w-full text-center border-b border-gray-200">
                          <h5>Ubicación</h5>
                        </div>

                        <div className="flex w-full gap-4">
                          <div className="w-full">
                            <Select
                              label="País"
                              name={`residences.${index}.country`}
                              options={countryOptions}
                              value={residence.country}
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                const selectedCountryObj = countryOptions.find(
                                  (c) => c.id === parseInt(selectedValue)
                                );

                                console.log(
                                  "País seleccionado:",
                                  selectedCountryObj
                                ); // ✅ Ahora sí verás el objeto

                                setSelectedCountry(selectedCountryObj || null);
                                setFieldValue(
                                  `residences.${index}.country`,
                                  selectedValue
                                );
                                setFieldValue(`residences.${index}.state`, ""); // Reset state
                                setFieldValue(`residences.${index}.city`, ""); // Reset city
                              }}
                            />
                          </div>
                          <div className="w-full">
                            <Select
                              label="Estado/Provincia"
                              name={`residences.${index}.state`}
                              options={stateOptions}
                              value={residence.state}
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                const selectedStateObj = stateOptions.find(
                                  (s) => s.id === parseInt(selectedValue)
                                );
                                console.log(
                                  "País seleccionado:",
                                  selectedStateObj
                                ); // ✅ Ahora sí verás el objeto

                                setSelectedState(selectedStateObj || null);
                                setFieldValue(
                                  `residences.${index}.state`,
                                  selectedValue
                                );
                                setFieldValue(`residences.${index}.city`, ""); // Reset city
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex w-full gap-4 items-center">
                          <div className="w-full">
                            <Select
                              label="Ciudad"
                              name={`residences.${index}.city`}
                              options={cityOptions}
                              value={residence.city}
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                const selectedCityObj = cityOptions.find(
                                  (s) => s.id === parseInt(selectedValue)
                                );
                                setSelectedCity(selectedCityObj || null);
                                setFieldValue(
                                  `residences.${index}.city`,
                                  selectedValue
                                );
                              }}
                            />
                          </div>

                          <Input
                            label="Código Postal"
                            name={`residences.${index}.postalCode`}
                            placeholder="Código Postal"
                            value={residence.postalCode}
                            onChange={handleChange}
                          />
                          <Input
                            label="Colonia"
                            name={`residences.${index}.neighborhood`}
                            placeholder="Colonia"
                            value={residence.neighborhood}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex w-full items-center gap-4">
                          <Input
                            label="Calle"
                            name={`residences.${index}.street`}
                            placeholder="Calle"
                            value={residence.street}
                            onChange={handleChange}
                          />

                          <Input
                            label="Número Interior"
                            name={`residences.${index}.interiorNumber`}
                            placeholder="Número Interior"
                            value={residence.interiorNumber}
                            onChange={handleChange}
                          />

                          <Input
                            label="Número Exterior"
                            name={`residences.${index}.exteriorNumber`}
                            placeholder="Número Exterior"
                            value={residence.exteriorNumber}
                            onChange={handleChange}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          Eliminar residencia
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        push({
                          type: "",
                          name: "",
                          country: "",
                          postalCode: "",
                          state: "",
                          city: "",
                          neighborhood: "",
                          street: "",
                          interiorNumber: "",
                          exteriorNumber: "",
                        })
                      }
                      className="py-2 px-4 bg-blue-500 text-white rounded"
                    >
                      Agregar residencia
                    </button>
                  </div>
                )}
              </FieldArray>

              <button
                type="submit"
                className="py-2 px-4 bg-green-500 text-white rounded mt-6"
                onClick={handleSubmitForm}
              >
                {isLoading ? <Spinner /> : "Guardar"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ResidenceDetailsForm;
