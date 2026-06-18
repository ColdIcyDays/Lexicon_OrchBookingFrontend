import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {TopBar} from "./components/topbar/TopBar.tsx";
import {Footer} from "./components/footer/Footer.tsx";
import {HomeContainer} from "./components/home/HomeContainer.tsx";
import {TicketsContainer} from "./components/tickets/TicketsContainer.tsx";
import {AboutUsContainer} from "./components/aboutus/AboutUsContainer.tsx";
import {BlogContainer} from "./components/blog/BlogContainer.tsx";
import {PurchaseContainer} from "./components/tickets/purchase/PurchaseContainer.tsx";
import {LoginContainer} from "./components/login/LoginContainer.tsx";
import {ProfileContainer} from "./components/profile/ProfileContainer.tsx";
function App() {
  return (
    <BrowserRouter>
      <div className={"flex flex-col min-h-lvh min-w-lvw max-h-max bg-white"}>
          <TopBar/>
          <Routes>
              {/*<Route path={"*"} element={<Navigate to={"/Home"}/>}/>*/}
              <Route path={"/"} element={<Navigate to={"/Home"}/>}/>
              <Route path={"/Home"} element={<HomeContainer/>}/>

              <Route path={"/Blog"} element={<BlogContainer/>}>
                  <Route path={":article"} element={null}/>
              </Route>

              <Route path={"/User"} element={<ProfileContainer/>}/>
              <Route path={"/User/Login"} element={<LoginContainer/>}/>
              <Route path={"/User/Register"} element={<LoginContainer/>}/>

              <Route path={"/Tickets&Shows"} element={<TicketsContainer/>}/>
              <Route path={"/Tickets&Shows/PurchaseTicket"} element={<PurchaseContainer/>}/>

              <Route path={"/Aboutus"} element={<AboutUsContainer/>}/>
          </Routes>
          <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
