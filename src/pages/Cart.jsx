import { useSelector, useDispatch } from "react-redux";
import { remove, updateQuantity } from "../redux/Slices/cartSlice";
import { useEffect, useState } from "react";

function Cart() {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const removeFromCart = (productId) => {
    dispatch(remove(productId));
  };


  const [amount, setAmount] = useState(0);
  // console.log(cart)
  useEffect(() => {
    setAmount(cart.reduce((acc, curr) => acc + Number(curr.price), 0));
  }, [cart]);

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">INR {item.price}</p>
                </div>
                <div className="flex items-center">

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-primary">
                INR {amount}
              </span>
            </div>
            <button className="btn-primary w-full mt-4">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
