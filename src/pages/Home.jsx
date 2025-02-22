import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocuments } from "../hooks/useDocuments";
import { add, remove } from "../redux/Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export const categories = [
  { name: "All Categories", path: "/" }, // New "All Categories" link
  { name: "Necklaces", path: "/?category=necklaces" },
  { name: "Earrings", path: "/?category=earrings" },
  { name: "Gift Hamper", path: "/?category=gift-hamper" },
  { name: "Hair Accessories", path: "/?category=hair accessories" },
  { name: "Bracelet", path: "/?category=bracelet" },
  { name: "Soft Toys", path: "/?category=soft toys" },
  { name: "Flower", path: "/?category=flower" },
  { name: "Ring", path: "/?category=ring" },

];

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const category = searchParams.get("category");
  const { data } = useDocuments("Products");
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (data) {
      setProducts(data);
      setFilteredProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (category && products) {
      setFilteredProducts(
        category === "All Categories"
          ? products
          : products.filter((product) => product.category === category)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  const handleCategoryClick = (selectedCategory) => {
    setSearchParams({ category: selectedCategory === "All Categories" ? "" : selectedCategory });
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

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
      {/* Categories Row */}
      <div className="mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex space-x-4  md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className={`px-4 py-2 border rounded-full text-sm md:text-base ${category === cat.name || (!category && cat.name === "All Categories")
                ? "bg-primary text-white font-bold"
                : "bg-gray-200 text-gray-800 hover:bg-primary hover:text-white"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
        <Link to="/cart" className="text-gray-700 hover:text-primary">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts &&
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => openLightbox(product.image)}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-primary font-bold">{product.price} INR</span>
                  {cart.some((p) => p.id === product.id) ? (
                    <button onClick={() => removeFromCart(product)} className="btn-primary">
                      Remove from Cart
                    </button>
                  ) : (
                    <button onClick={() => addToCart(product)} className="btn-primary">
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

      {isOpen && <Lightbox mainSrc={selectedImage} onCloseRequest={() => setIsOpen(false)} />}
    </div>
  );
}

export default Home;
