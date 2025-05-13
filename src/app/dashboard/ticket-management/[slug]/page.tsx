import { redirect } from "next/navigation";

export default function TicketManagementPage({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/dashboard/profile-management/${params.slug}`);
}
