import React, { useState, useEffect } from "react";
import { SiCircleci } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const [mainText, setMainText] = useState<string>("");
  const [subText, setSubText] = useState<string>("");
  const [showButtons, setShowButtons] = useState<boolean>(false); // Controla la visibilidad de los botones
  const navigate = useNavigate();
  useEffect(() => {
    const typeText = (
      text: string,
      setter: React.Dispatch<React.SetStateAction<string>>,
      delay: number
    ) => {
      let i = 0;
      const interval = setInterval(() => {
        setter(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, delay);
    };

    typeText("Bienvenido a Nexus", setMainText, 100);

    setTimeout(() => {
      typeText(
        "Por favor, indícanos qué tipo de usuario eres:",
        setSubText,
        50
      );
    }, 2000);

    // Mostrar los botones después de que el texto se complete
    setTimeout(() => {
      setShowButtons(true);
    }, 4000); // Ajusta el tiempo según la duración del texto
  }, []);

  const handleUserType = (type: "Doctor" | "Paciente") => {
    console.log(`El usuario seleccionó: ${type}`);
    navigate(`/auth/register`);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[800px] w-full">
      <div className="p-8 rounded-lg text-center">
        <h1 className="text-7xl font-bold text-gray-800 mb-4">
          {mainText.split("Nexus")[0]}
          {mainText.includes("Nexus") && (
            <span className="text-primary-color">Nexus</span>
          )}
        </h1>

        <div className="p-6 flex w-full justify-center flex-col items-center">
          <SiCircleci className="text-primary-color" size={45} />
          <p>Nexus</p>
        </div>
        <p className="text-gray-600 mb-6 text-xl">{subText}</p>
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
