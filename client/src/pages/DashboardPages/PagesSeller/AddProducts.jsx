import React, { useState } from "react";
import useAuth from "../../../AuthProvider/useAuth";
import useAxiosSecure from "../../../Services/useAxiosSecure";

const AddProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
  const [images, setImages] = useState([]);

  console.log(images)

  // Handle image upload (max 3)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("Maximum 3 images allowed!");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  // Submit form
  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const stock = form.stock.value;
    const price = form.price.value;
    const category = form.category.value;
    const details = form.details.value;

    const formData = new FormData();
 

  formData.append("email", user?.email);
  formData.append("name", name);
  formData.append("stock", stock);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("details", details);


 
 
  // append files
  images.forEach((img) => {
    formData.append("images", img);
  });


    console.log([...formData.entries()]);

    try{
        const res = await axiosSecure.post('/add-products', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res.data)
    }catch(err){
        console.log("Error for add products: ", err.message);
    }

   
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-1">Total Stock</label>
          <input
            type="number"
            name="stock"
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Details</label>
          <textarea
            name="details"
            rows="4"
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Images (Max 3)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full file-input file-input-neutral"
          />
          {/* Image preview */}
          <div className="flex gap-2 mt-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
