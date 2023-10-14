import React from "react";
// import Style from './Layout.module.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet></Outlet>
      </div>
      <div>
        <Offline>
        <div className="network rounded-5 bg-danger-subtle">
            <i className=" fas fa-wifi me-3"></i><span>you are offline</span>
          </div>
        </Offline>
      </div>

      <Footer />
    </>
  );
}
