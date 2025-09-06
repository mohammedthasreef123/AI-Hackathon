import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";

export default function Homepage() {
  const [explored, setExplored] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);

  const handleExplore = () => {
    setExplored(true);
    console.log("Explore clicked!");
  };

  const handleShopNow = () => {
    setClicked(true);
    console.log("Shop Now clicked!");
  };

  const categories = [
    { id: 1, name: "Rice", image: "/provide1.png" },
    { id: 2, name: "Salt & Spices", image: "/provide2.png" },
    { id: 3, name: "Pulses", image: "/provide3.png" },
    { id: 4, name: "Cooking Oil", image: "/pulses.jpg" },
    { id: 5, name: "Milk", image: "/milk.jpg" },
  ];

  const [products] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Product Name ${i + 1}`,
      title: "Product Title Goes Here",
      description: "Short description",
      price: 415.1,
      oldPrice: 500.0,
      discount: "18% off",
      rating: 4.8,
      image: "/pulses.jpg",
    }))
  );


  const [promos] = useState([
    {
      id: 1,
      title: "Picked with care, served with love",
      description: "",
      image: "/grocery store.png",
      layout: "center",
    },
    {
      id: 2,
      title: "Freshness Delivered Daily - Up to 25% OFF on Groceries!",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eleifend nec morbi tellus vitae leo nunc. Lorem ipsum dolor sit amet consectetur. Eleifend nec morbi tellus vitae leo nunc.",
      image: "/grocery store.png",
      layout: "discount",
    },
    {
      id: 3,
      title: "🚚 “Zero delivery fee on your first order – freshness at your door.”",
      description: "",
      image: "/grocery store.png",
      layout: "left-text",
    },
    {
      id: 4,
      title: "🍎 “Farm-fresh picks with up to 30% OFF today!”",
      description: "20+ hours of portable playtime",
      image: "/grocery store.png",
      layout: "right-text",
    },
  ]);

  const [data] = useState([
    {
      id: 1,
      name: "JethaLal Gada",
      image: "/Review.png",
      text: "Great experience! The product quality is top-notch and delivery was prompt",
    },
    {
      id: 2,
      name: "Dayaben",
      image: "/Review.png",
      text: "Absolutely satisfied with the fast delivery and product quality. Will shop again!",
    },
    {
      id: 3,
      name: "ChampakLal",
      image: "/Review.png",
      text: "Excellent customer support and great value for money. Highly recommend!",
    },
  ]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + data.length) % data.length);
  };

  // ✅ Carousel state for brands
  const [brandIndex, setBrandIndex] = useState(0);

  const nextBrand = () => {
    setBrandIndex((prev) => (prev + 1) % brands.length);
  };

  const prevBrand = () => {
    setBrandIndex((prev) => (prev - 1 + brands.length) % brands.length);
  };


  return (
    <div className="w-full">
      {/* 🔹 Hero Section (Smartphones) */}
      <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-200 overflow-hidden">
  <div className="w-full max-w-7xl mx-auto px-4 md:px-20 flex flex-col md:flex-row items-center">
    {/* Left Content */}
    <div className="flex-1 text-center md:text-left order-1 -mt-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        🛒 “Freshness you can trust, prices you'll love.”
      </h1>
      <p className="text-gray-700 mb-6">
        Shop with confidence knowing every product is fresh and easy on your wallet.
      </p>

      {/* Desktop Button */}
      <div className="hidden md:block">
        <button
          onClick={handleExplore}
          className="bg-blue-600 text-white px-6 py-2 rounded-3xl hover:bg-blue-700 transition"
        >
          {explored ? "Explored" : "Explore all"}
        </button>
      </div>
    </div>

    {/* Right Image (Animated Cart) */}
    <motion.div
      className="flex-1 flex justify-center md:justify-end items-start order-2 mt-6 md:mt-0"
      initial={{ x: "-100vw" }}       
      animate={{ x: 0 }}              
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <img
        src="/Homepage.png"
        alt="Grocery Store"
        className="max-w-full h-auto md:w-[700px] md:h-[700px] object-contain border-none outline-none mix-blend-multiply rounded-2xl"
      />
    </motion.div>

    {/* Mobile Button */}
    <div className="order-3 md:hidden mt-6">
      <button
        onClick={handleExplore}
        className="bg-blue-600 text-white px-6 py-2 rounded-3xl hover:bg-blue-700 transition"
      >
        {explored ? "Explored" : "Explore all"}
      </button>
    </div>
  </div>
</section>

      {/* 🔹 Speakers Banner */}
      <section className="w-full flex justify-center mt-12">
        <div className="w-full max-w-7xl bg-[#0a1a44] py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between rounded-xl">
          {/* Left Speaker */}
          <div className="flex-1 flex justify-center md:justify-start mb-6 md:mb-0">
            <img
              src="/grocery basket 2.webp"
              alt="Speakers"
              className="w-[150px] md:w-[200px] object-contain"
            />
          </div>

          {/* Center Content */}
          <div className="flex-1 text-center text-white">
            <p className="text-sm mb-2">Fresh Deals,Fuller Meals</p>
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Get Extra 10% off at your first order
            </h2>
            <button
              onClick={handleShopNow}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {clicked ? "Offer Applied" : "Shop Now"}
            </button>
          </div>

          {/* Right Speaker */}
          <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
            <img
              src="/grocery basket 2.webp"
              alt="Speaker"
              className="w-[150px] md:w-[200px] object-contain"
            />
          </div>
        </div>
      </section>


      {/* 🔹 What We Provide Section */}
<section className="w-full py-16 bg-white">
  <div className="container mx-auto px-6 md:px-12">
    {/* Title */}
    <h2 className="text-3xl font-bold text-center mb-12">
      What <span className="text-blue-600">we</span> provide?
    </h2>

    {/* Grid of Categories */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => setSelected(cat.id)}
          className={`bg-gradient-to-br from-purple-50 to-blue-100 p-6 rounded-2xl flex flex-col items-center shadow hover:shadow-lg transition cursor-pointer ${
            selected === cat.id ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <img
            src={cat.image}
            alt={cat.name}
            className="w-28 h-28 object-contain mb-4"
          />
          <p className="font-semibold">{cat.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* 🔹 New Arrival Section */}
      <section className="w-full mt-16 px-6 md:px-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          New <span className="text-blue-600">arrival</span> for you
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              {/* Product Image */}
              <div className="w-full h-40 flex justify-center items-center bg-gray-100 rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Product Info */}
              <h3 className="text-sm font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.description}</p>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">₹{product.price}</span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{product.oldPrice}
                </span>
                <span className="text-green-600 text-sm font-semibold">
                  {product.discount}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center mt-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Promotional Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promos.map((promo) => {
              if (promo.layout === "center") {
                return (
                  <div
                    key={promo.id}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-10 shadow hover:shadow-lg transition flex flex-col items-center text-center"
                  >
                    <h3 className="text-3xl font-bold mb-6">{promo.title}</h3>
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full max-w-md object-contain mb-6"
                    />
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg font-medium flex items-center gap-2">
                      Discover Now <span>→</span>
                    </button>
                  </div>
                );
              }

              if (promo.layout === "discount") {
                return (
                  <div
                    key={promo.id}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow hover:shadow-lg transition flex flex-col relative"
                  >
                    <div className="flex justify-end mb-6">
                      <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg font-medium flex items-center gap-2">
                        Discover Now →
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="max-w-md">
                        <h3 className="text-5xl font-extrabold mb-4">
                          {promo.title}
                        </h3>
                        <p className="text-gray-700 text-base leading-relaxed text-justify">
                          {promo.description}
                        </p>
                      </div>
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="h-80 object-contain"
                      />
                    </div>
                  </div>
                );
              }

              if (promo.layout === "left-text") {
                return (
                  <div
                    key={promo.id}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 shadow hover:shadow-lg transition flex items-center justify-between"
                  >
                    <div className="flex flex-col justify-between h-full max-w-sm">
                      <h3 className="text-3xl font-extrabold leading-snug mb-6">
                        {promo.title}
                      </h3>
                      <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg font-medium flex items-center gap-2 w-50">
                        Discover Now →
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="h-72 object-contain"
                      />
                    </div>
                  </div>
                );
              }

              if (promo.layout === "right-text") {
                return (
                  <div
                    key={promo.id}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 shadow hover:shadow-lg transition flex items-center justify-between"
                  >
                    <div className="flex justify-center">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="h-48 object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-start text-right">
                      <h3 className="text-3xl font-extrabold leading-snug mb-3">
                        {promo.title}
                      </h3>
                      <p className="text-base text-gray-700 mb-6">
                        {promo.description}
                      </p>
                      <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg font-medium flex items-center gap-2">
                        Discover Now →
                      </button>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-gray-50">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-8">
          Best <span className="text-blue-600">Deals</span> for you
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              {/* Image */}
              <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Product Title */}
              <h3 className="text-sm font-medium mb-2 text-gray-800">
                {product.title}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-gray-900">
                  ₹ {product.price}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹ {product.oldPrice}
                </span>
                <span className="text-green-600 text-sm font-semibold">
                  {product.discount}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f9f9f9] py-16 px-6 flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Our <span className="text-blue-600">Customer</span> Says
        </h2>

        <div className="relative w-full max-w-4xl flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute -left-5 md:-left-12 bg-blue-600 text-white p-1.5 md:p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <FaChevronLeft className="text-xs md:text-base" />
          </button>

          {/* Testimonial Cards */}
          <div className="relative w-full h-[260px] md:h-[350px] flex items-center justify-center">
            {data.map((item, index) => {
              let position = "opacity-0 scale-75 blur-sm z-0"; // default hidden
              if (index === current) {
                position = "opacity-100 scale-100 blur-0 z-20"; // active card
              } else if (
                index === (current + 1) % data.length || // next card
                index === (current - 1 + data.length) % data.length // prev card
              ) {
                position = "opacity-60 scale-90 blur-sm z-10"; // side cards
              }

              return (
                <div
                  key={item.id}
                  className={`absolute transition-all duration-700 ease-in-out transform bg-white rounded-lg shadow-md 
                px-4 py-4 md:px-8 md:py-10 text-center 
                max-w-xs md:max-w-md 
                bg-gradient-to-r from-purple-100 to-blue-100 ${position}`}
                >
                  <div className="flex justify-center mb-3 md:mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-sm md:text-lg">{item.name}</h3>
                  <div className="text-gray-700 mt-2 md:mt-4 flex flex-col items-center">
                    <FaQuoteLeft className="text-base md:text-xl text-gray-500 mb-2" />
                    <p className="max-w-xs md:max-w-xl text-xs md:text-base">{item.text}</p>
                    <FaQuoteRight className="text-base md:text-xl text-gray-500 mt-2" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute -right-5 md:-right-12 bg-blue-600 text-white p-1.5 md:p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <FaChevronRight className="text-xs md:text-base" />
          </button>
        </div>
      </section>
    </div>
  );
}
