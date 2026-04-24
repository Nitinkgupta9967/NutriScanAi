import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getRecentMealsForUser } from "@/lib/meal-history";
import { HistoryScreen } from "../components/history-ui";
import { UnauthorizedScreen } from "../components/mobile-app-shell";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <UnauthorizedScreen />;
  }

  const meals = await getRecentMealsForUser(session.user?.id, 20);

  return (
    <HistoryScreen
      meals={meals}
      userName={session.user?.name}
      userImage={session.user?.image}
    />
  );
}
