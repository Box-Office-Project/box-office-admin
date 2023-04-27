import type { ActionArgs } from "@remix-run/node";
import { Outlet, useActionData } from "@remix-run/react";
import axios from "axios";
import Button from "~/components/Button";
import { TextInput, PasswordInput } from "~/components/Input";
import { badRequest } from "~/utils/request.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const password = formData.get("password");
  try {
    const { data } = await axios.post(
      "https://localhost:8080/api/admin/login",
      {
        id,
        password,
      }
    );

    if (typeof id !== "string" || typeof password !== "string") {
      return badRequest({
        fields: null,
        formError: "Form not submitted correctly",
      });
    }
    const fields = { id, password };

    console.log(data);

    return badRequest({ fields, formError: "Login Failed" });
  } catch (error) {
    throw new Error("Something wrong");
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="block text-3xl mb-8">로그인</h1>
      <form className="flex flex-col items-center gap-8 w-96" method="post">
        <TextInput
          label="ID"
          id="id"
          placeholder="ID"
          defaultValue={actionData?.fields?.id}
          aria-invalid={Boolean(actionData?.formError)}
          aria-errormessage={
            actionData?.formError ? "wrong user data" : undefined
          }
        />
        <PasswordInput
          label="Password"
          id="password"
          placeholder="Password"
          defaultValue={actionData?.fields?.password}
          aria-invalid={Boolean(actionData?.formError)}
          aria-errormessage={
            actionData?.formError ? "wrong user data" : undefined
          }
        />
        <Button size="md" type="submit">
          Login
        </Button>
      </form>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  return <div>Error!</div>;
}
