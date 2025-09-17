import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Services/useAxiosSecure";
import useAuth from "../../../AuthProvider/useAuth";
import { Link } from "react-router";

const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${user?.email}`);
      return res.data;
    },
  });
  console.log(products);
  if(isLoading){
    return <div> products loading... </div>
  }
  // every product should contain a review after details in home page
  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold">Products</h2>
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Details</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, i) => (
                <tr key={product?._id} >
                  <th>{i+1}</th>
                  <td>{product?.name}</td>
                  <td>{product?.category}</td>
                  <td>{product?.price}</td>
                  <td>{product?.stock}</td>
                  <td>{product?.details}</td>
                  <td><button className="btn btn-sm btn-accent" >{product?.details && 'Active'}</button></td>
                    <td><button className="btn btn-sm btn-warning" >Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
