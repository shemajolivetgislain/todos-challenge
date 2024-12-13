import { ReactNode, MouseEventHandler } from "react";

interface ActionButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`p-2 bg-whiteTheme-lightAccent ${className} rounded-md hover:bg-purple-200 shadow-sm shadow-purple-100 cursor-pointer transition:all duration-100 ease-out-in dark:bg-darkTheme-secondColor dark:shadow-darkTheme-borderColor dark:text-darkTheme-textColor dark:hover:bg-darkTheme-primaryColor dark:hover:text-darkTheme-accentColor dark:hover:shadow-darkTheme-accentColor`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ActionButton;
