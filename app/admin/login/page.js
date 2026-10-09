import { redirect } from "next/navigation";
import Logo from "@/components/site/Logo";
import LoginForm from "@/components/admin/LoginForm";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata = { title: "Kirish" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin");

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-brand-950 px-4 py-12">
      <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo inverted />
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-black/30 sm:p-10">
          <h1 className="text-2xl font-extrabold">Admin panelga kirish</h1>
          <p className="mt-2 text-slate-500">Davom etish uchun login va parolingizni kiriting.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
