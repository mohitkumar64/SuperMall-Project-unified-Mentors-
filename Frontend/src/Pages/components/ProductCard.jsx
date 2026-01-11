import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  // for navigation 
  const handleClick = () => {
    navigate(`/productDetails/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col">
      
 
      <div className="h-24 sm:h-40 flex items-center justify-center bg-gray-100 rounded">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

     
      <h3 className="mt-2 sm:mt-3 text-sm sm:text-lg font-semibold text-gray-800 line-clamp-2">
        {product.name}
      </h3>

      
      <p className="mt-1 text-base sm:text-xl font-bold text-green-700">
        ₹{product.price}
      </p>

      {/* detail button */}
      <button
        className="mt-3 sm:mt-auto bg-[rgb(176,139,93)] text-white py-1.5 sm:py-2 text-sm sm:text-base rounded hover:opacity-90 transition"
        onClick={handleClick}
      >
        View Details
      </button>

    </div>
  );
}

export default ProductCard;
