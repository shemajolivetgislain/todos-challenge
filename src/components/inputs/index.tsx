import { forwardRef, ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      className = "",
      defaultValue,
      placeholder,
      onChange,
      required = false,
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
        defaultValue={defaultValue}
        onChange={onChange}
        className={`${className} border-[1px] border-whiteTheme-primaryColor rounded-md p-3 w-full focus:outline-none focus:border-2 focus:border-whiteTheme-primaryColor transition-all duration-100 ease-out-in dark:bg-darkTheme-borderColor dark:text-darkTheme-textColor`}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
