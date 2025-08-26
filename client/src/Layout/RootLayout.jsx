import React from "react";
import Navbar from "../Component/Navbar";
import { Outlet } from "react-router";
import Footer from "../Component/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen" >
      {/* navbar here */}
      <Navbar></Navbar>

      {/* dynamic route */}
      <main className="flex-1" > 
        <div className="max-w-5xl mx-auto" >
          <Outlet></Outlet>
        </div>
      </main>

      {/* footer here */}
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
