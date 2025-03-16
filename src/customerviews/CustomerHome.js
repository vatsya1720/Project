import React,{useEffect,useState} from "react";
import ProductList from  "../productviews/ProductList"
import ReactDOM from "react-dom/client";
import CustomerLogin from "./CustomerLogin";
import BillById from "./BillByIdd";

function CustomerHome(props){
    const[custname,setCustName]=useState();
    const[isshowplist,setIsShowPList]=useState(false);
    const[isshowbill,setIsShowBill]=useState(false);

    useEffect(()=>{
        var obj =JSON.parse(sessionStorage.getItem('sessionauth'));
        if(obj!=undefined&&obj!=null)
        {
            // alert(obj.username);
            setCustName(obj.userfullname);
        }else{
            alert('session expired')
        }
    })
    const handleShoppingButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        alert("cid="+props.data.cid);
        var cid=props.data.cid;
       root.render(<ProductList data={cid}></ProductList>)
    }
    const handleShowBills=()=>{        
        const root = ReactDOM.createRoot(document.getElementById("root"));
        var cid=props.data.cid;
       root.render(<BillById data={cid}></BillById>)
    }
    const handleLogOut=()=>{
        sessionStorage.removeItem('sessionauth');
        alert("Customer Session Closed")
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<CustomerLogin/>);
    }
    function togleShoping(){
        // alert("button clicked");
        setIsShowPList((isshowplist)=>!isshowplist);
    }
    function togleBill(){
        setIsShowBill((isshowbill)=>!isshowbill);
    }


    return(
        <div>
            <p>Current Session Running For{custname}</p>
            customer Id{props.data.cid}
            <h4 style={{backgroundColor:"yellow"}}>Customer Page</h4>
            <h5>Welcome {props.data.cfname}</h5>
            <img src={"http://localhost:9191/customer/getimage/"+props.data.cpicname} height={100} width={100}
            style={ {borderRadius:50}}/>
            <button type="submit" onClick={togleShoping} className="btn btn-success" style={{marginLeft:20}}
            > Shoping  </button>
            <button type="submit" onClick={togleBill} className="btn btn-primary" style={{marginLeft:20}}
            > Show Bills</button>
            <button type="submit" onClick={handleLogOut} className="btn btn-secondary" style={{marginLeft:20}}
            > Logout   </button>
         {/* bellow code to show hide product list component */}
         {  isshowplist &&
           <ProductList data={props.data.cid}/> 
         }
            {/* bellow code to show hide bill component */}

             {
             isshowbill && 
             <BillById data ={props.data.cid}/>  
             }

            <h4 style={{backgroundColor:"yellow" ,fontSize:10}}>
                <marquee>ww.sabkuchmiltahai.com</marquee>
            </h4>
        </div>
    );
}export default CustomerHome;