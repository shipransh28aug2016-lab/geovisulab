import { NextResponse } from "next/server";
import { store } from "@/db/store";
import { withIdempotency } from "@/lib/idempotency";

export const dynamic = "force-dynamic";

/** Never return the stored password to the client. */
function sanitize<T extends { password?: string }>(user: T) {
  const { password: _password, ...rest } = user;
  return rest;
}

function slugify(email: string) {
  return email.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

/**
 * Session switch & profile registration, documented as `GET, POST /api/auth`.
 * POST body: `{ action: "login" | "register", email, name?, role?, classGrade?, schoolName? }`
 * Response:  `{ success, user }` — consumed by handleSwitchUser / handleRegisterUser in page.tsx.
 *
 * SECURITY NOTE (docs/TECHNICAL_DEBT_REGISTER.md TD-04): this is the demo account switcher that
 * shipped with the original visualiser. It is NOT authentication — there is no credential check and
 * `users.password` is stored in plaintext. Do not put real student data behind it.
 */
export async function GET() {
  try {
    const users = await store.listUsers();
    return NextResponse.json({ success: true, total: users.length, users: users.map(sanitize) });
  } catch (error) {
    console.error("GET /api/auth error:", error);
    return NextResponse.json({ success: false, error: "Failed to list accounts", users: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return withIdempotency(
    req,
    { scope: "auth", fallbackKey: (body) => (body?.email ? `auth_${body.action}_${body.email}` : null) },
    async (body) => {
      try {
        const action = body?.action ?? "login";
        const email = String(body?.email ?? "").trim();
        if (!email) {
          return NextResponse.json({ success: false, error: "email is required" }, { status: 400 });
        }

        if (action === "login") {
          const user = await store.findUserByEmail(email);
          if (!user) {
            return NextResponse.json({ success: false, error: "No account with that email" }, { status: 404 });
          }
          return NextResponse.json({ success: true, user: sanitize(user) });
        }

        if (action === "register") {
          const existing = await store.findUserByEmail(email);
          if (existing) {
            return NextResponse.json({ success: true, user: sanitize(existing), reused: true });
          }
          const created = await store.createUser({
            id: `user-${slugify(email)}-${Date.now().toString(36).slice(-4)}`,
            name: String(body?.name ?? "CBSE Scholar").trim() || "CBSE Scholar",
            email,
            password: String(body?.password ?? "demo-account"),
            role: body?.role === "teacher" ? "teacher" : "student",
            classGrade: String(body?.classGrade ?? "11"),
            schoolName: body?.schoolName ?? "Delhi Public School / Kendriya Vidyalaya",
          });
          return NextResponse.json({ success: true, user: sanitize(created) });
        }

        return NextResponse.json({ success: false, error: `Unknown action "${action}"` }, { status: 400 });
      } catch (error) {
        console.error("POST /api/auth error:", error);
        return NextResponse.json({ success: false, error: "Authentication request failed" }, { status: 500 });
      }
    }
  );
}
