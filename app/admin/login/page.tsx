import LoginForm from "./LoginForm";

export default function LoginPage() {
  // Login page is accessible to everyone - no auth check needed
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
