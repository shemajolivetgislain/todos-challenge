import { forwardRef, ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password";
  className?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  id?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      className = "",
      placeholder,
      onChange,
      required = false,
      id,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        id={id} // Apply id
        className={`${className} border-[1px] border-whiteTheme-primaryColor rounded-md p-3 w-full focus:outline-none focus:border-2 focus:border-whiteTheme-primaryColor transition-all duration-100 ease-out-in dark:bg-darkTheme-borderColor dark:text-darkTheme-textColor`}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
