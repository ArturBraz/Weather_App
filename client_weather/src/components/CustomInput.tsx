import {type InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  classLabel?: string;
}

export default function CustomInput({
  label,
  className = "",
  ...props
}: CustomInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className={`text-sm font-medium ${className}`}>{label}</label>}
      <input
        {...props}
        className={`
          w-full 
          rounded-lg 
          border 
          border-gray-300 
          px-3 
          h-11 
          text-base
          outline-none
          transition
          focus:border-blue-500 
          focus:ring-2 
          focus:ring-blue-300
          ${className}
        `}
      />
    </div>
  );
}
