import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import CustomModal from "../../components/CustomModal";

// Lista de países (puedes agregar más o importarlos de una lista externa)
const countries = [
"AFGANISTAN",
"ALBANIA",
"ALEMANIA",
"ANDORRA",
"ANGOLA",
"ANGUILLA",
"ANTIGUA Y BARBUDA",
"ANTILLAS HOLANDESAS",
"ARABIA SAUDI",
"ARGELIA",
"ARGENTINA",
"ARMENIA",
"ARUBA",
"AUSTRALIA",
"AUSTRIA",
"AZERBAIYAN",
"BAHAMAS",
"BAHREIN",
"BANGLADESH",
"BARBADOS",
"BELARUS",
"BELGICA",
"BELICE",
"BENIN",
"BERMUDAS",
"BHUTÁN",
"BOLIVIA",
"BOSNIA Y HERZEGOVINA",
"BOTSWANA",
"BRASIL",
"BRUNEI",
"BULGARIA",
"BURKINA FASO",
"BURUNDI",
"CABO VERDE",
"CAMBOYA",
"CAMERUN",
"CANADA",
"CHAD",
"CHILE",
"CHINA",
"CHIPRE",
"COLOMBIA",
"COMORES",
"CONGO",
"COREA",
"COREA DEL NORTE ",
"COSTA DE MARFIL",
"COSTA RICA",
"CROACIA",
"CUBA",
"DINAMARCA",
"DJIBOUTI",
"DOMINICA",
"ECUADOR",
"EGIPTO",
"EL SALVADOR",
"EMIRATOS ARABES UNIDOS",
"ERITREA",
"ESLOVENIA",
"ESPAÑA",
"ESTADOS UNIDOS DE AMERICA",
"ESTONIA",
"ETIOPIA",
"FIJI",
"FILIPINAS",
"FINLANDIA",
"FRANCIA",
"GABON",
"GAMBIA",
"GEORGIA",
"GHANA",
"GIBRALTAR",
"GRANADA",
"GRECIA",
"GROENLANDIA",
"GUADALUPE",
"GUAM",
"GUATEMALA",
"GUAYANA FRANCESA",
"GUERNESEY",
"GUINEA",
"GUINEA ECUATORIAL",
"GUINEA-BISSAU",
"GUYANA",
"HAITI",
"HONDURAS",
"HONG KONG",
"HUNGRIA",
"INDIA",
"INDONESIA",
"IRAN",
"IRAQ",
"IRLANDA",
"ISLA DE MAN",
"ISLA NORFOLK",
"ISLANDIA",
"ISLAS ALAND",
"ISLAS CAIMÁN",
"ISLAS COOK",
"ISLAS DEL CANAL",
"ISLAS FEROE",
"ISLAS MALVINAS",
"ISLAS MARIANAS DEL NORTE",
"ISLAS MARSHALL",
"ISLAS PITCAIRN",
"ISLAS SALOMON",
"ISLAS TURCAS Y CAICOS",
"ISLAS VIRGENES BRITANICAS",
"ISLAS VÍRGENES DE LOS ESTADOS UNIDOS",
"ISRAEL",
"ITALIA",
"JAMAICA",
"JAPON",
"JERSEY",
"JORDANIA",
"KAZAJSTAN",
"KENIA",
"KIRGUISTAN",
"KIRIBATI",
"KUWAIT",
"LAOS",
"LESOTHO",
"LETONIA",
"LIBANO",
"LIBERIA",
"LIBIA",
"LIECHTENSTEIN",
"LITUANIA",
"LUXEMBURGO",
"MACAO",
"MACEDONIA ",
"MADAGASCAR",
"MALASIA",
"MALAWI",
"MALDIVAS",
"MALI",
"MALTA",
"MARRUECOS",
"MARTINICA",
"MAURICIO",
"MAURITANIA",
"MAYOTTE",
"MEXICO",
"MICRONESIA",
"MOLDAVIA",
"MONACO",
"MONGOLIA",
"MONTENEGRO",
"MONTSERRAT",
"MOZAMBIQUE",
"MYANMAR",
"NAMIBIA",
"NAURU",
"NEPAL",
"NICARAGUA",
"NIGER",
"NIGERIA",
"NIUE",
"NORUEGA",
"NUEVA CALEDONIA",
"NUEVA ZELANDA",
"OMAN",
"OTROS PAISES  O TERRITORIOS DE AMERICA DEL NORTE",
"OTROS PAISES O TERRITORIOS  DE SUDAMERICA",
"OTROS PAISES O TERRITORIOS DE AFRICA",
"OTROS PAISES O TERRITORIOS DE ASIA",
"OTROS PAISES O TERRITORIOS DE LA UNION EUROPEA",
"OTROS PAISES O TERRITORIOS DE OCEANIA",
"OTROS PAISES O TERRITORIOS DEL CARIBE Y AMERICA CENTRAL",
"OTROS PAISES O TERRITORIOS DEL RESTO DE EUROPA",
"PAISES BAJOS",
"PAKISTAN",
"PALAOS",
"PALESTINA",
"PANAMA",
"PAPUA NUEVA GUINEA",
"PARAGUAY",
"PERU",
"POLINESIA FRANCESA",
"POLONIA",
"PORTUGAL",
"PUERTO RICO",
"QATAR",
"REINO UNIDO",
"REP.DEMOCRATICA DEL CONGO",
"REPUBLICA CENTROAFRICANA",
"REPUBLICA CHECA",
"REPUBLICA DOMINICANA",
"REPUBLICA ESLOVACA",
"REUNION",
"RUANDA",
"RUMANIA",
"RUSIA",
"SAHARA OCCIDENTAL",
"SAMOA",
"SAMOA AMERICANA",
"SAN BARTOLOME",
"SAN CRISTOBAL Y NIEVES",
"SAN MARINO",
"SAN MARTIN (PARTE FRANCESA)",
"SAN PEDRO Y MIQUELON ",
"SAN VICENTE Y LAS GRANADINAS",
"SANTA HELENA",
"SANTA LUCIA",
"SANTA SEDE",
"SANTO TOME Y PRINCIPE",
"SENEGAL",
"SERBIA",
"SEYCHELLES",
"SIERRA LEONA",
"SINGAPUR",
"SIRIA",
"SOMALIA",
"SRI LANKA",
"SUDAFRICA",
"SUDAN",
"SUECIA",
"SUIZA",
"SURINAM",
"SVALBARD Y JAN MAYEN",
"SWAZILANDIA",
"TADYIKISTAN",
"TAILANDIA",
"TANZANIA",
"TIMOR ORIENTAL",
"TOGO",
"TOKELAU",
"TONGA",
"TRINIDAD Y TOBAGO",
"TUNEZ",
"TURKMENISTAN",
"TURQUIA",
"TUVALU",
"UCRANIA",
"UGANDA",
"URUGUAY",
"UZBEKISTAN",
"VANUATU",
"VENEZUELA",
"VIETNAM",
"WALLIS Y FORTUNA",
"YEMEN",
"ZAMBIA",
"ZIMBABWE",


];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

        <div className="w-full max-w-[400px] flex flex-col gap-2">
          

          {/* Selección del país */}
          <label className="text-gray-500 text-sm font-semibold">País</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-2 bg-white text-black text-base"
          >
            <option value="">Selecciona tu país</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
            {/* Selección de género */}
          <label className="text-gray-500 text-sm font-semibold ">Género</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-2 bg-white text-black text-base"
          >
            <option value="">Selecciona tu género</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="otro">Otro</option>
          </select>
          {/* Otros campos de entrada */}
          {inputFieldsColumn2.map(({ label, name, type = "text" }) => (
            name !== "country" && ( // Excluir el campo "country" aquí
              <Input
                key={name}
                label={label}
                name={name}
                type={type}
                onChange={handleInputChange}
              />
            )
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
