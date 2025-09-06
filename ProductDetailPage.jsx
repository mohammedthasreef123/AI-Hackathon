import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import useProductStore from "../store/useProductStore";
import useWishlistStore from "../store/useWishlistStore";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedProduct,
    fetchProductById,
    loading,
    error,
  } = useProductStore();

  const { addToCart } = useCartStore();
  const { wishlist, toggleWishlist } = useWishlistStore();

  const [activeTab, setActiveTab] = useState("description");

  // ✅ Load product by ID
  useEffect(() => {
    if (!selectedProduct || selectedProduct.id !== Number(id)) {
      fetchProductById(id);
    }
  }, [id, selectedProduct, fetchProductById]);

  if (loading) {
    return <p className="p-6 text-center">Loading product...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  if (!selectedProduct) {
    return <p className="p-6 text-center">Product not found</p>;
  }

  const product = selectedProduct;

  // check if this product is in wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        ...product,
        price: Number(product.price) || 0, // ensure number
      });
      toast.success(`${product.name} added to cart 🛒`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlistToggle = async () => {
    try {
      await toggleWishlist(product);
      if (isInWishlist) {
        toast.error(`${product.name} removed from wishlist ❌`);
      } else {
        toast.success(`${product.name} added to wishlist ❤️`);
      }
    } catch {
      toast.error("Wishlist update failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 text-sm mb-4 inline-block"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-xl">
            <img
              src={product.image || "/Product.jpg"}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <p className="text-blue-600 font-medium mb-2">{product.brand}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold">₹{product.price}</span>
            {product.oldPrice && (
              <span className="line-through text-gray-400">
                ₹{product.oldPrice}
              </span>
            )}
          </div>
          <p className="text-yellow-500 mb-4">
            {"★".repeat(product.rating || 0)}
            {"☆".repeat(5 - (product.rating || 0))}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>

            {/* Wishlist button */}
            <button
              onClick={handleWishlistToggle}
              className={`px-6 py-2 rounded-md transition ${
                isInWishlist
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "border border-pink-500 text-pink-500 hover:bg-pink-50"
              }`}
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex border-b">
          {["description", "additional", "reviews"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "description"
                ? "Description"
                : tab === "additional"
                ? "Additional Info"
                : "Reviews"}
            </button>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-700">
          {activeTab === "description" && (
            <p>{product.description || "No description available"}</p>
          )}
          {activeTab === "additional" && <p>Some additional information...</p>}
          {activeTab === "reviews" && <p>No reviews yet</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
