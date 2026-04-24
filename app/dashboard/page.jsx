import { getServerSession } from "next-auth";

import { MainAnalysisDashboard } from "../components/food-analysis-ui";
import { authOptions } from "@/lib/auth";
import { getRecentMealsForUser } from "@/lib/meal-history";
import { UnauthorizedScreen } from "../components/mobile-app-shell";
import { getUserHealthContexts } from "@/lib/user-settings";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <UnauthorizedScreen />;
  }

  const initialMeals = await getRecentMealsForUser(session.user?.id);
  const initialHealthContexts = await getUserHealthContexts(session.user?.id);

  return (
    <MainAnalysisDashboard
      initialMeals={initialMeals}
      initialHealthContexts={initialHealthContexts}
      userName={session.user?.name}
      userImage={session.user?.image}
    />
  );
}
