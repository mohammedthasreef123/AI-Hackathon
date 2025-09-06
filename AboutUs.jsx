// src/components/AboutUs.jsx
import React from "react";

export default function AboutUs() {
  return (
    <section className="bg-blue-50 py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-400 text-white text-center py-4 rounded-t-lg">
          <h2 className="text-xl sm:text-2xl font-bold">About Us</h2>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 text-gray-800 leading-relaxed">
          {/* Who We Are */}
          <h3 className="font-semibold text-lg sm:text-xl mb-2">Who We Are-</h3>
          <p className="mb-6 text-sm sm:text-base">
            Welcome to <span className="font-bold">Cart & Carry</span>, your trusted destination for fresh and reliable groceries. We are passionate about bringing quality food and daily essentials to your home, whether you’re shopping for farm-fresh produce, pantry staples, or household needs. With a deep understanding of freshness and customer care, we aim to make healthy and convenient shopping accessible, affordable, and enjoyable for everyone.
          </p>

          {/* What We Offer */}
          <h3 className="font-semibold text-lg sm:text-xl mb-2">What We Offer-</h3>
          <p className="mb-6 text-sm sm:text-base">
            From fresh fruits and vegetables to dairy, grains, snacks, beverages, and household essentials, our collection is carefully curated to ensure quality and value. We partner with trusted farmers, suppliers, and brands to offer you a wide selection—always fresh, genuine, and dependable. Our easy-to-use online platform and fast doorstep delivery ensure you enjoy a smooth shopping experience from cart to kitchen.

          </p>

          {/* Our Promise */}
          <h3 className="font-semibold text-lg sm:text-xl mb-2">Our Promise-</h3>
          <p className="text-sm sm:text-base">
            At <span className="font-bold">Cart & Carry</span>, we believe groceries are more than just daily necessities—they’re what nourish families, create memories, and bring comfort to everyday life. Our commitment is to deliver exceptional freshness, honest pricing, and customer-first service. Whether you’re stocking up for the week, preparing a special meal, or just picking up essentials, we’re here to make sure you get the best, every time.
          </p>
        </div>
      </div>
    </section>
  );
}