import { createCookieSessionStorage, redirect } from "@remix-run/node";

const AUTH_TOKEN = "user-token";

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("Environment variable not setted.");
}

let storage = createCookieSessionStorage({
  cookie: {
    name: "BOA_session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createTokenSession(token: string, redirectTo: string) {
  let session = await storage.getSession();
  session.set(AUTH_TOKEN, token);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getToken(request: Request) {
  let session = await getTokenSession(request);
  let token = session.get(AUTH_TOKEN);
  if (typeof token !== "string") {
    return null;
  }
  return token;
}

function getTokenSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function requireUser(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  let token = await getToken(request);
  if (!token) {
    let params = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${params}`);
  }
  return token;
}

export async function logout(request: Request) {
  let session = await getTokenSession(request);
  return redirect("/login", {
    headers: { "Set-Cookie": await storage.destroySession(session) },
  });
}
