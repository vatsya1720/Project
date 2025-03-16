import React,{useEffect,useState} from "react";
import axios from "axios";
import VenderLogin from "./VenderLogin";
import ReactDOM from "react-dom/client";


function VenderReg() {
    const[vuserid,setVUserId]=useState();
    const[vuserpass,setVUserPass]=useState();
    const[vendername,setVenderName]=useState();
    const[vaddress,setVAddress]=useState();
    const[vcontact,setVContact]=useState();
    const[vemail,setVEmail]=useState();
    const[vpicname,setVPicName]=useState();
    const[vid,setVId]=useState();
    const[image,setImage]=useState({preview:'',data:''});   
    const[status,setStatus]=useState('');

    const handleVUserId=(evt)=>{
        setVUserId(evt.target.value);
    }
    const handleVUserPassText=(evt)=>{
        setVUserPass(evt.target.value);
    }
    const handleVendorNameText=(evt)=>{
        setVenderName(evt.target.value);
    }
    const handleVAddressText=(evt)=>{
        setVAddress(evt.target.value);
    } 
    const handleVContactText=(evt)=>{
        setVContact(evt.target.value);
    }
    const handleVEmailText=(evt)=>{
        setVEmail(evt.target.value);
    }
    const handleVIdText=(evt)=>{
        setVId(evt.target.value);
        
    }
    useEffect(()=>{
        axios.get("http://localhost:9191/vender/getvendercount/").then((res)=>{
            setVId(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        
        })
    });
    const handleRegisterButton=()=>{
        var obj={
            VUserId:vuserid,
            VUserPass:vuserpass,
            VenderName:vendername,
            VAddress:vaddress,
            VContact:vcontact,
            VEmail:vemail,
            VPicName:vpicname,
            Vid:vid,
            Status:"Inactive"
        }
        axios.post("http://localhost:9191/vender/register/",obj).then((res)=>{
            console.log(res.data)
            alert(res.data);
           
        }).catch((err)=>{
            alert(err);
        });
    }
    //browse and save image code
    const handleSubmit=async(evt)=>{
        evt.preventDefault()
        let formData=new FormData()
        formData.append('file',image.data);
        const response=await fetch("http://localhost:9191/vender/savevenderimage",{
            method: 'POST',
            body: formData,
        })
        if(response){
            if(response.statusText=="ok")
            {
                setStatus("File Uploaded Successfully");
            }else
            {
                setStatus("Faild To Upload File")
            }
        }
    }
    const handleFileChange=(evt)=>{
        const img={
            preview:URL.createObjectURL(evt.target.files[0]),
            data:evt.target.files[0]
        }
        setImage(img)
        setVPicName(evt.target.files[0].name);
    }
    const handleLogin=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        root.render(<VenderLogin/>)
    }

    return(
        <div>
            <center>
                <p style={{color:"blue"}}>Vendor Registration Form</p>

                <div className="jumbotron" style={{marginLeft:20,marginRight:20,borderRadius:5}}>
                    <table>
                        <tr>
                            <td>Vendor ID</td>
                            <td>{vid}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>
                                <input type="text" onChange={handleVUserId} className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input type="password" onChange={handleVUserPassText} className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Vendor Name</td>
                            <td>
                                <input type="text" onChange={handleVendorNameText} className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>
                                <input type="text" onChange={handleVAddressText} className="from-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Contact No</td>
                            <td>
                                <input type="number" maxLength={10} onChange={handleVContactText} className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input type="email" onChange={handleVEmailText} className="from-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Select Photo</td>
                            <td>
                                <input type="file" onChange={handleFileChange} name="file"/>
                                <img src={image.preview} width="100" height='100'/>
                            </td>
                        </tr>
                        <tr>
                            <td>Cilck To Upload Vender Photo</td>
                            <td>
                                <button type="submit" onClick={handleSubmit} className="btn btn-danger">Upload</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleRegisterButton} className="btn btn-primary">Register</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleLogin} className="btn btn-success">Login</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    );
}export default VenderReg;