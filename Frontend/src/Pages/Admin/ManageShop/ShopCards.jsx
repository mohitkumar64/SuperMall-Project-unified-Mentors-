import { deleteShopWithProducts, demoteMerchantToUser } from '../../../fireStoreServices';

function ShopCard({ shop, floors, users , removeShop }) {
  const floor = floors.find((f) => f.id === shop.floorId);
  const merchant = users.find((u) => u.id === shop.merchantId);

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete "${shop.name}"?\nThis will remove the shop and demote the merchant.`
    );

    if (!confirm) return;

    try {
      await deleteShopWithProducts(shop.id, shop.merchantId);
      await demoteMerchantToUser(shop.merchantId);

      alert("Shop deleted and merchant converted to user");
      removeShop(shop.id)
    } catch (err) {
      console.error(err);
      alert("Failed to delete shop");
    }
  };

  return (
    <div className="border rounded-xl p-4 bg-sky-100 shadow">
      <h2 className="text-xl Font font-bold">{shop.name}</h2>

      <div className="flex gap-4 justify-between">
        <div>
          <p className="flex gap-3 text-lg items-center text-gray-700 mt-2">
            <img className="w-8" src="/images/map-pin.png" alt="location" />
            <span className="font-bold Font">Floor:</span>{" "}
            {floor?.name || "Unknown"}
          </p>

          <p className="flex gap-3 text-lg items-center text-gray-700">
            <img
              className="w-8"
              src="/images/entrepreneur.png"
              alt="merchant"
            />
            <span className="font-bold Font">Merchant:</span>{" "}
            {merchant?.name || merchant?.email || "Unassigned"}
          </p>
        </div>

        <div className="w-25 h-25 flex items-center justify-center overflow-hidden rounded-full border">
          {shop.logoUrl ? (
            <img
              src={shop.logoUrl}
              alt="shopLogo"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-gray-500 bg-gray-700 flex items-center justify-center text-6xl font-bold Font w-full h-full">
              {shop.name[0]}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-2">{shop.description}</p>

      {/* ACTION */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete Shop
        </button>
      </div>
    </div>
  );
}

export default ShopCard;
