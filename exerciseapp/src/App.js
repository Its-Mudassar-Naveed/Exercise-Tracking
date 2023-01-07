import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Forgetpassword from "./components/Forgetpassword";
import Container from 'react-bootstrap/Container';


function App() {
  return (

    // <Container>
      
    //   <Register/>
    //   <Login/>
    // </Container>

<BrowserRouter>
<Routes>
  
  <Route path="/" element={<Register/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/forget" element={<Forgetpassword/>}></Route>
  
  {/* <Route path="/login" element={<Login/>}></Route> */}
</Routes>
</BrowserRouter>





  );
}

export default App;
