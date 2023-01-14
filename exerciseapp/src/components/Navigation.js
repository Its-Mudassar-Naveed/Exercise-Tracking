import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Exercise Tracking Application</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
            <NavLink href="#home" to="/" >Home</NavLink>
            </Nav.Link>
            <Nav.Link>
            <NavLink href="#Login" to="/login"></NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;