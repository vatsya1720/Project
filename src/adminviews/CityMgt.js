import React,{use, useEffect,useState} from "react";
import axios from "axios";
import "../index.css";

function CityMgt()
{
    const[ctid,setCtId]=useState();
    const[ctname,setCtName]=useState();
    const[stid,setStId]=useState();
    const[status,setStatus]=useState();
    const[ctlist,setCtList]=useState([]);
    const[stlist,setStList]=useState([]);
    var statename="";

    const handleCtIdText=(evt)=>{
        setCtId(evt.target.value);
    }

    const handleCtNameText=(evt)=>{
        setCtName(evt.target.value);
    }
    const handleStIdSelect=(evt)=>{
        setStId(evt.target.value);
    }
    
    const handleStatusText=(evt)=>{
        setStatus(evt.target.value);
    }
    /* handle page load event or this function will execute automatically at the loading time of component */
    useEffect(()=>{
        axios.get("http://localhost:9191/state/show").then((res)=>{
            setStList(res.data)
            console.log(res.data)
        }).catch((err)=>{
            alert(err);
        });
    },[])
    const handleAddNewButton=()=>{
        axios.get("http://localhost:9191/city/getall").then((res)=>{
            setCtId(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleSaveButton=()=>{
        if(ctid==""||ctid==undefined||ctname==""||ctname==undefined||status==""||stid==undefined
            ||status==""||status==undefined||stid=="0"
        )
        {
            alert("Please Fill all fields");
            return;
        }
        else{

            axios.get("http://localhost:9191/city/searchbyname/"+ctname).then((res)=>{
                if(res.data.ctname!=undefined)
                {
                    alert("City Name already Exist");
                }
                else{
                    var obj={
                        ctid:ctid,
                        ctname:ctname,
                        stid:stid,
                        status:status,                        
                    }
                    axios.post("http://localhost:9191/city/save/",obj).then((res)=>{
                        alert(res.data);
                        setCtId("");
                        setCtName("");
                        setStId("");
                        setStatus("");
                    }).catch((err)=>{
                        alert(err);
                    });
                }
            }).catch((err)=>{
                alert(err);
            });
        }
    }
    const handleShowButton=()=>{
        axios.get("http://localhost:9191/city/getall").then((res)=>{
            setCtList(res.data)
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleSearchButton=()=>{

        if(ctid!=undefined&&ctid!="")
        {
            axios.get("http://localhost:9191/city/search/"+ctid).then((res)=>{
                if(res.data.stid!=undefined)
                {
                    setCtId(res.data.ctid);
                    setCtName(res.data.ctname);
                    setStId(res.data.stid);

                    setStatus(res.data.status);
                }
                else{
                    alert("Data Not Found");
                }
            }).catch((err)=>{
                alert(err);
            });
        }
        if(ctname!=undefined&&ctname!="")
        {
            axios.get("http://localhost:9191/city/searchbyname/"+ctname).then((res)=>{
                if(res.data.stid!=undefined)
                {
                    setCtId(res.data.ctid);
                    setCtName(res.data.ctname);
                    setStId(res.data.stid);
                    setStatus(res.data.status);                    
                }else{
                    alert("Data Not Found")
                }
                
            }).catch((err)=>{
                alert(err);
            })
        }
    }
    const  handleUpdateButton=()=>{
        if(ctid==""||ctid==undefined||ctname==""||ctname==undefined||
            status==""||status==undefined||stid==""||stid==undefined)
            {
                alert("Please Fill all fields");
                return;
            }
            else{
                var obj={
                    ctid:ctid,
                    ctname:ctname,
                    stid:stid,
                    status:status
                }
                axios.put("http://localhost:9191/city/update/",obj).then((res)=>{
                    alert(res.data);
                    setCtId("");
                    setCtName("");
                    setStId("");
                    setStatus("");
                }).catch((err)=>{
                    alert(err);
                });
            }
        }
        const handleDeleteButton=()=>{
            if(ctid!=undefined&&ctid!="")
            {
                axios.delete("http://localhost:9191/city/delete/"+ctid).then((res)=>{
                    alert(res.data);
                }).catch((err)=>{
                    alert(err);
                });
            }
            else{
                alert("Fill State Id to delete")
            }
        }
        return(
            <div>
                <center>
                    <h6>City Management</h6>
                    <div class="myDiv">
                        <center>
                            <table>
                                <tr>
                                    <td>City Id</td>
                                    <td>
                                        <input type="number" onChange={handleCtIdText} value={ctid}
                                        className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>City Name</td>
                                    <td>
                                    <input type="text" onChange={handleCtNameText} value={ctname}
                                        className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>State Name</td>
                                    <td>
                                        <select onClick={handleStIdSelect} id="stdropdown" name="stateddl"
                                        className="form-control">
                                            <option value="0">Select State</option>
                                            {
                                                stlist.map((item)=>(
                                                    <option value={item.stid} key={item.stid}>{item.stname}</option>
                                                ))
                                            }
                                            </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>
                                        <input type="text" onChange={handleStatusText} 
                                        className="form-control" value={status}/>
                                    </td>
                                </tr>
                                <tr>

                                </tr>
                                <tr>

                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td>
                                        <button type="submit" onClick={handleAddNewButton}
                                        className="btn btn-primary">New</button>
                                    </td>
                                    
                                    <td>
                                         <button type="submit" onClick={handleSaveButton}
                                         className="btn btn-success">Save</button>
                                   </td>
                                    <td>
                                        <button type="submit" onClick={handleShowButton} 
                                        className="btn btn-secondary">Show</button>
                                    </td>
                                    <td>
                                        <button type="submit" onClick={handleSearchButton} 
                                        className="btn btn-success">Search</button>
                                    </td>
                                    <td>
                                        <button type="submit" onClick={handleUpdateButton} 
                                        className="btn btn-primary">Update</button>
                                    </td>
                                    <td>
                                        <button type="submit" onClick={handleDeleteButton} 
                                        className="btn btn-danger">Delete</button>
                                    </td>
                                    
                                </tr>
                            </table>
                        </center>
                    </div>
                    <div className="myDiv2">
                        <center>
                            <table>
                                <tr>
                                    <th>City Id</th>
                                    <th>City Name</th>
                                    <th>State Name</th>
                                    <th>Status</th>
                                </tr>
                                {
                                    ctlist.map((item)=>(
                                        <tr>
                                            <td>{item.ctid}</td>
                                            <td>{item.ctname}</td>
                                            <td>
                                                {
                                                    stlist.map((stitem)=>{
                                                        if(item.stid==stitem.stid)
                                                        {
                                                            statename=stitem.stname
                                                        }
                                                    })
                                                }
                                                {statename}
                                            </td>
                                            <td>
                                                {
                                                    item.status==1 ?
                                                    <h5>enabled</h5>:
                                                    <h5>disabled</h5>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </center>
                        </div>
                </center>
            </div>
        );
} export default CityMgt;