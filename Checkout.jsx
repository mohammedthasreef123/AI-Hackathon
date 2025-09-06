// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCheckoutStore from "../store/useCheckoutStore";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const {
    contact,
    shipping,
    payment,
    showSuccess,
    cartItems,
    setContact,
    setShipping,
    setPayment,
    setShowSuccess,
    updateQuantity,
  } = useCheckoutStore();

  const [errors, setErrors] = useState({});

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const validateContact = () => {
    let newErrors = {};
    if (!contact.firstName.trim()) newErrors.firstName = "First name is required";
    if (!contact.phone.trim()) newErrors.phone = "Phone number is required";
    if (!contact.email.trim()) newErrors.email = "Email is required";
    return newErrors;
  };

  const validateShipping = () => {
    let newErrors = {};
    if (!shipping.address.trim()) newErrors.address = "Street address is required";
    if (!shipping.country.trim()) newErrors.country = "Country is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.state.trim()) newErrors.state = "State is required";
    if (!shipping.zip.trim()) newErrors.zip = "Zip code is required";
    return newErrors;
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Your Store",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        navigate("/order-success");
      },
      prefill: {
        name: contact.firstName + " " + contact.lastName,
        email: contact.email,
        contact: contact.phone,
      },
      theme: { color: "#2563eb" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePlaceOrder = () => {
    const contactErrors = validateContact();
    const shippingErrors = validateShipping();
    const allErrors = { ...contactErrors, ...shippingErrors };
    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0 || !payment) return;

    if (payment === "upi") {
      handleRazorpayPayment();
    } else if (payment === "cod") {
      setShowSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-7xl">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-white border rounded-md p-4 sm:p-6">
              <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First name"
                    value={contact.firstName}
                    onChange={(e) => setContact({ firstName: e.target.value })}
                    className="w-full border rounded-md p-2 text-sm"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last name (Optional)"
                    value={contact.lastName}
                    onChange={(e) => setContact({ lastName: e.target.value })}
                    className="w-full border rounded-md p-2 text-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Phone number"
                  value={contact.phone}
                  onChange={(e) => setContact({ phone: e.target.value })}
                  className="w-full border rounded-md p-2 text-sm"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={contact.email}
                  onChange={(e) => setContact({ email: e.target.value })}
                  className="w-full border rounded-md p-2 text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border rounded-md p-4 sm:p-6">
              <h2 className="font-semibold text-lg mb-5">Shipping Address</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Street Address"
                  value={shipping.address}
                  onChange={(e) => setShipping({ address: e.target.value })}
                  className="w-full border rounded-md p-2 text-sm mb-2"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
                )}
              </div>
              <div className="mb-4">
                <select
                  value={shipping.country}
                  onChange={(e) => setShipping({ country: e.target.value })}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  <option value="">Select Country</option>
                  <option>India</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-xs">{errors.country}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Town / City"
                  value={shipping.city}
                  onChange={(e) => setShipping({ city: e.target.value })}
                  className="w-full border rounded-md p-2 text-sm mb-1"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    value={shipping.state}
                    onChange={(e) => setShipping({ state: e.target.value })}
                    className="w-full border rounded-md p-2 text-sm mb-1"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs">{errors.state}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={shipping.zip}
                    onChange={(e) => setShipping({ zip: e.target.value })}
                    className="w-full border rounded-md p-2 text-sm"
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-xs">{errors.zip}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6 flex flex-col">
            {/* Order Summary */}
            <div className="bg-white border rounded-md p-4 sm:p-6 flex flex-col h-auto lg:h-[280px]">
              <h2 className="font-semibold text-lg mb-4">Order summary</h2>
              <div className="flex-1 overflow-y-auto max-h-[200px] lg:max-h-[140px]">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-2 border-b last:border-b-0"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover border rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm sm:text-base">{item.title}</p>
                      <div className="flex items-center mt-1 border rounded w-fit text-xs sm:text-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2"
                        >
                          -
                        </button>
                        <span className="px-2 border-x">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="font-medium text-sm sm:text-base">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="border-t my-1"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Mode */}
            <div className="bg-white border rounded-md p-4 sm:p-6">
              <h2 className="font-semibold text-lg mb-3">Payment Mode</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between border rounded-md p-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://img.icons8.com/color/48/google-pay-india.png"
                      alt="upi"
                      className="w-7 h-7 sm:w-8 sm:h-8"
                    />
                    <span className="text-sm sm:text-base">Online Payment</span>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === "upi"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                </label>
                <label className="flex items-center justify-between border rounded-md p-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://img.icons8.com/fluency/48/cash.png"
                      alt="cod"
                      className="w-7 h-7 sm:w-8 sm:h-8"
                    />
                    <span className="text-sm sm:text-base">Cash On Delivery</span>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                </label>
              </div>

              {/* PLACE ORDER BUTTON (Moved here) */}
              <button
                onClick={handlePlaceOrder}
                disabled={!payment}
                className={`w-full mt-4 font-medium py-3 rounded-md transition-colors ${
                  payment
                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {payment === "cod"
                  ? "Place Order"
                  : payment === "upi"
                  ? "Pay Online"
                  : "Select Payment Mode"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COD Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] sm:w-[400px]">
            <div className="text-green-600 text-5xl mb-4">✔</div>
            <h2 className="text-lg font-semibold">
              Order Placed Successfully!
            </h2>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}












// src/pages/CheckoutPage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CheckoutPage() {
//   const navigate = useNavigate();

//   const [payment, setPayment] = useState("");
//   const [contact, setContact] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//   });
//   const [shipping, setShipping] = useState({
//     address: "",
//     country: "",
//     city: "",
//     state: "",
//     zip: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [showSuccess, setShowSuccess] = useState(false);

//   const [cartItems, setCartItems] = useState([
//     { id: 1, title: "Tray Table", price: 49999, quantity: 1, img: "assets/Phone.png" },
//     { id: 2, title: "Chair", price: 29999, quantity: 1, img: "assets/Chair.png" },
//     { id: 3, title: "Lamp", price: 1999, quantity: 1, img: "assets/Lamp.png" },
//     { id: 4, title: "Cushion", price: 999, quantity: 1, img: "assets/Cushion.png" },
//   ]);

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const updateQuantity = (id, newQty) => {
//     if (newQty < 1) return;
//     setCartItems((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
//     );
//   };

//   const validateContact = () => {
//     let newErrors = {};
//     if (!contact.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!contact.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!contact.email.trim()) newErrors.email = "Email is required";
//     return newErrors;
//   };

//   const validateShipping = () => {
//     let newErrors = {};
//     if (!shipping.address.trim()) newErrors.address = "Street address is required";
//     if (!shipping.country.trim()) newErrors.country = "Country is required";
//     if (!shipping.city.trim()) newErrors.city = "City is required";
//     if (!shipping.state.trim()) newErrors.state = "State is required";
//     if (!shipping.zip.trim()) newErrors.zip = "Zip code is required";
//     return newErrors;
//   };

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleRazorpayPayment = async () => {
//     const res = await loadRazorpay();
//     if (!res) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     const options = {
//       key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
//       amount: totalAmount * 100, // in paise
//       currency: "INR",
//       name: "Your Store",
//       description: "Order Payment",
//       handler: function (response) {
//         alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
//         navigate("/order-success"); // Optional: navigate to success page
//       },
//       prefill: {
//         name: contact.firstName + " " + contact.lastName,
//         email: contact.email,
//         contact: contact.phone,
//       },
//       theme: {
//         color: "#2563eb",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const handlePlaceOrder = () => {
//     const contactErrors = validateContact();
//     const shippingErrors = validateShipping();
//     const allErrors = { ...contactErrors, ...shippingErrors };
//     setErrors(allErrors);

//     if (Object.keys(allErrors).length > 0 || !payment) return;

//     if (payment === "upi") {
//       handleRazorpayPayment();
//     } else if (payment === "cod") {
//       setShowSuccess(true);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
//       <div className="w-full max-w-7xl">
//         <h1 className="text-2xl font-bold text-center mb-4">Checkout</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Section */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Contact Info */}
//             <div className="bg-white border rounded-md p-6">
//               <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="First name"
//                     value={contact.firstName}
//                     onChange={(e) =>
//                       setContact({ ...contact, firstName: e.target.value })
//                     }
//                     className="w-full border rounded-md p-2 text-sm"
//                   />
//                   {errors.firstName && (
//                     <p className="text-red-500 text-xs">{errors.firstName}</p>
//                   )}
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Last name (Optional)"
//                     value={contact.lastName}
//                     onChange={(e) =>
//                       setContact({ ...contact, lastName: e.target.value })
//                     }
//                     className="w-full border rounded-md p-2 text-sm"
//                   />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <input
//                   type="text"
//                   placeholder="Phone number"
//                   value={contact.phone}
//                   onChange={(e) =>
//                     setContact({ ...contact, phone: e.target.value })
//                   }
//                   className="w-full border rounded-md p-2 text-sm"
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-xs">{errors.phone}</p>
//                 )}
//               </div>
//               <div className="mt-4">
//                 <input
//                   type="email"
//                   placeholder="Your Email"
//                   value={contact.email}
//                   onChange={(e) =>
//                     setContact({ ...contact, email: e.target.value })
//                   }
//                   className="w-full border rounded-md p-2 text-sm"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-xs">{errors.email}</p>
//                 )}
//               </div>
//             </div>

//             {/* Shipping Address */}
//             <div className="bg-white border rounded-md p-6">
//               <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   value={shipping.address}
//                   onChange={(e) =>
//                     setShipping({ ...shipping, address: e.target.value })
//                   }
//                   className="w-full border rounded-md p-2 text-sm"
//                 />
//                 {errors.address && (
//                   <p className="text-red-500 text-xs">{errors.address}</p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <select
//                   value={shipping.country}
//                   onChange={(e) =>
//                     setShipping({ ...shipping, country: e.target.value })
//                   }
//                   className="w-full border rounded-md p-2 text-sm"
//                 >
//                   <option value="">Select Country</option>
//                   <option>India</option>
//                 </select>
//                 {errors.country && (
//                   <p className="text-red-500 text-xs">{errors.country}</p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Town / City"
//                   value={shipping.city}
//                   onChange={(e) =>
//                     setShipping({ ...shipping, city: e.target.value })
//                   }
//                   className="w-full border rounded-md p-2 text-sm"
//                 />
//                 {errors.city && (
//                   <p className="text-red-500 text-xs">{errors.city}</p>
//                 )}
//               </div>
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="State"
//                     value={shipping.state}
//                     onChange={(e) =>
//                       setShipping({ ...shipping, state: e.target.value })
//                     }
//                     className="w-full border rounded-md p-2 text-sm"
//                   />
//                   {errors.state && (
//                     <p className="text-red-500 text-xs">{errors.state}</p>
//                   )}
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Zip Code"
//                     value={shipping.zip}
//                     onChange={(e) =>
//                       setShipping({ ...shipping, zip: e.target.value })
//                     }
//                     className="w-full border rounded-md p-2 text-sm"
//                   />
//                   {errors.zip && (
//                     <p className="text-red-500 text-xs">{errors.zip}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Place Order */}
//             <button
//               onClick={handlePlaceOrder}
//               disabled={!payment}
//               className={`w-full font-medium py-3 rounded-md transition-colors ${
//                 payment
//                   ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               {payment === "cod" ? "Place Order" : payment === "upi" ? "Pay Online" : "Select Payment Mode"}
//             </button>
//           </div>

//           {/* Right Section */}
//           <div className="space-y-6">
//             {/* Order Summary */}
//             <div className="bg-white border rounded-md p-6 flex flex-col h-[280px]">
//               <h2 className="font-semibold text-lg mb-4">Order summary</h2>

//               <div className="flex-1 overflow-y-auto" style={{ maxHeight: "140px" }}>
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-4 p-2 border-b last:border-b-0"
//                     style={{ minHeight: "70px" }}
//                   >
//                     <img
//                       src={item.img}
//                       alt={item.title}
//                       className="w-16 h-16 object-cover border rounded-md"
//                     />
//                     <div className="flex-1">
//                       <p className="font-medium text-sm">{item.title}</p>
//                       <div className="flex items-center mt-1 border rounded w-fit text-xs">
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                           className="px-2"
//                         >
//                           -
//                         </button>
//                         <span className="px-2 border-x">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           className="px-2"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <p className="font-medium text-sm">
//                       ₹{(item.price * item.quantity).toLocaleString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-2 mt-2">
//                 <div className="flex justify-between text-sm">
//                   <span>Shipping</span>
//                   <span>Free</span>
//                 </div>
//                 <div className="flex justify-between text-sm mt-4">
//                   <span>Subtotal</span>
//                   <span>₹{totalAmount.toLocaleString()}</span>
//                 </div>
//                 <div className="border-t my-1"></div>
//                 <div className="flex justify-between font-semibold text-lg ">
//                   <span>Total</span>
//                   <span>₹{totalAmount.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Mode */}
//             <div className="bg-white border rounded-md p-6">
//               <h2 className="font-semibold text-lg mb-4">Payment Mode</h2>
//               <div className="space-y-4">
//                 <label className="flex items-center justify-between border rounded-md p-3 cursor-pointer">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src="https://img.icons8.com/color/48/google-pay-india.png"
//                       alt="upi"
//                       className="w-8 h-8"
//                     />
//                     <span>Online Payment</span>
//                   </div>
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="upi"
//                     checked={payment === "upi"}
//                     onChange={(e) => setPayment(e.target.value)}
//                   />
//                 </label>

//                 <label className="flex items-center justify-between border rounded-md p-3 cursor-pointer">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src="https://img.icons8.com/fluency/48/cash.png"
//                       alt="cod"
//                       className="w-8 h-8"
//                     />
//                     <span>Cash On Delivery</span>
//                   </div>
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cod"
//                     checked={payment === "cod"}
//                     onChange={(e) => setPayment(e.target.value)}
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* COD Success Modal */}
//       {showSuccess && (
//         <div className="fixed inset-0 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <div className="text-green-600 text-5xl mb-4">✔</div>
//             <h2 className="text-lg font-semibold">Order Placed Successfully!</h2>
//             <button
//               onClick={() => setShowSuccess(false)}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
