import './App.css';
import Register from './components/Register';
import Container from 'react-bootstrap/Container';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Container>
      <Toaster/>
      <Register/>
   
    </Container>
  );
}

export default App;
