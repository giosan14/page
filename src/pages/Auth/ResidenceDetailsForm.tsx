import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import { FaCheckCircle, FaFileMedical } from "react-icons/fa";
import CustomModal from "../../components/CustomModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

type Professional = {
  licenseNumber: string;
  specialty: string;
};

type FormValues = {
  professionals: Professional[];
};

const initialValues: FormValues = {
  professionals: [{ licenseNumber: "", specialty: "" }],
};

const validationSchema = Yup.object({
  professionals: Yup.array().of(
    Yup.object({
      licenseNumber: Yup.string().required("Número de cédula es obligatorio"),
      specialty: Yup.string().required("Especialidad es obligatoria"),
    })
  ),
});

const ResidenceDetailsForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmitForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Submitted values:", values);
  };

  return (
    <>
      <CustomModal
        className="max-w-[370px]"
        showModal={showModal}
        handleClose={handleShowModal}
      >
        <div className="flex flex-col text-center items-center p-10 gap-3">
          <FaCheckCircle className="text-primary-color text-[60px]" />
          <h1 className="text-xl">Datos profesionales guardados</h1>

          <p>¡Ya casi! Estas muy cerca de terminar tu proceso de registro</p>
          <Button
            onClick={() => navigate("/auth/email-validate")}
            className="py-2 w-full"
          >
            Continuar
          </Button>
        </div>
      </CustomModal>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="max-w-[820px] w-full p-6 flex flex-col mx-auto bg-white drop-shadow-card rounded-2xl">
            <h1 className="text-xl mb-4">Información de Atención Medica</h1>
            <span className="w-full flex justify-center">
              <FaFileMedical className="text-primary-color" size={50} />
            </span>
            <p className="mt-4">
              En este apartado debes agregar la residencia hospitales/clínicas o
              consultorio privado en los cuales ofreces tu servicio. Ingresa
              nombre de hospital/clínica o consultorio junto con la dirección en
              la que reside.
            </p>
            <p>
              {" "}
              Se requiere al menos una cédula ingresada para dar de alta su
              registro en XinapX.
            </p>
            <FieldArray name="professionals">
              {({ push, remove }) => (
                <div className="flex flex-col gap-6">
                  {values.professionals.map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-end gap-4 border-b pb-4"
                    >
                      <div className="flex flex-col w-full">
                        <label htmlFor={`professionals.${index}.licenseNumber`}>
                          Número de Cédula Profesional
                        </label>
                        <Field
                          name={`professionals.${index}.licenseNumber`}
                          placeholder="Ingresa el número de cédula"
                          className="border p-2 rounded"
                        />
                        {/* {(errors?.professionals as Professional[])[index]
                        ?.licenseNumber &&
                        touched.professionals?.[index]?.licenseNumber && (
                            <div className="text-red-500 text-sm">
                            {
                                (errors.professionals as Professional[])[index]
                                ?.licenseNumber
                                }
                          </div>
                          )} */}
                      </div>

                      <div className="flex flex-col w-full">
                        <label htmlFor={`professionals.${index}.specialty`}>
                          Especialidad
                        </label>
                        <Field
                          as="select"
                          name={`professionals.${index}.specialty`}
                          className="border p-2 rounded"
                        >
                          <option value="">Selecciona una especialidad</option>
                          <option value="Medicina General">
                            Medicina General
                          </option>
                          <option value="Odontología">Odontología</option>
                          <option value="Psicología">Psicología</option>
                          {/* Agrega más opciones según sea necesario */}
                        </Field>
                        {/* {(errors?.professionals as Professional[])[index]
                        ?.specialty &&
                        touched.professionals?.[index]?.specialty && (
                          <div className="text-red-500 text-sm">
                          {
                              (errors.professionals as Professional[])[index]
                                ?.specialty
                            }
                            </div>
                        )} */}
                      </div>
                      <div>
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          className="py-2 px-3"
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div>
                    <Button
                      type="button"
                      onClick={() =>
                        push({
                          licenseNumber: "",
                          specialty: "",
                        })
                      }
                      className="py-2"
                    >
                      Agregar más cédulas
                    </Button>
                  </div>
                </div>
              )}
            </FieldArray>

            <div className="mt-6 w-full flex justify-center">
              <Button type="submit" className="py-2" onClick={handleSubmitForm}>
                {isLoading ? <Spinner size="sm" /> : "Guardar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ResidenceDetailsForm;
