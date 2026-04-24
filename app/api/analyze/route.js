import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { saveMealAnalysis } from "@/lib/meal-history";
import { analyzeMeal } from "@/lib/meal-analysis";
import { getUserHealthContexts } from "@/lib/user-settings";

const MAX_IMAGE_DATA_URL_LENGTH = 6 * 1024 * 1024;

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json(
        { message: "Please sign in to analyze meals." },
        { status: 401 }
      );
    }

    const { image, description } = await request.json();
    const normalizedDescription = String(description || "").trim();

    if (!image && !normalizedDescription) {
      return Response.json(
        { message: "Please upload a meal image or describe the food you want to analyze." },
        { status: 400 }
      );
    }

    if (image && typeof image !== "string") {
      return Response.json(
        { message: "Please upload a valid meal image to continue." },
        { status: 400 }
      );
    }

    if (image && image.length > MAX_IMAGE_DATA_URL_LENGTH) {
      return Response.json(
        { message: "That image is too large. Please upload a smaller photo." },
        { status: 413 }
      );
    }

    const healthContexts = await getUserHealthContexts(session.user.id);

    const analysis = await analyzeMeal({
      image,
      description: normalizedDescription,
      condition: healthContexts[0] || "General Wellness",
      healthContexts,
    });
    const recentMeal = await saveMealAnalysis({
      userId: session.user.id,
      analysis,
    });

    return Response.json(
      {
        analysis,
        recentMeal,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "We couldn't analyze this meal right now.";
    const normalizedMessage = message.toLowerCase();
    const status =
      normalizedMessage.includes("sign in")
        ? 401
        : normalizedMessage.includes("please upload") ||
            normalizedMessage.includes("describe the food") ||
            normalizedMessage.includes("valid meal image")
          ? 400
          : normalizedMessage.includes("too large")
            ? 413
            : normalizedMessage.includes("not configured") ||
                normalizedMessage.includes("not supported")
              ? 503
              : normalizedMessage.includes("credits") ||
                  normalizedMessage.includes("billing")
                ? 402
                : 500;

    return Response.json(
      {
        message,
      },
      { status }
    );
  }
}
