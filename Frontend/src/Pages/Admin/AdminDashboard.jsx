import Navbar from "../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import LottieAnimation from "../../lottie/Lottie";
import userAnimation from "../../assets/lottieJson/Microinteractions  Icon  02.json";
import ShoppingAnimation from "../../assets/lottieJson/Shopping cart.json";
import ShopAnimation from "../../assets/lottieJson/My-Store-animated.json";
import { useOutletContext } from "react-router-dom";

function AdminDashboard() {
  const { users, shops, Products, floors } = useOutletContext();
  const merchants = users?.filter((u) => u.role === "merchant") || [];

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />

        <div className="flex-1 p-2 md:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

            <StatCard
              title="Users"
              value={users?.length}
              animation={<LottieAnimation animation={userAnimation} />}
              from="from-blue-300"
              to="to-blue-600"
              border="border-blue-700"
            />

            <StatCard
              title="Products"
              value={Products?.length}
              animation={<LottieAnimation animation={ShoppingAnimation} />}
              from="from-green-300"
              to="to-green-600"
              border="border-green-700"
            />

            <StatCard
              title="Shops"
              value={shops?.length}
              animation={<LottieAnimation animation={ShopAnimation} />}
              from="from-purple-300"
              to="to-purple-600"
              border="border-purple-700"
            />

            <StatCard
              title="Merchants"
              value={merchants.length}
              animation={
                <img
                  src="/images/cashier2.gif"
                  alt="merchant"
                  className="w-24 h-24 object-contain"
                />
              }
              from="from-orange-300"
              to="to-orange-600"
              border="border-orange-700"
            />
          </div>

          <h2 className="Font text-3xl md:text-4xl font-bold mb-6">
            Shops
          </h2>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-1 wrap-anywhere md:p-6">

            <div className="grid grid-cols-3 md:text-lg font-semibold border-b border-black pb-3 mb-4">
              <p className="text-center">Merchant</p>
              <p className="text-center">Shop</p>
              <p className="text-center">Location</p>
            </div>

            <div className="flex flex-col gap-4">
              {merchants.map((merchant) => {
                const shop = shops.find(
                  (s) => s.merchantId === merchant.id
                );
                const floor = floors.find(
                  (f) => f.id === shop?.floorId
                );

                return (
                  <ShopRow
                    key={merchant.id}
                    merchant={merchant}
                    shop={shop}
                    floor={floor}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, animation, from, to, border }) {
  return (
    <div
      className={`h-40 bg-linear-to-br ${from} ${to}
                  rounded-2xl border ${border} shadow-lg
                  flex justify-between px-6
                  hover:scale-[1.03] transition`}
    >
      <div className="flex flex-col justify-center">
        <p className="text-white text-xl opacity-80">{title}</p>
        <p className="text-white text-3xl font-bold">{value}</p>
      </div>
      <div className="flex items-center">{animation}</div>
    </div>
  );
}

function ShopRow({ merchant, shop, floor }) {
  return (
    <div className="bg-white/5 text-sm md:text-lg hover:bg-gray-200 transition rounded-xl ">
      <div className="grid grid-cols-3 text-center gap-4">
        <p className="font-semibold">{merchant?.name}</p>
        <p className="opacity-80">{shop?.name || "—"}</p>
        <p className="opacity-80">{floor?.name || "—"}</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
