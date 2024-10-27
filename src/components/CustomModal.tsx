import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { FC } from "react";

interface CustomModalProps {
  showModal?: boolean;
  handleClose: () => void;
  children?: React.ReactNode;  
  onHandle?: (step: string) => void;
  title?: string;
  deleteItem?: string;
  item?: string;
  step?: string;
  className?: string;
}

const CustomModal: FC<CustomModalProps> = ({
  showModal,
  handleClose,
  children,
  className
}) => {
  return (
    <Modal
      centered
      backdrop="static"
      contentClassName="rounded-l h-auto w-full"
      dialogClassName={`${className ? className : "max-w-[auto]"} rounded-0 p-0`}
      keyboard={false}
      show={showModal}
      onHide={handleClose}
    >
      <Modal.Body className="p-0">
        {children}

        <button
          aria-label="Close"
          className="absolute top-5 right-5 w-15 h-15 bg-transparent rounded-full"
          onClick={handleClose}
        >
          <IoMdClose size={18} style={{ color: "black" }} />
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
