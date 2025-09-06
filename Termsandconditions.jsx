// src/pages/Terms.jsx
import React from "react";

export default function TermsandConditions() {
  return (
    <section className="bg-blue-50 min-h-screen py-10 px-4 sm:px-6 lg:px-12 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-400 text-white text-center py-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Terms & Conditions</h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">General Terms</h3>
            <p>
              By accessing and using [Cart & Carry Smart Grocery Store Market], you agree to comply with and be bound by the following terms and conditions. These terms apply to all visitors, shoppers, and users of our website, mobile app, and in-store services. We reserve the right to update or modify these terms at any time without prior notice, and your continued use of our services—whether online or in-store—constitutes acceptance of any changes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Product Information & Orders
            </h3>
            <p>
              We strive to provide accurate and up-to-date information about our grocery products, including descriptions, nutritional details, pricing, and availability. However, occasional errors may occur, and we reserve the right to correct any inaccuracies and cancel orders if necessary. All orders are subject to acceptance and stock availability, and we may limit or refuse quantities purchased at our sole discretion to ensure fair access for all customers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Liability & Warranty
            </h3>
            <p>
              All grocery products sold on [Cart & Carry Smart Grocery Store Market] are sourced from trusted suppliers and brands to ensure quality and freshness. While we take every measure to maintain product safety, we are not responsible for any indirect, incidental, or consequential damages arising from the use or misuse of our products. It is the customer’s responsibility to check product labels, storage instructions, and expiry dates, and to handle and consume items in accordance with the recommended guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}