import React, { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import useWishlistStore from "../store/useWishlistStore";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    cartItems,
    fetchCart,
    updateQuantity,
    removeItem,
    loading,
    error,
  } = useCartStore();

  const { addToWishlist } = useWishlistStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ✅ Safe reduce because cartItems is always []
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  const handleMoveToWishlist = async (item) => {
    addToWishlist(item);
    await removeItem(item.id);
    toast.success(`${item.name} moved to wishlist ❤️`);
  };

  if (loading) {
    return <p className="text-center py-10">Loading cart...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (!cartItems.length) {
    return (
      <div className="h-screen w-full flex flex-col">
        <h1 className="text-center text-2xl font-bold py-6">Shopping Bag</h1>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg">Your cart is empty 🛒</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-center text-2xl font-bold mb-10">Shopping Bag</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="border-b pb-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* Product Info */}
            <div className="flex items-center gap-4 col-span-2">
              <img
                src={item.image || "/Product.jpg"}
                alt={item.name}
                className="w-20 h-20 object-contain rounded"
              />
              <div>
                <h2 className="text-sm font-medium">{item.name}</h2>
                <p className="text-xs text-gray-500">Color: {item.color || "-"}</p>
                <p className="text-xs text-gray-500">Size: {item.size || "-"}</p>
              </div>
            </div>

            {/* Price */}
            <p className="text-sm font-semibold">₹ {item.price}</p>

            {/* Quantity + Subtotal */}
            <div className="flex items-center justify-between">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 text-lg"
                >
                  −
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 text-lg"
                >
                  +
                </button>
              </div>
              <p className="ml-4 font-semibold">
                ₹ {Number(item.price) * (item.quantity || 1)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  removeItem(item.id).then(() =>
                    toast.success(`${item.name} removed from cart 🛒`)
                  )
                }
                className="text-gray-500 hover:text-red-500 text-sm"
              >
                ✕ Remove
              </button>
              <button
                onClick={() => handleMoveToWishlist(item)}
                className="text-pink-500 hover:underline text-sm"
              >
                Move to Wishlist
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Checkout Button */}
      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
          Proceed to checkout (₹ {totalPrice})
        </button>
      </div>
    </div>
  );
};

export default CartPage;




// import React from "react";
// import { useCartStore } from "../store/useCartStore";
// import useWishlistStore from "../store/useWishlistStore";
// import toast from "react-hot-toast";
// import { div } from "framer-motion/client";

// const CartPage = () => {
//   const { cartItems, updateQuantity, removeItem } = useCartStore();
//   const { addToWishlist } = useWishlistStore();

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
//     0
//   );

//   const handleMoveToWishlist = (item) => {
//     addToWishlist(item);
//     removeItem(item.id);
//     toast.success(`${item.name} removed from cart 🛒`);
//   };

//   if (cartItems.length === 0) {
     
//     return(
//        <div className="h-screen w-full flex flex-col">
//   {/* Title at the top */}
//   <h1 className="text-center text-2xl font-bold py-6">Shopping Bag</h1>

//   {/* Empty cart message centered */}
//   <div className="flex-1 flex items-center justify-center">
//     <p className="text-lg">Your cart is empty 🛒</p>
//   </div>
// </div>
//     )
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
//        <h1 className="text-center text-2xl font-bold mb-10">Shopping Bag</h1>
//       {cartItems.map((item) => (
//         <div key={item.id} className="border-b pb-4 mb-4">
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
//             {/* Product Info */}
//             <div className="flex items-center gap-4 col-span-2">
//               <img
//                 src={item.image || "/Product.jpg"}
//                 alt={item.name}
//                 className="w-20 h-20 object-contain rounded"
//               />
//               <div>
//                 <h2 className="text-sm font-medium">{item.name}</h2>
//                 <p className="text-xs text-gray-500">
//                   Color: {item.color || "-"}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Size: {item.size || "-"}
//                 </p>
//               </div>
//             </div>

//             {/* Price */}
//             <p className="text-sm font-semibold">₹ {item.price}</p>

//             {/* Quantity + Subtotal */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center border rounded">
//                 <button
//                   onClick={() => updateQuantity(item.id, -1)}
//                   className="px-2 py-1 text-lg"
//                 >
//                   −
//                 </button>
//                 <span className="px-3">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item.id, 1)}
//                   className="px-2 py-1 text-lg"
//                 >
//                   +
//                 </button>
//               </div>
//               <p className="ml-4 font-semibold">
//                 ₹ {Number(item.price) * (item.quantity || 1)}
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col gap-2">
//               <button
//                 onClick={() => removeItem(item.id)
//                   .then(() => {
//                     toast.success(`${item.name} removed from cart 🛒`);
//                   })}
//                 className="text-gray-500 hover:text-red-500 text-sm"
//               >
//                 ✕ Remove
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Checkout Button */}
//       <div className="flex justify-end mt-6">
//         <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
//           Proceed to checkout (₹ {totalPrice})
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
