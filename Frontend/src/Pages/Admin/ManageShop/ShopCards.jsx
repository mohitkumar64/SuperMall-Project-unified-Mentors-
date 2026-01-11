function ShopCard({ shop, floors, users }) {
  const floor = floors.find((f) => f.id === shop.floorId);
  const merchant = users.find((u) => u.id === shop.merchantId);

  return (
    <div className="border  rounded-xl p-4 bg-sky-100 shadow">
      <h2 className="text-xl Font font-bold">{shop.name}</h2>

    <div className=" flex gap-4 justify-between ">
        <div>
           
            <p className="flex gap-3 text-lg items-center text-gray-700 mt-2">
                <img className=' w-8' src="/images/map-pin.png" alt="location" /> <span className="font-bold Font">Floor:</span> {floor?.name || "Unknown"}
            </p>

            <p className="flex gap-3 text-lg items-center text-gray-700">
            <img className=' w-8' src="/images/entrepreneur.png" title='entrepreneur icons' alt="location" /> <span className="font-bold Font">Merchant:</span> {merchant?.name || merchant?.email || "Unassigned"}
            </p>     
        </div>   

        <div className="w-25 flex items-center justify-center text-center h-25  overflow-hidden rounded-full border">
          {
            shop.logoUrl ?
             <img src={shop.logoUrl} alt="shopLogo"  className=" w-full h-full object-fit"/> 
             : <p className="text-gray-500 bg-gray-700 flex items-center justify-center text-6xl font-bold Font w-full h-full" > {shop.name[0]}</p>
          }
          
        </div> 
    </div>


      <p className="text-sm text-gray-600 mt-2">
        {shop.description}
      </p>
    </div>
  );
}

export default ShopCard;
