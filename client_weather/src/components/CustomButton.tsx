interface CustomButtonProps {
  children?: React.ReactNode; 
  icon?: React.ReactNode;    
  iconPosition?: "left" | "right";
  variant?: "search" | "save" | "delete" | "default";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function CustomButton({
  children,
  icon,
  iconPosition = "left",
  variant = "default",
  className = "",
  type = "button",
  onClick,
}: CustomButtonProps) {
  const base =
    "flex items-center justify-center gap-2 px-4 h-11 rounded-lg font-medium transition active:scale-95";

  const variants = {
    default: "bg-gray-200 hover:bg-gray-300 text-black",
    search: "bg-blue-500 hover:bg-blue-600 text-white",
    save: "bg-green-500 hover:bg-green-600 text-white",
    delete: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button onClick={onClick} type={type} className={`${base} ${variants[variant]} ${className}`}>
      {icon && iconPosition === "left" && icon}
      {children && <span>{children}</span>}
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
