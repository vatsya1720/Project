import React,{useState,useEffect} from "react";
import axios from "axios";

function ShowBills()
{
    const[custlist,setCustList] = useState([]);
    const[billdetailslist,setBillDetailsList] = useState([]);
    const[plist,setPList]=useState([]);
    var pname ="";
    var oprice=0;
    var total = 0;
    var picname="";
    const[prevbillid,setprevbillid]=useState(0);
    var prbid=0;
    var k =true;
    // const[count,setCount]=useState(0);
    var count=0;
    useEffect(()=>{
        // get customer form db
        axios.get("http://localhost:9191/customer/getcustomerlist").then((res)=>{
            setCustList(res.data);

        }).catch((err)=>{
            alert(err);
        });
        // get product details from db
        axios.get("http://localhost:9191/product/showproduct").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert(err);
        });

        // get total amount from db
        axios.get("http://localhost:9191/paymentdetails/showpaymentdetails").then((res)=>{
            // setPList(res.data);
        }).catch((err)=>{
            alert(err);
        })



    },[])
    const handleCustomerSelect=(evt)=>{
        // alert(evt.target.value);
        axios.get("http://localhost:9191/bill/billshow/"+evt.target.value).then((res)=>{
            setBillDetailsList(res.data);
            setprevbillid(res.data[0].biilid);
            prbid=res.data[0].biilid;
            // alert(prbid);
            // alert("First Bill Id"+res.data[0].billid+"k="+k);
        }).catch((err)=>{
            alert(err);
        })
    }

    return(
        <div>
            <center>
                <p>Bill List Admin View</p>
                <table>
                    <tr>
                        <td>
                            <select onClick={handleCustomerSelect}>
                                {
                                    custlist.map((item)=>(
                                        <option value={item.Cid}>{item.CustomerName+" "+item.Cid}</option>
                                    
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                </table>
                <table border={1}>
                    <tr>
                        <th>Bill Id</th>
                        <th>Customer Id</th>
                        <th>Bill Date</th>
                        <th>Product Name</th>
                        <th>Product Image</th>
                    </tr>
                    {

                        billdetailslist.map((bitem)=>(

                            <tr style={{backgroundColor:"beige"}}>

                                <td>{bitem.billid}</td>
                                <td>{bitem.cid}</td>
                                <td>{bitem.billdate}</td>
                                {

                                    plist.filter((pitem)=>{

                                       if(bitem.pid==pitem.pid)
                                       {
                                      if(bitem.biilid!=prbid)
                                        {
                                            prbid=bitem.billid;
                                            total=0;
                                            k=true;
                                        }
                                        if(bitem.billid==prbid){
                                            k=false;

                                        }
                                        pname=pitem.pname;
                                        oprice=pitem.oprice;
                                        total=total+parseInt(pitem.oprice);
                                        picname=pitem.ppicname;

                                       }

                                    })
                                }
                                <td>{pname}</td>
                                <td>{oprice}</td>
                                <td>
                                    <img src={"http://localhost:9191/product/getproductimage/"+picname}
                                     height="100" width="100"/>
                                
                                    {/* <p style={{backgroundColor:"green"}}>
                                        {count==0?'':total}
                                    </p> */}

                                    <p style={{backgroundColor:"yellow"}}>
                                        {k==true?'':total}



                                    </p>
                                    {/* k==true <p> Total Amount ={total}:{k=false}</p> */}
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default ShowBills;

// http://localhost:9191/bill/showbillbyid/1001