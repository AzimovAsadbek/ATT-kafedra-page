import { CircleAlert, CircleCheck } from "lucide-react";

const VARIANTS = {
  success: { icon: CircleCheck, className: "bg-emerald-50 text-emerald-800 ring-emerald-200" },
  error: { icon: CircleAlert, className: "bg-red-50 text-red-800 ring-red-200" },
};

export default function Alert({ variant = "success", children }) {
  const { icon: Icon, className } = VARIANTS[variant];
  return (
    <div role={variant === "error" ? "alert" : "status"} className={`flex items-start gap-3 rounded-xl p-4 text-sm ring-1 ${className}`}>
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
