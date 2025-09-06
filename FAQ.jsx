// src/pages/FAQ.jsx
import React from "react";

export default function FAQ() {
  return (
    <section className="bg-blue-50 min-h-screen py-10 px-4 sm:px-6 lg:px-12 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-400 text-white text-center py-4">
          <h2 className="text-xl sm:text-2xl font-semibold">FAQ</h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              What types of products do you sell?
            </h3>
            <p>
              We offer a wide range of groceries, including fresh fruits and vegetables, dairy products, grains, snacks, beverages, pantry staples, household essentials, and more—all sourced from trusted suppliers and brands.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Are all your products original and under warranty?
            </h3>
            <p>
              Yes, all our products are 100% fresh and sourced from trusted suppliers, with our assurance of quality, authenticity, and safe handling from farm to shelf.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              How long does delivery take?
            </h3>
            <p>
              Delivery times vary depending on your location, but most grocery orders are processed within a few hours and delivered the same day or within 1–2 working days to ensure freshness.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              What payment methods do you accept?
            </h3>
            <p>
              We accept all major payment methods, including credit/debit cards, UPI, net banking, and select digital wallets. Cash on Delivery (COD) is also available in certain locations for your convenie
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              What is your return policy?
            </h3>
            <p>
              We offer easy returns and replacements for grocery items within [X] hours/days of delivery, provided the product is unopened, unused, and in its original packaging. Perishable items such as fresh fruits, vegetables, and dairy can only be returned at the time of delivery if they do not meet our quality standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}