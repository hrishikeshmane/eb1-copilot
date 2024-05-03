import Navbar from "./_components/navbar";
import NavSheet from "./_components/nav-sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full overflow-clip md:grid-cols-[220px_1fr] lg:grid-cols-[245px_1fr]">
      <Navbar />
      <div className="flex flex-col">
        <NavSheet />
        <main className="h-[calc(100vh-3.8rem)] w-full">{children}</main>
      </div>
    </div>
  );
}
