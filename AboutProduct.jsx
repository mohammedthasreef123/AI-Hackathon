// src/components/Products.jsx
import React from "react";

export default function AboutProducts() {
  return (
    <section className="bg-blue-50 py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-400 text-white text-center py-4 rounded-t-lg">
          <h2 className="text-xl sm:text-2xl font-bold">About Products</h2>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 text-gray-800 leading-relaxed space-y-6">
          {/* Quality & Variety */}
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">
              Quality &amp; Variety-
            </h3>
            <p className="text-sm sm:text-base mb-4">
Our product range is designed to meet the needs of every household. From fresh fruits and vegetables to pantry staples, dairy products, beverages, and household essentials, we offer a wide variety of groceries that combine freshness, quality, and value. Each item is carefully sourced from trusted farmers, suppliers, and brands to ensure you get the best in both taste and reliability.

Welcome to Cart & Carry, your trusted destination for fresh and reliable groceries. We are passionate about bringing quality food and daily essentials to your home—whether you’re shopping for farm-fresh produce, pantry items, or everyday household needs. With a deep understanding of freshness and customer care, we aim to make healthy and convenient shopping accessible, affordable, and enjoyable for everyone.
            </p>
            <p className="text-sm sm:text-base">
              Welcome to Cart & Carry, your trusted destination for the freshest and most reliable groceries. We are passionate about bringing quality food and daily essentials to your home—whether you’re shopping for farm-fresh produce, pantry staples, or household goods. With a deep understanding of freshness and customer needs, we aim to make healthy and convenient shopping accessible, affordable, and enjoyable for everyone.
            </p>
          </div>

          {/* Innovation & Value */}
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">
              Innovation &amp; Value-
            </h3>
            <p className="text-sm sm:text-base">
              We believe groceries should make life easier, healthier, and more enjoyable—not stressful. That’s why our products are always fresh, carefully selected, and priced fairly. Whether you’re stocking up your pantry, preparing for a family gathering, or just picking up daily essentials, our collection delivers great value without compromising on quality or freshness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
