import React,{useEffect,useState} from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import Bill from"../customerviews/Bill";

function ProductList(props){
    const[itemcount, setItemCount]=useState(0);
    const[selitems,setselItems]=useState([]);
    const[pcatglist,setPCatgList]=useState([]);
    const[plist,setPList]=useState([]);
    const[vlist,setVList]=useState([]);
    var cname="";

    useEffect(()=>{
        axios.get("http://localhost:9191/product/showproduct").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert(err);
        });
        axios.get("http://localhost:9191/productcatg/showproductcatg").then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert(err);
        });
        // get vender
        axios.get("http://localhost:9191/vender/getvendercount").then((res)=>{
            setVList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);
    const handleActiveButton=(evt)=>{
        var pid=parseInt(evt);
        var status="Active";
        axios.put("http://localhost:9191/product/updateproductstatus/"+pid+"/"+status).then((res)=>{
            alert("Product Status Updated");
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleInactiveButton=(evt)=>{
        var pid=parseInt(evt);
        var status="Inactive";
        axios.put("http://localhost:9191/product/updateproductstatus/"+pid+"/"+status).then((res)=>{
            alert("Product Status Updated");
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleCheckOutButton=()=>{
        alert("HEllo");
        if(selitems.length<=0)
        {
            alert("pLease Buy Some Product");
        }else{
            const root=ReactDOM.createRoot(document.getElementById("root"));
            var ccid=props.data;
            var obj={
                selitems:selitems,
                cid:ccid
            };
            root.render(<Bill data={obj}></Bill>)
        }
    }
    const handleSearch=(evt)=>{
        if(evt.target.value>0)
        {
            axios.get("http://localhost:9191/product/showproductbycatgid/"+evt.target.value).then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }else{
            axios.get("http://localhost:9191/product/showproduct").then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }

    }
    const handleSearchByVender=(evt)=>{
        if(evt.target.value>0)
        {
            axios.get("http://localhost:9191/product/showproductbyvender/"+evt.target.value).then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            })
        }
        else{
            axios.get("http://localhost:9191/product/showproduct").then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }
    }
    return(
        <div>
            <center>
                Search BY Category<select onClick={handleSearch}>
                    <option value="0">All</option>
                    {
                        pcatglist.map((pcatgitem)=>(
                            <option value={pcatgitem.pcatgid}>{pcatgitem.pcatgname}</option>
                        ))
                    }
                </select>
                <p>
                    Search By Vender<select onClick={handleSearchByVender}>
                        <option value="0">All</option>
                        {
                            vlist.map((vitem)=>(
                                <option value={vitem.Vid}>{vitem.VenderName}</option>
                            ))
                        }
                    </select>
                </p>
                <p style={{backgroundColor:"green" ,color:"white"}}>Product List</p>
                <table border={1}>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th> Price</th>
                        <th>Offer Price</th>
                        <th> Category Name</th>
                        <th>Photo</th>
                        <th>Status</th>
                        <th>Active</th>
                    </tr>
                    {
                        plist.map((item)=>(
                            <tr>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.pprice}</td>
                                <td>{item.oprice}</td>
                                <td>
                                    {
                                        pcatglist.map((citem)=>{
                                            if(item.pcatgid==citem.pcatgid)
                                            {
                                                cname=(citem.pcatgname)
                                            }
                                        })
                                    }
                                    {cname}
                                </td>
                                <td>
                                    <img src={"http://localhost:9191/product/getproductimage/"+item.ppicname}height="100"width="100"/>
                                </td>
                                <td>{item.status}</td>
                                <td>
                                    <button type="submit" onClick={()=>handleActiveButton(item.pid)}>Active</button><span></span><button type="submit"onClick={()=>handleInactiveButton(item.pid)}>Inactive</button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default ProductList;