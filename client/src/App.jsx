import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import RequireUser from "./components/RequireUser";
import Home from "./pages/home/Home";
function App() {

  return (
    <>
    <Routes>
      <Route element={<RequireUser/>}>
        <Route path="/" element={<Home/>}>

        </Route>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
