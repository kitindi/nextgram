import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className="flex items-start justify-between">
      <Sidebar />
      <main className="pl-[280px] w-full h-full">
        {" "}
        <Header />
        <div className="grid grid-cols-12 lg:px-16 lg:py-4 ">
          <div className="col-span-9">{children}</div>
          <div className="col-span-3">
            <h3 className="text-neutral-500 text-sm">Suggested for you</h3>
          </div>
        </div>
      </main>
    </section>
  );
}
