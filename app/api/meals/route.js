import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getRecentMealsForUser } from "@/lib/meal-history";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const meals = await getRecentMealsForUser(session.user.id);

    return Response.json({ meals }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to load recent meals right now.",
      },
      { status: 500 }
    );
  }
}
