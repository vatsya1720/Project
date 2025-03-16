import React from "react";
// import custpic from "../cust.jpg";
import { Link,Outlet } from "react-router-dom";
import "../index.css";
function CustomerMain()
{
    return(
        <div>
            <center>
                {/* <img src={custpic} height={200} width={800}/> */}
                <nav>

                    <ul>
                        <li>
                            <Link to="/customermain/customerlogin">Login</Link>
                            
                        </li>
                        <li>
                                <Link to="/customermain/customerreg">Registration</Link>
                            </li>
                    </ul>
                    <Outlet/>
                </nav>
            </center>
        </div>
    );
}export default CustomerMain;