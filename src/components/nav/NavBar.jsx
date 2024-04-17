import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const NavBar = () => {
  const navigate = useNavigate()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">FallsFinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">All Waterfalls</Nav.Link>
            <Nav.Link href="#link">New Falls</Nav.Link>
            <Nav.Link href="favorites">Favorites</Nav.Link>
            <NavDropdown title="Me" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="" onClick={() => {
                    localStorage.removeItem("learning_user")
                    navigate("/login", { replace: true })
                }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}