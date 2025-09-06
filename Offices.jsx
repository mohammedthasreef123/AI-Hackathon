// src/components/Offices.jsx
import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Offices() {
  const offices = [
    {
      title: "Head Office",
      address: "Naya Gaun, Pokhara-15, PKR 33700",
      phone: "+977 9806771233",
      email: "cart&carry2234@gmail.com",
    },
    {
      title: "Corporate Office",
      address: "Naya Gaun, Pokhara-15, PKR 33700",
      phone: "+977 9806771233",
      email: "cart&carry2234@gmail.com",
    },
    {
      title: "Sales Office",
      address: "Naya Gaun, Pokhara-15, PKR 33700",
      phone: "+977 9806771233",
      email: "cart&carry2234@gmail.com",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-12 -mt-27">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-20 text-center sm: mt-10">
        Contact Us
      </h2>

      {/* Offices Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.map((office, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-blue-400 text-white text-center py-3 rounded-t-lg">
              <h3 className="text-lg font-semibold">{office.title}</h3>
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-3 text-gray-800 text-sm sm:text-base">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <p>{office.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-blue-500" />
                <p>{office.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                <p>{office.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}