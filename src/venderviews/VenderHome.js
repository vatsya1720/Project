import React,{useState,useEffect} from "react";
import Product from "../productviews/Product"
import ReactDOM from "react-dom/client";
import VenderLogin from "./VenderLogin";
function VenderHome(props)
{
    const[vendname,setVendName]=useState();
    useEffect(()=>{
        var obj=JSON.parse(sessionStorage.getItem('vsessionauth'));
        if(obj!=undefined&&obj!==null)
        {
            // alert(obj.username);
            setVendName(obj.vuserfullname);
        }else{
            alert('Vender Session Expird');
        }
    })
    const handleAddProductButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Product data={props.data.vid}/>)
    }
    const handleLogOut=()=>{
        sessionStorage.removeItem('vsessionauth');
        alert('Vender Session Clossed');
        const root=ReactDOM.createRoot(document.getElementById('root'));
        root.render(<VenderLogin/>);
    }
    return(
        <div>
            <p>Current Session Running For {vendname}</p>
            <h4 style={{backgroundColor:"yellow"}}>Vender Home page</h4>
            <h5>Vender Id{props.data.vid}</h5>

            <h5>Welcome{props.data.vfname}</h5>
            <img src={'http://localhost:9191/vender/getimage/'+props.data.vpicname} height={100} width={100}/>

            <button onClick={handleAddProductButton} className="btn btn-primary">Manage Product</button>

            <button type="submit" onClick={handleLogOut} className="btn btn-secondary">Logout</button>
        </div>
    );
}export default VenderHome;