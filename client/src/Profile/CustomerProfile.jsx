import React, { useState } from "react";
import useAuth from "../AuthProvider/useAuth";
import useRole from "../Hooks/useRole";
import { Link } from "react-router";
import useAxiosSecure from "../Services/useAxiosSecure";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const CustomerProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("123 Main Street, City, Country");
  const [profileImage, setProfileImage] = useState(
    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  );
  const [imgLoad, setImgLoad] = useState(false);
  const [becomeSeller, setBecomeSeller] = useState({
    store_name: "",
    mobile_number: "",
    letter: "",
    location: "",
  })


  // get data and update instant
  const { data: dbUser, refetch } = useQuery({
    queryKey: ['db-users'],
    queryFn: async() => {
      const res = await axiosSecure.get(`/db-user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  })

  useEffect(() => {
    if(dbUser){
      if(dbUser.name) setDisplayName(dbUser.name)
      if(dbUser.address) setAddress(dbUser.address)
    }
  }, [dbUser])
   
  // get the profile image
  useEffect(() => {
    const getUser = async () => {
      try {
        setImgLoad(true);
        const res = await axiosSecure.get(`/users/${user?.email}`);
        setProfileImage(res.data?.profileImage);
        refetch()
      } catch (err) {
        console.log(err.message);
      }finally{
        setImgLoad(false);
      }
    };
    getUser();
  }, [axiosSecure, user?.email, refetch]);

  // profile name change
  const handleNameChange = async() => {
    setEditingName(false);
    console.log(displayName)
    try{
      await axiosSecure.patch(`/profile/username/${user?.email}`, {username: displayName});
      refetch();
       
    }catch(err){
      console.log("handle name change error: ", err.message);
    }
  };

  // customer address change
  const handleAddressChange = async () => {
    setEditingAddress(false);
    
    console.log(address)

    // post api from here
    try{
      const res = await axiosSecure.put(`/user/address/${user?.email}`, { address: address });
      console.log("Address: ", res);
      if(res.data?.modifiedCount > 0){
        console.log("address changed!");
        refetch();
        setAddress(dbUser?.address);
      }
    }catch(err){
      console.log("address change error frontend: ",err.message);
    }
  };

  // customer profile image change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosSecure.post(
        `/profile-image/${user?.email}`,
        formData
      ); // send formdata with append image and directly send not like object

      console.log("Upload image data: ", res.data);
      setProfileImage(res?.data?.secure_url);
    } catch (err) {
      console.log("Profile image upload problem: ", err.message);
    }
  };

  // apply for become seller
  const handleBecomeSeller = async () => {
    becomeSeller.email = user?.email;
    console.log(becomeSeller);

    try{
      const res = await axiosSecure.post(`/customer-to-seller/${user?.email}` , becomeSeller );
      console.log(res);
      if(res.data?.insertedId){
        console.log("Seller application sent to admin!");
      }
    }catch(err){
      console.log("Become Seller error: ", err.message);
      if(err?.response?.status == 409){
        console.log("User already Applied once!");
      }
    }

  }

  return (
    <div className="max-w-md mx-auto my-8 md:my-12 border border-gray-300/80 p-6 bg-white shadow-md rounded-md space-y-6">
      {/* Profile Header image */}
      <div className="flex flex-col items-center gap-4">
        {
          imgLoad ? <div className="h-20 w-20 border text-center" >Loading..</div> : <img
          src={profileImage}
          alt="profile"
          className="h-20 w-20 rounded-full object-cover"
        />
        }
        
        {/* input for image store image host */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-neutral"
        />

        {/* Display Name */}
        {editingName ? (
          <div className="flex gap-2">
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="border p-1 rounded"
            />
            <button
              onClick={handleNameChange}
              className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        ) : (
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {displayName || "Customer Name"}
            <button
              onClick={() => setEditingName(true)}
              className="text-sm text-blue-600 cursor-pointer"
            >
              Edit
            </button>
          </h2>
        )}
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* Role  & Dashboard */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-gray-700 font-medium">
          Current Role: <span className="font-bold">{role || "Customer"}</span>
        </p>
        <Link
          to={`/dashboard/customer`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Address Section */}
      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-2">Address</h3>
        {editingAddress ? (
          <div className="flex flex-col gap-2">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-1 rounded"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setEditingAddress(false)}
                className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddressChange}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{address}</p>
            <button
              onClick={() => setEditingAddress(true)}
              className="text-sm text-blue-600 cursor-pointer"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Upgrade to Seller */}
      {role === "customer" && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => setOpenUpgrade(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Apply to Become Seller
          </button>
        </div>
      )}

      {/* Upgrade Modal */}
      {openUpgrade && (
        <div className=" transition-all duration-200 fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-while/50  bg-opacity-40 z-100">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h3 className="text-lg font-semibold mb-4">
              Apply to Become Seller
            </h3>
            <p className="text-gray-600 mb-4">
              Fill in the necessary information to apply for a seller account.
            </p>
            <input
              type="text"
              onChange={(e) => setBecomeSeller({...becomeSeller, store_name: e.target.value})}
              placeholder="Store Name"
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              onChange={(e) => setBecomeSeller({...becomeSeller, mobile_number: e.target.value})}
              placeholder="Phone Number"
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              onChange={(e) => setBecomeSeller({...becomeSeller, location: e.target.value})}
              placeholder="Location"
              className="w-full border p-2 rounded mb-3"
            />
            <textarea 
            type="text"
            onChange={(e) => setBecomeSeller({...becomeSeller, letter: e.target.value})}
             placeholder="application"
              className="w-full border p-2 rounded mb-3 resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
              type="button"
                onClick={() => setOpenUpgrade(false)}
                className="cursor-pointer px-3 py-1 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
              onClick={handleBecomeSeller}
              type="button" 
              className="cursor-pointer px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;
