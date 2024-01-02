import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const storedUserId = request.cookies.get("userId")?.value;
  const userId = storedUserId ?? crypto.randomUUID();

  const response = storedUserId
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/", request.url));

  response.cookies.set("userId", userId);

  return response;
}
