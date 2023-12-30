import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value ?? crypto.randomUUID();
  const response = NextResponse.next();
  response.cookies.set("userId", userId);
  return response;
}
