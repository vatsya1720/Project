import React,{useState,useEffect} from "react";
import axios from "axios";

function CustomerMgt()
{
    const[customerlist,setCustomerList]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:9191/customer/getcustomercount").then((res)=>{
            setCustomerList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[]);

    const handleActiveButton=(cid)=>{
        var email="";
        axios.get("http://localhost:9191/customer/getcustomerdetails/"+cid).then((res)=>{

            email=res.data.CEmail;
            alert("Customer email="+email);

            
        var newstatus="Active";
        axios.put("http://localhost:9191/customer/customermanage/"+cid+"/"+newstatus).then((res)=>{
            alert(res.data);
            var mailto=email;
            var subject="Login Activation";
            var message="Your Id Is Successfully Activated By Admin Now You Can Login"

            axios.post("http://localhost:9191/emailactivation/sendemails/"+mailto+"/"+subject+"/"+message).then((res)=>{
                alert(res.data);
            }).catch((err)=>{
                alert(err);
            })
        }) .catch((err)=>{
            alert(err);
        })   
        }).catch((err)=>{
            alert(err);
        })
    }
    const handleInactiveButton=(cid)=>{
        var email="";
        axios.get("http://localhost:9191/customer/getcustomerdetails/"+cid).then((res)=>{
            // alert(res.data);
            email=res.data.CEmail;
            alert("customer email="+email);

            var newstatus="Inactive";
            axios.put("http://localhost:9191/customer/customermanage/"+cid+"/"+newstatus).then
            ((res)=>{
                alert(res.data);
                var mailto=email;
                var subject="Login Deactivation";
                var message="Your Id is Successfully Inactivated By Admin You Can Not Login"
                axios.post("http://localhost:9191/emailactivation/sendemails/"+mailto+"/"+
                    subject+"/"+message).then((res)=>{
                        alert(res.data);
                    }).catch((err)=>{
                        alert(err);
                    })

              }).catch((err)=>{
                alert(err);
              })
            }).catch((err)=>{
                alert(err);
            })
        }
        return(
            <div>
                <center>
                    <h4>Customer List</h4>
                    <table border={1}>
                        <tr>
                            <th>Customer Id</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>

                        </tr>
                        {
                            customerlist.map((item)=>(
                                <tr>
                                    <td>{item.Cid}</td>
                                    <td>{item.CustomerName}</td>
                                    <td>{item.Status}</td>
                                    <td>
                                        <button type="submit"onClick={()=>handleActiveButton(item.Cid)}>Active</button>

                                    </td>
                                    <td>
                                        <button type="submit"onClick={()=>handleInactiveButton(item.Cid)}>Inactive</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </center>
            </div>
        );
    }export default CustomerMgt;