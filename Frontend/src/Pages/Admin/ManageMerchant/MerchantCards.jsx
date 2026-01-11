function MerchantCard({ merchant , shop }) {
  shop = shop[0]
  
  return (
    <div className="border rounded-xl p-4 gap-2 flex items-center justify-between bg-sky-100 shadow">

      <div>
          <h2 className="text-xl Font font-bold">
          {merchant?.name || "Unnamed"}
        </h2>
        <p className="text-gray-600"> <span className="font-bold Font">Shop Name:</span>  {shop?.name || "Not assigned Yet"}</p>
      </div>

       <div className="w-25 flex items-center justify-center text-center h-25  overflow-hidden rounded-full border">
          {
           shop && shop.logoUrl ?
             <img src={shop.logoUrl} alt="shopLogo"  className=" w-full h-full object-fit"/> 
             : <p className="text-gray-500 bg-gray-700 flex items-center justify-center text-6xl font-bold Font w-full h-full" > {shop?.name[0]}</p>
          }
          
        </div> 
      </div>
      
  );
}

export default MerchantCard;
