import React from "react";
import { Link } from "react-router-dom";
 
const Home = () => {
  const categories = [
    {
      name: "Men's",
      path: "/category/mens",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Women's",
      path: "/category/women",
      color: "from-pink-500 to-pink-700",
    },
    {
      name: "Baby",
      path: "/category/baby",
      color: "from-green-500 to-green-700",
    },
    {
      name: "Special Offer",
      path: "/category/special",
      color: "from-yellow-500 to-orange-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 md:space-y-10">
      <h2 className="text-xl font-semibold text-orange-600">
        Add a banner here && show product as category
      </h2>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-600">
        Explore Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={cat.path}
            className={`relative group rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r ${cat.color} text-white p-6 md:p-12 flex justify-center items-center text-xl md:text-2xl font-bold transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
          >
            <span className="relative z-10">{cat.name}</span>
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
