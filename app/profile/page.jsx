import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getUserHealthContexts } from "@/lib/user-settings";
import { UnauthorizedScreen } from "../components/mobile-app-shell";
import { ProfileScreen } from "../components/profile-ui";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <UnauthorizedScreen />;
  }

  const initialHealthContexts = await getUserHealthContexts(session.user?.id);

  return (
    <ProfileScreen
      userName={session.user?.name}
      userEmail={session.user?.email}
      userImage={session.user?.image}
      initialHealthContexts={initialHealthContexts}
    />
  );
}
