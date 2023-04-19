import Button from "~/components/Button";
import { TextInput, PasswordInput } from "~/components/Input";

export default function Login() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="block text-3xl mb-8">로그인</h1>
      <form className="flex flex-col items-center gap-8 w-96">
        <TextInput label="ID" id="ID" placeholder="ID" />
        <PasswordInput label="Password" id="password" placeholder="Password" />
        <Button size="md" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
