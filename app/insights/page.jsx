import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getInsightsForUser } from "@/lib/insights";
import { InsightsScreen } from "../components/insights-ui";
import { UnauthorizedScreen } from "../components/mobile-app-shell";

export default async function InsightsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <UnauthorizedScreen />;
  }

  const insights = await getInsightsForUser(session.user?.id);

  return (
    <InsightsScreen
      insights={insights}
      userName={session.user?.name}
      userImage={session.user?.image}
    />
  );
}
