import Navbar from "./_components/navbar";
import NavSheet from "./_components/nav-sheet";
import { Navbar2 } from "./block";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="grid min-h-screen w-full overflow-clip md:grid-cols-[220px_1fr] lg:grid-cols-[245px_1fr]">
    //   <Navbar />
    //   <div className="flex flex-col">
    //     <NavSheet />
    //     <main className="h-[calc(100vh-3.8rem)] w-full">{children}</main>
    //   </div>
    // </div>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Navbar2 />
      <div className="flex flex-col sm:gap-4 sm:py-0 sm:pl-14">
        <NavSheet />
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  );
}
