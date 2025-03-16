import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
// import adminpic from "../admin1.jpg"
import "../index.css";
// import AdminLogin from "./AdminLogin";
function AdminMain()
{
    return(
        <div>
            <center>
                {/* <img src={adminpic} height={200} width={1000}/> */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/adminmain/adminlogin">Login</Link>
                        </li>
                        <li>
                            <Link to="/adminmain/adminreg">Registration</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </nav>
                <Routes>
                    {/* <Route path="/adminlogin" element={<AdminLogin></AdminLogin>}/> */}
                </Routes>
            </center>
        </div>
    );
}export default AdminMain;