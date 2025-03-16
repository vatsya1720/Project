import React,{useState} from "react";
import { Link, Outlet } from "react-router-dom";
import ReactDOM from "react-dom/client";
import AdminHome from "./AdminHome";


function AdminLogin()
{
    const[uid,setUId]=useState();
    const[upass,setUPass] = useState();

    const handleUIdText = (evt)=>{
        setUId(evt.target.value);
    }
    const handleUPassText =(evt)=>{
        setUPass(evt.target.value);
    }
    const handleLoginButton =(evt)=>{
        if(uid=="admin"&& upass=="abc@123")
        {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<AdminHome/>)
        }else{
            alert("Invalid Id/Password");
        }
    }
    return(
        <div>
            <center>
                <h4 style={{backgroundColor:"yellow"}}>Adminstrator Login</h4>
                <table>
                    <tr>
                        <td>User Id</td>
                        <td>
                            <input type="text" className="form-control" onChange={handleUIdText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" className="form-control" onChange={handleUPassText}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> 
                            <button type="submit" className="btn btn-success" onClick={handleLoginButton}>Login</button>
                        </td>
                    </tr>
                </table>
            </center>
        </div>
    );
}
export default AdminLogin;