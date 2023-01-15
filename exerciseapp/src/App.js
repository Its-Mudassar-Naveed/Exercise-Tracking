import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Forgetpassword from "./components/Forgetpassword";
import Userprofile from "./components/Userprofile";
import Recover from './components/Recover';
import Navigation from "./components/Navigation"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addactivities from './components/Addactivities';
function App() {
  return (
    <>

    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forget' element={<Forgetpassword/>}></Route>
      <Route path='/userprofile' element={<Userprofile/>}></Route>
      <Route path='/reset' element={<Recover/>}></Route>
      <Route path='/addActivity' element={<Addactivities/>}></Route>
    </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;
