import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';

function Head() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Trial Sync App</Navbar.Brand>
          <Nav>
            <Nav.Link href="https://uwaterloo.ca/neurocognition-mobility-lab">Neuro-cognition & Mobility Lab</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Head;