import { Header } from "@/core-components";
import { RegisterForm } from "./_components/register-form";

export default function RegisterPage() {
  return (
    <div className="center flex h-full items-center justify-center">
      <div className="flex h-[500px] w-[400px] flex-col items-center rounded-xl bg-primary">
        <div className="flex w-full justify-center border-b-2 border-slate-700 p-2">
          <Header color="dark">Register</Header>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
