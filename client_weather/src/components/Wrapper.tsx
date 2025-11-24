import {type ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export default function Wrapper({ children, className = "" }: WrapperProps) {
  return (
    <div
      className={`
        mx-auto 
        max-w-[600px] 
        w-full
        px-4 
        sm:px-6 
        md:px-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}
