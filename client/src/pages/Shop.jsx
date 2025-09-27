import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Services/useAxiosSecure";
import Products from "../Common/Products";

const Shop = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res;
    },
  });

  // console.log(products?.data);
  return (
    <div className="py-8">
      <h1 className="text-2xl">show base on pagination && filter</h1>

      <div className="p-4 flex items-center gap-2" >
        <div>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
        </div>
        <div>
            more filter option(dropdown)
        </div>
      </div>
      <Products products={products?.data}></Products>
    </div>
  );
};

export default Shop;
