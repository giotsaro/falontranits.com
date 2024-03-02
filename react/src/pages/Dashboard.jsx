
import DriversTable from "../components/DriversTable copy"
import TestTable from "../components/TestTable"
import Example from "../components/TestTable"

const Dashboard2 = () => {
    return (

    
   
   
   <>
  <div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <h4 className="header-title">Scroll - Horizontal</h4>
          <p className="text-muted font-14">
            DataTables has the ability to show tables with horizontal scrolling,
            
          </p>
          <hr />
          <div className="tab-content">
            
            
          {/* <TestTable /> */}
          <DriversTable />




          </div>
       {/* end tab-content*/} 
        </div>
       {/* end card body*/}
      </div>
     {/* end card */}
    </div>
     {/* end col*/}
  </div>
   {/* end row*/}
</>

   
   
   
   

     
    )
  }
  
  export default Dashboard2