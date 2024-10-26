import { forwardRef, SelectHTMLAttributes, ChangeEvent } from "react";

interface Option {
  value: any;
  label: any;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      className = "",
      defaultValue,
      placeholder = "Select ",
      onChange,
      required = false,
      ...rest
    },
    ref
  ) => {
    return (
      <select
        ref={ref}
        required={required}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`${className} border-[1px] border-whiteTheme-primaryColor rounded-md p-3 w-full focus:outline-none focus:border-2 focus:border-whiteTheme-primaryColor transition-all duration-100 ease-out-in dark:bg-darkTheme-borderColor dark:text-darkTheme-textColor`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
