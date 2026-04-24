import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getUserHealthContexts, updateUserHealthContexts } from "@/lib/user-settings";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return Response.json(
      { message: "Please sign in to load your health contexts." },
      { status: 401 }
    );
  }

  const healthContexts = await getUserHealthContexts(session.user.id);

  return Response.json({ healthContexts }, { status: 200 });
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json(
        { message: "Please sign in to update your health contexts." },
        { status: 401 }
      );
    }

    const payload = await request.json();
    const healthContexts = await updateUserHealthContexts(
      session.user.id,
      payload.healthContexts || []
    );

    return Response.json({ healthContexts }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We couldn't update your health contexts right now.",
      },
      { status: 500 }
    );
  }
}
