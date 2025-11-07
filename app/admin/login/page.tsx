import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/supabaseAuth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await requireAuth()) redirect("/admin/quotes");
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
