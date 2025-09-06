import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import useWishlistStore from "../store/useWishlistStore";

function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col">
      {/* Title at the top */}
      <h1 className="text-center text-2xl font-bold py-6">Wishlist ❤️</h1>
    
      {/* Empty cart message centered */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg">No items in wishlist</p>
      </div>
    </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-center text-2xl font-bold mb-6">My Wishlist ❤️</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
            >
              {/* Product Image & Info */}
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer"
              >
                <img
                  src={product.image || "/Product.jpg"}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.brand}</p>
                <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
              </div>

              {/* Remove Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  removeFromWishlist(product.id);
                  toast.error(`${product.name} removed from wishlist`);
                }}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default WishlistPage;



// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import useWishlistStore from "../store/useWishlistStore";


// function WishlistPage() {
//   const { wishlist, fetchWishlist, toggleWishlist, loading, error } =
//     useWishlistStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchWishlist();
//   }, [fetchWishlist]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-500">
//         Loading your wishlist...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
//         <p>{error}</p>
//         <button
//           onClick={fetchWishlist}
//           className="mt-4 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-center text-2xl font-bold mb-6">My Wishlist ❤️</h1>

//       {wishlist.length === 0 ? (
//         <p className="text-center text-gray-500">No items in wishlist</p>
//       ) : (
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           <AnimatePresence>
//             {wishlist.map((product) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
//               >
//                 {/* Product Image & Info */}
//                 <div
//                   onClick={() =>
//                     navigate(`/product/${product.id}`, { state: product })
//                   }
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-48 object-contain mb-4"
//                   />
//                   <h2 className="text-lg font-semibold">{product.name}</h2>
//                   <p className="text-gray-500 text-sm">{product.brand}</p>
//                   <p className="text-lg font-bold text-gray-900">
//                     ₹{product.price}
//                   </p>
//                 </div>

//                 {/* Delete Button */}
//                 <motion.button
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => {
//                     toggleWishlist(product);
//                     toast.error(`${product.name} removed from wishlist ❌`);
//                   }}
//                   className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                 >
//                   Remove
//                 </motion.button>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// }

// export default WishlistPage;


// import React from "react";
// import { useNavigate } from "react-router-dom";

// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import useWishlistStore from "../store/useWishlistStore";

// function WishlistPage() {
//   const { wishlist, toggleWishlist } = useWishlistStore();
//   const navigate = useNavigate();

//   const handleRemove = (product) => {
//     toggleWishlist(product);
//     toast.error(`${product.name} removed from wishlist`);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-center text-2xl font-bold mb-6">My Wishlist ❤️</h1>

//       {wishlist.length === 0 ? (
//         <p className="text-center text-gray-500">No items in wishlist</p>
//       ) : (
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           <AnimatePresence>
//             {wishlist.map((product) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
//               >
//                 {/* Product Image & Info */}
//                 <div
//                   onClick={() =>
//                     navigate(`/product/${product.id}`, { state: product })
//                   }
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-48 object-contain mb-4"
//                   />
//                   <h2 className="text-lg font-semibold">{product.name}</h2>
//                   <p className="text-gray-500 text-sm">{product.brand}</p>
//                   <p className="text-lg font-bold text-gray-900">
//                     ₹{product.price}
//                   </p>
//                 </div>

//                 {/* Delete Button */}
//                 <motion.button
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => handleRemove(product)}
//                   className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                 >
//                   Remove
//                 </motion.button>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// }

// export default WishlistPage;
