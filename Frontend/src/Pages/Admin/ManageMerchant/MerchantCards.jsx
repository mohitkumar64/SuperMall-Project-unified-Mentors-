import { demoteMerchantToUser } from "../../../fireStoreServices";

function MerchantCard({ merchant, shop , removeMerchant }) {
  shop = shop[0];

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Are you sure you want to remove merchant role from ${merchant?.name || merchant?.email}?`
    );

    if (!confirm) return;

    try {
      await demoteMerchantToUser(merchant.id);
      alert("Merchant converted back to user");
      removeMerchant(merchant.id)
    } catch (err) {
      console.error(err);
      alert("Failed to update merchant");
    }
  };

  return (
    <div className="border rounded-xl p-4 gap-2 flex items-center justify-between bg-sky-100 shadow">
      <div>
        <h2 className=" text-sm  md:text-xl Font font-bold">
          {merchant?.name || "Unnamed"}
        </h2>
        <p className="text-gray-600">
          <span className="font-bold text-sm  md:text-xl Font">Shop Name:</span>{" "}
          {shop?.name || "Not assigned Yet"}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-25 flex flex-wrap items-center justify-center text-center h-25 overflow-hidden rounded-full border">
          {shop && shop.logoUrl ? (
            <img
              src={shop.logoUrl}
              alt="shopLogo"
              className="w-full h-full object-fit"
            />
          ) : (
            <p className="text-gray-500 bg-gray-700 flex items-center justify-center text-5xl font-bold Font w-full h-full">
              {shop?.name?.[0]}
            </p>
          )}
        </div>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MerchantCard;
