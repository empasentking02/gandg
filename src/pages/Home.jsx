import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDocuments } from '../hooks/useDocuments';
import { add, remove } from "../redux/Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

function Home() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const category = searchParams.get('category');
  const { data } = useDocuments("Products");
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setProducts(data);
      setFilteredProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (category && filteredProducts) {
      setFilteredProducts(products.filter(product => product.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [category]);



  const addToCart = (product) => {
    dispatch(add(product));
    toast.success("Item Added To Cart");
  };


  const removeFromCart = (product) => {
    dispatch(remove(product.id));
    toast.error("Item Removed From Cart");
  };
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts && filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-primary font-bold">{product.price} INR</span>
                {cart.some((p) => p.id === product.id) ? (
                  <button
                    onClick={() => removeFromCart(product)}
                    className="btn-primary"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="btn-primary"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredProducts && filteredProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;