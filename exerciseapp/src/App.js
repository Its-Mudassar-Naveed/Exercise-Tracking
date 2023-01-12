import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Forgetpassword from "./components/Forgetpassword";
import Userprofile from "./components/Userprofile";
import Navigation from "./components/Navigation"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>

    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forget' element={<Forgetpassword/>}></Route>

    </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;
