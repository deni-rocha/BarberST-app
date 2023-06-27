import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
export const Input = ({ className, ...args }: Props) => {
  return (
    <input
      className={`w-full h-[40px] rounded-3xl pl-6 outline-none drop-shadow-md placeholder:opacity-70 ${className}`}
      {...args}
    />
  );
};
