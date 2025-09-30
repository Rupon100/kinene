import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Services/useAxiosSecure";
import useAuth from "../../../AuthProvider/useAuth";
import { Link } from "react-router";

const MyProducts = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: products = [], isLoading, refetch } = useQuery({
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

  // delete product
  const deleteProduct = async (id) => {
    setDeleteLoading(true);
    try {
      const res = await axiosSecure.delete(`/product/delete/${id}`);
      console.log(res.data)
      if(res.data?.deletedCount > 0){
        refetch();
        console.log("Deleted Successfully!");
      }
    }catch(err){
      console.log(err.message);
    }finally{
      setDeleteLoading(false);
    }
  }

  // active or inactive product
  const toggleStatus = async(id, currentStatus) => {
    console.log(id, currentStatus);
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try{
      const res = await axiosSecure.patch(`/product/${id}`, {status: newStatus});
      if(res.data.modifiedCount > 0){
        refetch();
        console.log(res.data);
      }
    }catch(err){
      console.log("Seller product status update error: ", err.message);
    }
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
                  <td>
                    <button onClick={() => toggleStatus(product?._id, product?.status)} className={` ${product?.status == "active" ? "btn btn-sm btn-accent" : "btn btn-sm"}`} >{product?.status || "inactive"}</button>
                  </td>
                    <td>
                      {
                        deleteLoading 
                        ? (
                          <button className="btn btn-sm btn-warning">
                            <span className="loading loading-sm loading-spinner"></span>
                            deleting..
                          </button>
                        ) :
                        (
                          <button onClick={() => deleteProduct(product._id)} className="btn btn-sm btn-warning" >Delete</button>

                        )
                      }
                    </td>
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
