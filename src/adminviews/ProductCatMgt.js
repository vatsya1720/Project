import React,{ useEffect,useState} from "react";
import axios from "axios";
function ProductCatMgt()
{
    const[pcatgid,setPCatgId]=useState();
    const[pcatgname,setPCatgName]=useState();
    const[pcatgList,setPCatgList]=useState([]);

    const handlePactgIdText=(evt)=>{
        setPCatgId(evt.target.value);
    }
    const handlePCatgNameText=(evt)=>{
        setPCatgName(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:9191/productcatg/showproductcatg").then((res)=>{
            setPCatgList(res.data);
            setPCatgId(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        })
    },[]);
    const handleSaveButton=()=>{
        axios.post("http://localhost:9191/productcatg/addproductcatg/"+pcatgid+"/"+pcatgname).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    const handleShowButton=()=>{
        axios.get('http://localhost:9191/productcatg/showproductcatg').then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    return(
        <div>
            <center>
                <p style={{color:"blue"}}>Product Category</p>

                <table>
                    <tr>
                        <td>Product Id</td>
                        <td>{pcatgid}</td>
                    </tr>
                    <tr>
                        <td>Category Name</td>
                        <td>
                            <input type="test" className="form-control" onChange={handlePCatgNameText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit" onClick={handleSaveButton}>Save</button>
                        </td>
                    </tr>
                </table>
                <p style={{color:"blue",background:"gray"}}>Product Category List</p>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Category Name</th>
                    </tr>
                    {
                        pcatgList.map((item)=>(
                            <tr>
                                <td>{item.pcatgid}</td>
                                <td>{item.pcatgname}</td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default ProductCatMgt;