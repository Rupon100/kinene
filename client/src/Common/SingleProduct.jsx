import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  const {
    _id,
    category,
    details,
    email,
    images,
    name,
    price,
    status,
    stock,
    createdAt,
  } = product;
  return (
    <div className="border rounded-xl shadow-md hover:shadow-lg p-4 my-4 transition duration-300 bg-white mx-4">
      {/* Product Image */}
      <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
        <img
          src={images}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">Category: {category}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{details}</p>
        <p className="font-medium text-orange-600">${price}</p>
        <p
          className={`text-sm ${
            status === "active" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status} - {stock} in stock
        </p>
      </div>

      {/* Link */}
      <div className="mt-4">
        <Link
          to={`/details/${_id}`}
          className="inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
