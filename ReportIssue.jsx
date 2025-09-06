import React, { useState } from "react";

const ReportIssue = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true); // show popup
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-md">
        {/* Header */}
        <div className="bg-blue-400 text-white text-center py-3 rounded-t-lg text-lg font-semibold">
          Report Issue
        </div>

        {/* Form */}
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Order Id */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Order Id / Any other references
            </label>
            <input
              type="text"
              placeholder="Enter Order Id or Reference"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Issue */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Issue
            </label>
            <textarea
              placeholder="Enter The Issue"
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
          </div>

          {/* Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ Issue Submitted
            </h2>
            <p className="text-gray-600 mb-4">
              Your issue has been successfully submitted. We’ll get back to you soon.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportIssue;
