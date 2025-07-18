import type { ReactNode, ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width, ...rest }: IProps) => {
  return (
    <button
      className={` ${className} text-white ${width} h-15 rounded-md p-2`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
