import React from "react";
import { Link,Outlet } from "react-router-dom";
// import venderpic from "../vender.jpg"
import "../index.css";

function VenderMain()
{
    return(
        <div>
            <center>
                {/* <img src={venderpic} height={200} width={800}/> */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/vendermain/venderlogin">Login</Link>
                        </li>
                        <li>
                            <Link to="/vendermain/venderreg">Registration</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </nav>
            </center>
        </div>
    );
}export default VenderMain;