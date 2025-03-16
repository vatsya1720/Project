import React from "react";
import{
    BrowserRouter as Router,
    Link,
    Routes,
    Route,

} from "react-router-dom";

import CustomerMain from "./customerviews/CustomerMain";
import VenderMain from "./venderviews/VenderMain";
import AdminMain from "./adminviews/AdminMain";
import AdminLogin from "./adminviews/AdminLogin";
import AdminReg from "./adminviews/AdminReg";
// import mainpic from "./mainpic.jpg"
import CustomerLogin from "./customerviews/CustomerLogin";
import CustomerReg from "./customerviews/CustomerReg";
import VenderLogin from "./venderviews/VenderLogin";
import VenderReg from "./venderviews/VenderReg";
import "./index.css";
import AdminHome from "./adminviews/AdminHome";


function MainPage()
{
    return(
        <div className="App">
            <center>
            {/* <img src={mainpic} height={300} width={1230}/> */}
            <Router>
                <nav>
                    <Link to="adminmain">Admin</Link><span></span>
                    <Link to="customermain">Customer</Link><span></span>
                    <Link to="vendermain">Vender</Link><span></span>
                </nav>
                <Routes>
                    <Route path="/adminmain" element={<AdminMain/>}>
                    <Route path="adminlogin" element={<AdminLogin/>}/>
                    <Route path="adminhome" element={<AdminHome/>}/>
                    <Route path="adminreg" element={<AdminReg/>}/>
                    </Route>
               
                <Route path="/customermain" element={<CustomerMain/>}>
                <Route path="customerlogin" element={<CustomerLogin/>}/>
                <Route path="customerreg" element={<CustomerReg/>}/>
                </Route>
                <Route path="/vendermain" element={<VenderMain/>}>
                <Route path="venderlogin" element={<VenderLogin/>}/>
                <Route path="venderreg" element={<VenderReg/>}/>
                </Route>
                </Routes>
            </Router>
            </center>
        </div>
    );
}export default MainPage;