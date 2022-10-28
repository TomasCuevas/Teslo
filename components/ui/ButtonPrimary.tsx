import { useState, useEffect } from "react";

interface Props {
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: any;
  text: string;
  type?: "button" | "submit" | "reset";
  color?: "blue" | "red";
}

export const ButtonPrimary: React.FC<Props> = ({
  disabled = false,
  icon,
  onClick = () => {},
  text,
  type = "button",
  color = "blue",
}) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (color === "blue")
      setClassName(
        "w-full rounded-lg h-full bg-secundary py-[6px] text-sm font-bold text-white transition-all duration-300 hover:bg-secundary/80 disabled:opacity-30"
      );
    if (color === "red")
      setClassName(
        "w-full rounded-lg bg-white full py-[6px] border border-error text-sm font-bold text-error transition-all duration-300 hover:bg-error hover:text-white disabled:opacity-30"
      );
  }, [color]);

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {icon} {text}
    </button>
  );
};
