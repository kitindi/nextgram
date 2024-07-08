import Header from "@/components/Header";
import MiniProfile from "@/components/MiniProfile";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className="flex items-start justify-between px-4 lg:px-12">
      <Sidebar />
      <main className="lg:pl-[280px] w-full h-full">
        {" "}
        <Header />
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:px-16  lg:py-12 py-10">
          <div className="w-full lg:col-span-9 lg:px-8">{children}</div>
          <div className="lg:col-span-3 hidden lg:block">
            <MiniProfile />
          </div>
        </div>
      </main>
    </section>
  );
}
