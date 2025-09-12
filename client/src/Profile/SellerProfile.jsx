import useAxiosSecure from '../Services/useAxiosSecure';
import useAuth from '../AuthProvider/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const SellerProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [sellerData, setSellerData] = useState(null);

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ['dbUser', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/db-user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (dbUser) {
      setSellerData(dbUser);
    }
  }, [dbUser]);

  if (isLoading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (!sellerData) {
    return <p className="text-center mt-10">No seller data found.</p>;
  }

  const { email, name, type } = sellerData; // type = role

  return (
    <div className="flex justify-center items-center mt-10 p-20">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-6 text-center flex flex-col gap-2">
        {/* Profile Image */}
        <div className="flex justify-center -mt-16">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>

        {/* Seller Info */}
        <h2 className="text-xl font-bold mt-4">{name}</h2>
        <p className="text-gray-500 text-sm">{email}</p>

        <span className="mt-3 w-fit mx-auto inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600">
          {type === 'seller' ? 'Seller' : type}
        </span>
 
            <Link  
            className='btn btn-accent'
            to={'/dashboard/seller'} 
            >Dashboard</Link>
       
      </div>
    </div>
  );
};

export default SellerProfile;
