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
      }
      // {
      //   path: "/news",
      //   element: <News/>
      // },
      // {
      //   path: "/survey",
      //   element: <Survey/>
      // },
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
