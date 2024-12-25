import OnboardingPlaceholder from "./_components/onboarding-placeholder";
import { AdminDashboard } from "./_components/admin-dashboard";
import CustomerDashboard from "./_components/customer-dashboard";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const { sessionClaims } = await auth();
  const user = await currentUser();
  const isAdmin = sessionClaims?.metadata.role === "admin";
  const isCustomer = sessionClaims?.metadata.role === "customer";

  return (
    <div className="h-full w-full px-2">
      <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-3xl">
          Hello, {user?.firstName ?? "there"}
        </h1>
      </div>
      {isCustomer && (
        <>
          <div className="mt-1">
            <p>Your journey to freedom begins here</p>
          </div>
        </>
      )}
      {/* {isAdmin && <AdminDashboard />} */}
      {!sessionClaims?.metadata.onBoarded && isCustomer && (
        <OnboardingPlaceholder />
      )}
      {sessionClaims?.metadata.onBoarded && <CustomerDashboard />}
    </div>
  );
}
