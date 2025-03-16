import React,{useEffect,useState} from "react";
import axios from "axios";

function CustomerReg()
{
    const[cuserid,setCUserId]=useState();
    const[cuserpass,setCUserPass]=useState();
    const[customername,setCustomerName]=useState();
    const[stid,setStId]=useState();
    const[ctid,setCtId]=useState();
    const[caddress,setCAddress]=useState();
    const[ccontact,setCContact]=useState();
    const[cemail,setCEmail]=useState();
    const[cpicname,setCPicName]=useState();
    const[cid,setCId]=useState()
    const[image,setImage]=useState({preview:'',data:''});
    const[status,setStatus]=useState('')
    const[stlist,setStList]=useState([]);
    const[ctlist,setCtList]=useState([]);

    const handleCUserIdText=(evt)=>{
        setCUserId(evt.target.value);
    }
    const handleCUserPass=(evt)=>{
        setCUserPass(evt.target.value);
    }
    const handleCustomerNameText=(evt)=>{
        setCustomerName(evt.target.value);
    }
    const handleStIdSelect=(evt)=>{
        setStId(evt.target.value);
        axios.get("http://localhost:9191/city/showcitybystate/"+evt.target.value).then((res)=>{
            setCtList(res.data);
        }).catch(err=>{
            alert(err);
        })
    }
    const handleCtIdSelect=(evt)=>{
        setCtId(evt.target.value);
    }
    const handleCAddressText=(evt)=>{
        setCAddress(evt.target.value);
    }
    const handleCContactText=(evt)=>{
        setCContact(evt.target.value);
    }
    const handleCEmailText=(evt)=>{
        setCEmail(evt.target.value);
    }
    const handleCidText=(evt)=>{
        setCId(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:9191/customer/getcustomercount/").then((res)=>{
            setCId(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        });
        axios.get("http://localhost:9191/state/show/").then((res)=>{
            setStList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);

    const handleRegisterButton=async()=>{
        var obj={
            CUserId:cuserid,
            CUserPass:cuserpass,
            CustomerName:customername,
            StId:stid,
            CtId:ctid,
            CAddress:caddress,
            CContact:ccontact,
            CEmail:cemail,
            CPicName:cpicname,
            Cid:cid,
            Status:"Inactive"
        }
        let formData = new FormData()
        formData.append('file',image.data);
        const response = await fetch('http://localhost:9191/customer/savecustomerimage',{
            method:'POST',
            body: formData,
        })
        if(response)
        {
            if(response.statusText=="ok")
            {
                setStId("File to Uploaded Successfully");
            }
            else{
                setStatus("Failed to Upload File")
            }
        }
        axios.post("http://localhost:9191/customer/register/",obj).then((res)=>{
            alert(res.data);
            if(res.data=="Registration Successfull")
            {
                alert("done")
                axios.post("http://localhost:9191/email/sendemails/"+cemail).then((res)=>{
                    alert(res.data);
                }).catch((err)=>{
                    alert(err);
                })
            }
        }).catch((err)=>{
            alert(err);
        });
    }

    // browse and save image code
    const handleSubmit = async(evt)=>{
        evt.preventDefault()
        let formData =new FormData()
        formData.append('file',image.data);
        const response = await fetch('http://localhost:9191/customer/savecustomerimage',{
            method:'POST',
            body:formData,
        })
        if(response){
            if(response.statusText=="ok")
            {
                setStatus("File Uploaded Successfully");
            }
            else{
                setStatus("Failed to Uploaded");
            }
        }
    }
    const handleFileChange=(evt)=>{
        const img ={
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        }
        setImage(img)
        setCPicName(evt.target.files[0].name);
    }

    return(
        <div>
            <center>
                <p style={{color:"blue"}}>Customer Registration Form</p>
                <table>
                    <tr>
                        <td>Customer Id</td>
                        <td>{cid}</td>
                    </tr>
                    <tr>
                        <td>User Id</td>
                        <td>
                            <input type="text" onChange={handleCUserIdText} className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" onChange={handleCUserPass} className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <td>
                            <input type="text" onChange={handleCustomerNameText} className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>
                            <select onClick={handleStIdSelect} >
                            <option value="0">Select State</option>
                                {
                                    stlist.map((items)=>(
                                        <option value={items.stid}  >{items.stname} </option>
                                    ))
                                }
                         </select>
                        </td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>
                        <select onClick={handleCtIdSelect} >
                        <option value="0">Select City</option>
                                {
                                    ctlist.map((items)=>(
                                        <option value={items.ctid}>{items.ctname}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" onChange={handleCAddressText} className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td >
                            <input type="number" onChange={handleCContactText} maxLength={10} minLength={10} 
                            className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="email" onChange={handleCEmailText} className="form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Select Photo</td>
                        <td>
                            <input type="file" onChange={handleFileChange} name="file"/>
                            <img src={image.preview} width='100' height='100'/>
                        </td>
                    </tr>
                    <tr>
                        <td>Click to Upload Customer Photo</td>
                        <td>
                            <button type="submit" onClick={handleSubmit} className="btn btn-danger">Upload</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" onClick={handleRegisterButton} className="btn btn-primary">Register</button>
                        </td>
                    </tr>
                </table>
            </center>
        </div>
    )
}export default CustomerReg;
