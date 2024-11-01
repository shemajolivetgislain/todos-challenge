import { forwardRef, MouseEvent, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  label?: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, type = "submit", className = "", onClick, ...rest }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 0.9, boxShadow: "0px 0px 10px 0px #29649E" }}
        ref={ref}
        type={type}
        onClick={onClick}
        className={`${className} bg-whiteTheme-primaryColor text-whiteTheme-secondColor w-fit flex items-center rounded-md px-6 max-md:px-6 py-2 max-md:py-2 font-medium hover:bg-whiteTheme-subPrimaryColor dark:bg-darkTheme-secondColor max-md:text-sm`}
        {...rest}
      >
        {label}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
