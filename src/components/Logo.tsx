import { FaBrain } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex w-full justify-center flex-col items-center">
      <FaBrain className="text-primary-color" size={45} />
      <p className="text-lg font-bold">XinapX</p>
    </div>
  );
};

export default Logo;
