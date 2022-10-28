import { useState, useEffect } from "react";

interface Props {
  icon?: React.ReactNode;
  onClick?: any;
  status: "error" | "success" | "pending";
  text: string;
}

export const Chip: React.FC<Props> = ({
  icon,
  status,
  text,
  onClick = () => {},
}) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (status === "error" || status === "pending")
      setClassName(
        "mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-error py-1 px-3 text-center text-error animate-fadeIn"
      );
    if (status === "success")
      setClassName(
        "mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-success py-1 px-3 text-center text-success animate-fadeIn"
      );
  }, [status]);

  return (
    <span onClick={() => onClick()} className={className}>
      {icon && <span>{icon}</span>}
      <p>{text}</p>
    </span>
  );
};
