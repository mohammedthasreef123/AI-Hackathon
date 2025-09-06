import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../store/useProductStore";

const ProductPage = () => {
  const {
    products,
    filteredProducts,
    fetchProducts,
    fetchFilters,
    applyFilters,
    clearFilters,
    filters,
    categories,
    brands,
    ideals,
    loading,
  } = useProductStore();

  const [selectedCategory, setSelectedCategory] = useState(filters.category);
  const [selectedBrand, setSelectedBrand] = useState(filters.brand);
  const [selectedIdeal, setSelectedIdeal] = useState(filters.ideal);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Fetch products + filters on mount
  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, [fetchProducts, fetchFilters]);

  // ✅ Apply filters
  const handleApplyFilters = () => {
    applyFilters({
      category: selectedCategory,
      brand: selectedBrand,
      ideal: selectedIdeal,
    });
    setShowFilters(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6">
      {/* Filters toggle for mobile */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <p className="text-sm font-semibold">
          {filteredProducts.length} Products Found
        </p>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-1 border rounded-md text-sm font-medium"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Sidebar Filters */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } md:block w-full md:w-1/5 bg-white md:bg-transparent p-4 md:p-0 shadow md:shadow-none rounded-md`}
      >
        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-semibold flex mb-2">Categories</h3>
          {categories.length > 0 ? (
            categories.map((cat, idx) => (
              <label
                key={idx}
                className="flex items-center mb-1 text-sm text-gray-500"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No categories</p>
          )}
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex">Brand</h3>
          {brands.length > 0 ? (
            brands.map((brand, idx) => (
              <label
                key={idx}
                className="flex items-center mb-1 text-sm text-gray-500"
              >
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={selectedBrand === brand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No brands</p>
          )}
        </div>

        {/* Ideal For */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex">Ideal For</h3>
          {ideals.length > 0 ? (
            ideals.map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center mb-1 text-sm text-gray-500"
              >
                <input
                  type="radio"
                  name="ideal"
                  value={opt}
                  checked={selectedIdeal === opt}
                  onChange={(e) => setSelectedIdeal(e.target.value)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No options</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleApplyFilters}
            className="w-1/2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Done
          </button>
          <button
            onClick={() => {
              clearFilters();
              setSelectedCategory("");
              setSelectedBrand("");
              setSelectedIdeal("");
            }}
            className="w-1/2 border py-2 rounded-md hover:bg-gray-100 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full md:w-4/5">
        <div className="hidden md:flex justify-between items-center mb-4">
          <p className="text-sm font-semibold">
            {filteredProducts.length} Products Found
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  state={{ product }} // Pass product to detail page
                  className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition block"
                >
                  <div className="w-full h-40 mb-3 flex items-center justify-center">
                    <img
                      src={product.image || "/Product.jpg"}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h4 className="text-sm font-medium mb-1">{product.name}</h4>
                  <div className="flex items-center text-sm mb-1">
                    <span className="text-lg font-semibold text-green-600 mr-2">
                      {product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="line-through text-gray-400 text-xs">
                        {product.oldPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-yellow-500 text-sm">
                    {"★".repeat(product.rating || 0)}
                    {"☆".repeat(5 - (product.rating || 0))}
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
