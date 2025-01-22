/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import CustomModal from "../../components/CustomModal";
import OTPInput from "react-otp-input";
import classNames from "classnames";
import Logo from "../../components/Logo";

export const PhoneValidate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleOtpSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  const handleResendCode = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      // Add logic to resend the OTP code
      console.log("Resending code...");
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  return (
    <div className="max-w-[520px] w-full p-6 flex flex-col justify-start h-auto pb-6 mx-auto bg-white drop-shadow-card rounded-2xl left-appear">
      <CustomModal
        className="max-w-[370px]"
        showModal={showModal}
        handleClose={handleShowModal}
      >
        <div className="flex flex-col text-center items-center p-10 gap-3">
          <FaCheckCircle className="text-primary-color text-[60px]" />
          <h1 className="text-xl">Número de celular verificado con éxito</h1>

          <p>¡Terminamos!. Inicia sesión por favor</p>
          <Button
            onClick={() => navigate("/auth/login")}
            className="py-2 w-full"
          >
            Iniciar sesión
          </Button>
        </div>
      </CustomModal>
      <div className="text-left flex flex-col h-full">
        <div className="mb-4 text-center">
          <Logo/>
          <h1 className="mb-4 text-xl font-medium">
            Verifica tu número de celular
          </h1>
          <p className="mb-7 mt-[-10px] font-light">
            Ingresa el código que se mando a{" "}
            <span className="text-primary-color">+52 554954551.</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 ">
          <OTPInput
            value={otp}
            onChange={(value) => {
              if (/^\d*$/.test(value)) setOtp(value); // Validate only numbers
            }}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                className="border border-gray-300 rounded-md text-center !w-[70px] !h-[70px] text-lg ml-3"
                maxLength={1}
              />
            )}
          />
        </div>

        <div className="my-4 flex justify-center">
          <button
            onClick={handleResendCode}
            className={classNames(`py-2 px-6 mt-4 bg-transparent text-primary-color rounded-md hover:underline`, {
                "opacity-50 ":!canResend,
  
            })}
            disabled={!canResend}
          >
            {canResend ? "Reenviar código" : `Reenviar en ${timer}s`}
          </button>
        </div>

        <div className="flex w-full justify-between items-center gap-8 mt-10">
          <Button
            onClick={() => navigate("/auth/login")}
            className="py-2 px-12"
            color="white"
          >
            Cancelar
          </Button>
          <Button
            className="py-2 px-12"
            disabled={otp.length < 6}
            onClick={handleOtpSubmit}
          >
            {isLoading ? <Spinner size="sm" /> : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
