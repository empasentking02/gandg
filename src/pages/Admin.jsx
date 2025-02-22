import { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDocuments } from '../hooks/useDocuments';
import { toast } from 'react-toastify';
import Gallery from '../components/Gallary';

function Admin() {
  const [productList, setProductList] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: ''
  });
  const { createDocument, data, updateDocument, deleteDocument } = useDocuments("Products");
  useEffect(() => {
    if (data) {
      setProductList(data);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // This will be implemented later with Firebase
    if (editingProduct) {
      const productData = {
        ...formData,
        updatedAt: new Date(),
      };
      // console.log(editingProduct.id)
      await updateDocument(editingProduct.id, productData, "Products");
      toast.success("Product updated successfully!");
      setEditingProduct(null);
    } else {
      const productData = {
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await createDocument(productData, "Products");
    }
    setFormData({
      name: '',
      category: '',
      price: '',
      image: '',
      description: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description
    });
  };

  const handleDelete = async (productId) => {
    try {
      await deleteDocument(productId, "Products");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      image: '',
      description: ''
    });
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>
      <button
        type={"button"}
        className=" border-black border mx-auto text-blue-600 font-semibold text-xl rounded-lg px-4 py-1 "
        onClick={() => setShowGallery(true)}>
        Gallary
      </button>
      {/* Gallery Modal*/}
      {showGallery && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <Gallery setShowGallery={setShowGallery} />
        </div>
      )}
      {/* Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select category</option>
              <option value="Necklaces">Necklaces</option>
              <option value="Earrings">Earrings</option>
              <option value="Gift Hamper">Gift Hamper</option>
              <option value="Hair Accessories">Hair accessories</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Soft Toys">Soft toys</option>
              <option value="Flower">Flower</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product List */}
      {productList && productList.length != 0 ? (<div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-800 p-6 border-b">Product List</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productList.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.price} INR</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>) : (<div className='text-center text-2xl font-semibold'> No Product Found </div>)}
    </div>
  );
}

export default Admin;