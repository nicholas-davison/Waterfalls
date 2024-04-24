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
            {/* <Nav.Link href="/">All Waterfalls</Nav.Link> */}
            <Nav.Link href="/newfalls">New Falls</Nav.Link>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="" onClick={() => {
                    localStorage.removeItem("learning_user")
                    navigate("/login", { replace: true })
                }}>
                Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}