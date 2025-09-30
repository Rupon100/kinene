import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../Services/useAxiosSecure';

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: productDetails, isLoading } = useQuery({
    queryKey: ['product-details', id], // include id to refetch if id changes
    queryFn: async () => {
      const res = await axiosSecure.get(`/details/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-10 text-lg">Details Loading...</div>;
  }

  if (!productDetails) {
    return <div className="text-center py-10 text-red-600">No product found!</div>;
  }

  const { category, details, email, images, name, price, status, stock } = productDetails;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Image Gallery */}
        <div>
          <div className="border rounded-xl overflow-hidden shadow-sm">
            <img
              src={selectedImage || images[0]}
              alt={name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${name} ${idx}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition 
                  ${selectedImage === img ? 'border-blue-500' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
          <p className="text-lg text-gray-600">{details}</p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-green-600">${price}</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium 
              ${status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}
            >
              {status}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-gray-700">
            <p><span className="font-semibold">Category:</span> {category}</p>
            <p><span className="font-semibold">Stock:</span> {stock}</p>
            <p><span className="font-semibold">Seller Email:</span> {email}</p>
          </div>

          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
