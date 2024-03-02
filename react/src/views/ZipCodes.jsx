import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";


function ZipCodes() {
    const [ZipCodes,setZipCodes ]=useState([]);
    const [loading,setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(()=>{
        getZips();
    
    },[])  



 
/* 
    const onDeleteClick = (item)=>{
       console.log(item);
       if(!window.confirm('Are you sure you want to delete?')){
        return
      } 
       axiosClient.delete(`/zips/${item.id}`).then(()=>{
       
        
        getZips();
      }) 
    
    } */

    const onDeleteClick =item => {
      if (!window.confirm("Are you sure you want to delete this user?")) {
        return
      }

      try {
         axiosClient.delete(`/zips/${item.id}`)
        .then(() => {
          setNotification('deleted successfully');
        
          getZips();
        })
    }
   catch (error) {
    setLoading(false);

  }
    };



    const getZips = async () => {
        setLoading(true);
      
        try {
          const { data } = await axiosClient.get('/zips');
   
          setLoading(false);
     
          setZipCodes(data.data);
      
        } catch (error) {
          setLoading(false);
      
        
        }
      };

     
      
return (
<>








<div className="col-sm-7">
  <div>{ZipCodes.length}</div>
              <div className="text-sm-end">
                <button type="button" className="btn btn-success rounded-pill mb-2 me-1"  onClick={getZips}   >
                <i className="ri-refresh-line" />
                </button>
                <button type="button" className="btn btn-success mb-2 me-1">
                  <i className="mdi mdi-cog" />
                </button>
                <button type="button" className="btn btn-light mb-2 me-1">
                  Import
                </button>
                <button type="button" className="btn btn-light mb-2">
                  Export
                </button>
              </div>
            </div>
           
            {/* end col*/}
          
          <div className="table-responsive">
          </div>
         <div    style={{overflowX: "auto"}}   >
        <table id="fixed-columns-datatable"   className="table table-hover  font-13 table-centered w-100 nowrap" > 
        <thead   className="table-light"   >
            <tr>
           <th >ID</th>
           <th >Company ID</th>
           <th >request by</th>
           <th >zip_code</th>
           <th >created_at</th>
           <th >updated_at</th>
           <th >Action</th>
     
            </tr>
        </thead>
        {loading &&
            <tbody>
            <tr>
              <td colSpan="13" className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
              </td>
            </tr>
            </tbody>
          }

{!loading &&
        <tbody >
        {ZipCodes.map((item) => {
        
          
    return (

     
      
      
        <tr  role="alert"  key={item.id}   > 
      
           <td>{item.id}</td>
            <td >{item.company_id}</td>
            <td >{item.request_by}</td>
          
            <td >{item.zip_code}</td>
           
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
         
       
            <td className="table-action" >
             
           
            <Link  className="action-icon" /* data-bs-toggle="modal" data-bs-target="#standard-modal" */ to={'/zipcodes/new'} >
                      <i className="mdi mdi-square-edit-outline" />
            </Link>
            <button className="action-icon btn" onClick={() => onDeleteClick(item.id)}><i className="mdi mdi-delete" /></button>
            <button  className="action-icon btn" onClick={ev => onDeleteClick(item)}><i className="mdi mdi-delete" /></button>
            <button className="btn-delete" onClick={ev => onDeleteClick(item)}>Delete</button>

             </td>
               
        </tr>
    )
})}
        </tbody>
}
    </table>


    </div>
 






</>
)
}
 

export default ZipCodes;