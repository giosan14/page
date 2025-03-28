import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import authStore from "../../stores/auth.store";

const Welcome: React.FC = () => {
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const navigate = useNavigate();
  const setBasicInfo = authStore((state) => state.setBasicInfo);
  useEffect(() => {
    setTimeout(() => {
      setShowButtons(true);
    }, 100);
  }, []);

  const handleUserType = (type: "Doctor" | "Paciente") => {
    console.log(`El usuario seleccionó: ${type}`);
    // Actualizamos el tipo en el estado global
    setBasicInfo({ type });
    navigate(`/auth/create-account`);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[800px] w-full">
      <div className="p-8 rounded-lg text-center">
        {/* <h1 className="text-7xl font-bold text-gray-800 mb-4">
          {mainText.split("XinapX")[0]}
          {mainText.includes("XinapX") && (
            <span className="text-primary-color">XinapX</span>
          )}
        </h1> */}
        <h1 className="text-7xl font-bold text-gray-800 mb-4">
          Bienvenido a <span className="text-primary-color">XinapX</span>
        </h1>
        <Logo />
        {/* <p className="text-gray-600 mb-6 text-xl">{subText}</p> */}
        <p className="text-gray-600 mb-6 text-xl">
          Por favor, indícanos qué tipo de usuario eres:
        </p>
      </div>

      {/* Botones con animación */}
      <div
        className={`flex gap-4 w-full justify-between transition-opacity duration-1000 ${
          showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <button
          onClick={() => handleUserType("Doctor")}
          className="py-10 px-16 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400"
        >
          Soy Doctor
        </button>
        <button
          onClick={() => handleUserType("Paciente")}
          className="py-10 px-16 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
        >
          Soy Paciente
        </button>
      </div>
    </div>
  );
};

export default Welcome;
