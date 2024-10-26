import { IoClose } from "react-icons/io5";

interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  children,
  className,
}) => {
  return (
    <div className="fixed backdrop-blur-sm inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`bg-white  p-6 rounded-lg shadow-lg w-[85%] md:w-1/2 lg:w-1/3  ${className} dark:bg-darkTheme-backgroundColor`}
      >
        <div className="flex justify-between items-center font-semibold text-xl border-b border-black-accent/40">
          <div className="flex flex-col">
            <p className="text-whiteTheme-primaryColor font-semibold dark:text-darkTheme-textColor">
              {title}
            </p>
          </div>
          <button className="p-1 " onClick={onClose}>
            <p className="text-whiteTheme-accentDark flex items-center dark:text-darkTheme-textColor">
              <IoClose size={25} />
            </p>
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
