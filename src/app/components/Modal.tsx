import { images } from "@/src/assets";
import ReactDOM from "react-dom";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="absolute top-3 right-3 p-2!"
          variant="primary"
          onClick={onClose}
        >
          <img src={images.icons.close} alt="close" />
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
