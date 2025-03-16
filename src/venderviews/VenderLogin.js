import React, { useState, useEffect } from "react";
import axios from "axios";
import VenderHome from "./VenderHome";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import VenderReg from "./VenderReg";

function VenderLogin() {
    const [uid, setUId] = useState();
    const [upass, setUPass] = useState();
    const [ischecked, setIsChecked] = useState(false);

    const handleUIdText = (evt) => {
        setUId(evt.target.value);
    }

    const handleUPass = (evt) => {
        setUPass(evt.target.value);
    }

    useEffect(() => {
        var myccokies = Cookies.get('vauth');
        if (myccokies !== undefined) {
            var obj = JSON.parse(myccokies);
            setUId(obj.username);
            setUPass(obj.password);
        }
    }, []);

    const handleLoginButton = () => {
        var obj = {
            vuid: uid,
            vupass: upass
        };
        // alert("Vender id"+obj.vuid+"pass="+obj.vupass)
        axios.post("http://localhost:9191/vender/Login", obj).then((res) => {
            if (res.data.VUserId !== undefined) 
                {
                if (res.data.Status == "Inactive") 
                    {
                    alert("User Not Active. Please Wait For Admin Activation Process");
                    return;
                }
                // cookies handling code
                if (ischecked == true)
                     {
                    const userData = {
                        username: uid,
                        password: upass
                    };
                    const expirationTime = new Date(new Date().getTime() + 6000000);
                    // store data in cookies
                    Cookies.set('vauth', JSON.stringify(userData), { expires: expirationTime });
                }
                // session handling code
                const userSessionData = {
                    vuserfullname: res.data.VenderName
                };
                const sessionexpirationTime = new Date(new Date().getTime() + 60000);
                // store data in session
                sessionStorage.setItem('vsessionauth', JSON.stringify(userSessionData),
                sessionexpirationTime);


                const root = ReactDOM.createRoot(document.getElementById("root"));
                var obj = {
                    vfname: res.data.VenderName,
                    vpicname: res.data.VPicName,
                    vid: res.data.Vid
                };
                alert("Vender Id: " + obj.vid);
                root.render(<VenderHome data={obj}></VenderHome>);
            } else {
                alert("Invalid Id/Password");
            }
        });
    }
    const handleIsRemember=()=>{
        setIsChecked(true);
    }
    const handleRegister=()=>{
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<VenderReg/>)
    }
    return(
        <div>
            <center>
                <h4 style={{backgroundColor:"yellow"}}>Vender Login Form</h4>
                <div className="jumborton" style={{marginLeft:20,marginRight:20,borderRadius:5}}>
                    <table>
                        <tr>
                            <td>User Id</td>
                            <td>
                                <input type="text" className="form-control" onChange={handleUIdText}
                                value={uid} style={{marginTop:5}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input type="password" className="form-control" onChange={handleUPass}
                                value={upass} style={{marginTop:5}}/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input type="checkbox" onChange={handleIsRemember}/>
                                <span>Remember Me</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" className="btn btn-success"
                                onClick={handleLoginButton} style={{marginTop:5,marginLeft:30}}>Login</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    );
}
export default VenderLogin;
