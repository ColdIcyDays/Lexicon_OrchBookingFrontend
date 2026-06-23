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
import {AccountInfo} from "./components/profile/AccountInfo.tsx";
import {PurchasedTickets} from "./components/profile/PurchasedTickets.tsx";
import {LogOutPage} from "./components/profile/LogOutPage.tsx";
import {ManageBlogs} from "./components/profile/manage/blog/ManageBlogs.tsx";
import {AddBlog} from "./components/profile/manage/blog/AddBlog.tsx";
import {ManageVenues} from "./components/profile/manage/venue/ManageVenues.tsx";
import {AddVenue} from "./components/profile/manage/venue/AddVenue.tsx";
import {ManagePrograms} from "./components/profile/manage/program/ManagePrograms.tsx";
import {AddProgram} from "./components/profile/manage/program/AddProgram.tsx";
import {ManageShows} from "./components/profile/manage/show/ManageShows.tsx";
import {AddShow} from "./components/profile/manage/show/AddShow.tsx";
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

              <Route path={"/User"} element={<ProfileContainer/>}>
                  <Route path={"/User/AccountInfo"} element={<AccountInfo/>}/>
                  <Route path={"/User/PurchasedTickets"} element={<PurchasedTickets/>}/>
                  <Route path={"/User/ManageBlogs"} element={<ManageBlogs/>}/>
                  <Route path={"/User/ManageBlogs/AddBlog"} element={<AddBlog/>}/>
                  <Route path={"/User/ManageVenues"} element={<ManageVenues/>}/>
                  <Route path={"/User/ManageVenues/AddVenue"} element={<AddVenue/>}/>
                  <Route path={"/User/ManagePrograms/"} element={<ManagePrograms/>}/>
                  <Route path={"/User/ManagePrograms/AddProgram"} element={<AddProgram/>}/>
                  <Route path={"/User/ManageShows/"} element={<ManageShows/>}/>
                  <Route path={"/User/ManageShows/AddShow"} element={<AddShow/>}/>
              </Route>
              <Route path={"/User/Login"} element={<LoginContainer/>}/>
              <Route path={"/User/Register"} element={<LoginContainer/>}/>
              <Route path={"/User/Logout"} element={<LogOutPage/>}/>

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
