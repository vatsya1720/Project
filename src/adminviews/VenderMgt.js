import React,{useState,useEffect} from "react";
import axios from "axios";
function VenderMgt()
{
    const[venderlist,setvenderList]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:9191/vender/getvendercount").then((res)=>{
            setvenderList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[]);

    const handleActiveButton=(vid)=>{
        var newstatus="Active";
        axios.put("http://localhost:9191/vender/vendermanage/"+vid+"/"+newstatus).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
        }
        const handleInactiveButton=(vid)=>{
            var newstatus ="Inactive";
            axios.put("http://localhost:9191/vender/vendermanage/"+vid+"/"+newstatus).then((res)=>{
                alert(res.data);
            }).catch((err)=>{
                alert(err);
            })
        }

        return(
            <div>
                <center>
                    <h4>Vender List</h4>
                    <table border={1}>
                        <tr>
                            <th>VId</th>
                            <th>ender Name</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {
                            venderlist.map((item)=>(
                                    <tr>
                                        <td>{item.Vid}</td>
                                        <td>{item.VenderName}</td>
                                        <td>{item.Status}</td>
                                        <td>
                                            <button type="submit" onClick={()=>handleActiveButton(item.Vid)}>Active</button>
                                        </td>
                                        <td>
                                        <button type="submit" onClick={()=>handleInactiveButton(item.Vid)}>Inactive</button>
                                        </td>

                                    </tr>
                            ))
                        }
                    </table>
                </center>
            </div>
        );
    
    }export default VenderMgt;