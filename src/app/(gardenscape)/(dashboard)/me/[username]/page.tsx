import { ProfilePage, ProfilePageProps } from "@/pages/dashboard/profile"

export default async function MePage({ params }: ProfilePageProps) {
  return <ProfilePage params={params} />
}
