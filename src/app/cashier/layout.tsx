import Navbar from "../components/Navbar";
import Sidebar from "../components/cashier/Sidebar";
export const metadata = {
  title: "SHOP - LATDA",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 h-[8vh]">
        <Navbar />
      </div>
      <div className="w-full h-[92vh] flex">
        <div className=" bg-blue-950">
          <Sidebar />
        </div>
        <div className="bg-white w-full px-3 pt-3">{children}</div>
      </div>
    </div>
  );
}
