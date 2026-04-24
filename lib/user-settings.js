import { dedupeHealthContexts } from "@/lib/health-contexts";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function getUserHealthContexts(userId) {
  if (!userId) {
    return [];
  }

  await connectDB();

  const user = await User.findById(userId).select("healthContexts").lean();
  const contexts = dedupeHealthContexts(user?.healthContexts || []);

  return contexts;
}

export async function updateUserHealthContexts(userId, healthContexts) {
  if (!userId) {
    throw new Error("A signed-in user is required to update health contexts.");
  }

  const normalized = dedupeHealthContexts(healthContexts);
  const nextContexts = normalized;

  await connectDB();

  await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        healthContexts: nextContexts,
      },
    },
    { new: true }
  );

  return nextContexts;
}
