import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Routess from "./router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DefaultLayout from "./components/DefaultLayout";







function App() {
  return (
  <>

   <BrowserRouter>
          <DefaultLayout>
            <Routes>
             { Routess.map((route,index) =>
              <Route 
               key={'routes-path-${index}'}
               path={route.path}
               element={route.element}
              />
             ) }
            </Routes>
          </DefaultLayout>
   </BrowserRouter>
  </>
  )
}

export default App
