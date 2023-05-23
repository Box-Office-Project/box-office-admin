import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Outlet, useActionData, useSearchParams } from "@remix-run/react";
import axios from "axios";
import Button from "~/components/Button";
import { Input, PasswordInput } from "~/components/Input";
import ValiadationErrorMessage from "~/components/ValiadationErrorMessage";
import { badRequest } from "~/utils/request.server";
import { createTokenSession, getToken } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const token = await getToken(request);
  if (token && typeof token === "string") {
    return redirect("/movie");
  }
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo") || "/movie";

  if (typeof id !== "string" || typeof password !== "string") {
    return badRequest({
      fields: null,
      formError: "Form not submitted correctly",
    });
  }

  const fields = { id, password };

  try {
    const { data } = await axios.post("http://localhost:8080/api/admin/login", {
      id,
      password,
    });

    // 유효하지 않은 사용자
    if (data.code === 3001) {
      return badRequest({ fields, formError: data.message });
    }

    return createTokenSession(data.data.token, redirectTo as string);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return badRequest({ fields, formError: error.response?.data.message });
    } else {
      return badRequest({ fields, formError: "Unknown error: Login failed" });
    }
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="block text-3xl mb-8">로그인</h1>
      <Form className="flex flex-col items-center gap-8 w-96" method="post">
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get("redirectTo") ?? undefined}
        />
        <Input
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
          aria-invalid={Boolean(actionData?.formError)}
          aria-errormessage={
            actionData?.formError ? "wrong user data" : undefined
          }
        />
        {actionData?.formError ? (
          <ValiadationErrorMessage message={actionData?.formError} />
        ) : null}
        <Button size="md" type="submit">
          Login
        </Button>
      </Form>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  return <div>Error!</div>;
}
