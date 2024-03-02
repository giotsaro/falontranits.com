

const Calendar = () => {



    return (
      

    <>
  <div className="row">
  <div className="col-12">
    <div className="card">
      <div className="card-body">





        <div className="row">
          <div className="col-lg-3">
            <div className="d-grid">
              <button
                className="btn btn-lg font-16 btn-danger"
                id="btn-new-event"
              >
                <i className="mdi mdi-plus-circle-outline" /> Create New Event
              </button>
            </div>
            <div id="external-events" className="mt-3">
              <p className="text-muted">
                Drag and drop your event or click in the calendar
              </p>
              <div
                className="external-event bg-success-lighten text-success"
                data-class="bg-success"
              >
                <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle" />
                New Theme Release
              </div>
              <div
                className="external-event bg-info-lighten text-info"
                data-class="bg-info"
              >
                <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle" />
                My Event
              </div>
              <div
                className="external-event bg-warning-lighten text-warning"
                data-class="bg-warning"
              >
                <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle" />
                Meet manager
              </div>
              <div
                className="external-event bg-danger-lighten text-danger"
                data-class="bg-danger"
              >
                <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle" />
                Create New theme
              </div>
            </div>
            <div className="mt-5 d-none d-xl-block">
              <h5 className="text-center">How It Works ?</h5>
              <ul className="ps-3">
                <li className="text-muted mb-3">
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                </li>
                <li className="text-muted mb-3">
                  Richard McClintock, a Latin professor at Hampden-Sydney
                  College in Virginia, looked up one of the more obscure Latin
                  words, consectetur, from a Lorem Ipsum passage.
                </li>
                <li className="text-muted mb-3">
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                </li>
              </ul>
            </div>
          </div>{" "}
          {/* end col*/}
          <div className="col-lg-9">
            <div className="mt-4 mt-lg-0">



              <div id="calendar" >

                
              </div>



            </div>
          </div>{" "}
          {/* end col */}
        </div>{" "}
        {/* end row */}







        
      </div>{" "}
      {/* end card body*/}
    </div>{" "}
    {/* end card */}
  </div>
</div>


    </>

    )
  }
  
  export default Calendar