import "./App.css"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Footer from "./components/footer";
import NavBar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Quien from "./pages/Quien/Quien";
import Error from "./pages/Error/Error";

const Layout = () => {
  return (
    
<>
      <NavBar/>
      <Outlet/>
      <Footer/>
</>


  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/informacion",
        element: <Quien/>
      },
      {
       path: "*",
        element: <Error/>
      }
    ]
  },

]);

function App() {
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
