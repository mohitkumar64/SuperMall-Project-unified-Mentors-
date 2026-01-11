function FloorCard({  floor , shops}) {
  const shop = shops.filter((s)=> s.floorId === floor.id)

  return (
    <div className="border  rounded-xl p-4 bg-sky-100 shadow">
      <h2 className="text-xl Font font-bold">{floor.name}</h2>
        <p>
           shops: {shop.length}
        </p>
    </div>
  );
}

export default FloorCard;
