import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layouts";
import { SideNav } from "@/components/side-nav";
import { buyerNav } from "@/components/nav-items";

export const Route = createFileRoute("/dashboard/messages")({
  head: () => ({ meta: [
    { title: "Messages — DevForge Hub" },
    { name: "description", content: "Chat with creators and support." },
    { property: "og:title", content: "Messages — DevForge Hub" },
    { property: "og:description", content: "Chat with creators and support on DevForge Hub." },
  ]}),
  component: () => (
    <DashboardLayout side={<SideNav items={buyerNav} title="Personal" />}>
      <div className="p-6 md:p-8 max-w-[1200px]">
        <PageHeader title="Messages" description="Chat with creators and support." />
        <div className="card-elegant rounded-2xl p-10 text-center">
          <div className="text-sm text-muted-foreground">Your inbox is quiet. Start a conversation with a creator from their profile.</div>
        </div>
      </div>
    </DashboardLayout>
  ),
});
