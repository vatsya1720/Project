import React,{useEffect,useState} from "react";
import axios from "axios";
 import CustomerHome from "./CustomerHome";
import ReactDOM from "react-dom/client"
import Cookies from "js-cookie";

function CustomerLogin()
{
    const [uid,setUId]=useState();
    const [upass,setUPass]=useState();
    const [ischecked,setIsChecked] =useState(false);

    const handleUIdText=(evt)=>{
        setUId(evt.target.value);
    }
    const handleUPassText=(evt)=>{
        setUPass(evt.target.value);
    }
    useEffect(()=>{
        var myccookie=Cookies.get('auth');
        if(myccookie!=undefined)
        {
            var obj=JSON.parse(myccookie);
            // alert(obj.username);
            setUId(obj.username);
            setUPass(obj.password);
        }
    },[]);
    const handleLoginButton=()=>{
        var obj={
            CUserId:uid,
            CUserPass:upass
        }
        axios.post("http://localhost:9191/customer/login",obj).then((res)=>{
            if(res.data.CUserId!=undefined){
                if(res.data.Status=="Inactive")
                {
                    alert("User Not Active Please Wait For Admin Activation Process");
                  return;
                }
        
            // cookies handling code
            if(ischecked==true)
            {
                const userData={
                    username:uid,
                    password:upass
                };
                const expirationTime = new Date(new Date().getTime()
                +6000000);
                // store data in cookies
                Cookies.set('auth',JSON.stringify(userData),{
                    expires: expirationTime});
            }
            // session handling code
            const userSessionData= {
                userfullname:res.data.CustomerName
            };
            const sessionexpirationTime = new Date(new Date().getTime()+60000);
            // store  data in session 
            sessionStorage.setItem('sessionauth',JSON.stringify
                (userSessionData),sessionexpirationTime);

            const root =ReactDOM.createRoot(document.getElementById("root"))
            var  obj = {cfname:res.data.CustomerName,
                cpicname:res.data.CPicName,
            cid:res.data.Cid}
            alert("login customer id="+obj.cid)
            root.render(<CustomerHome data={obj}></CustomerHome>)
        }
        else{
            alert("Invalid Id/Password");
        }
    });
   }
   const handleIsRemeber=()=>{
    setIsChecked(true);
   }


   return(
    <div>
        <center>
            <h4 style={{backgroundColor:"yellow"}}>Customer Login Form</h4>
            <table>
                <tr>
                    <td>User Id</td>
                    <td>
                        <input type="text" className="form-control" onChange={handleUIdText} value={uid}/>
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        <input type="password" className="form-control" onChange={handleUPassText} value={upass}/>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button type="submit" onClick={handleLoginButton} className="btn btn-success">Login</button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="checkbox" onClick={handleIsRemeber}/><span>Remember Me</span>
                    </td>
                </tr>
            </table>
        </center>
    </div>
   );

}export default CustomerLogin;

