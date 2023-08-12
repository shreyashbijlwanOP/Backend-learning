import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import { Link, Router, useNavigate } from "react-router-dom";

import { RouterService } from "../services";

import useAuth from "../hooks/useAuth";

import { useDispatch, useSelector } from "react-redux";

import { getAuth } from "../store/slices/authSlice";

import { removeCredential } from "../store/slices/authSlice";
import { useLogoutMutation } from "../store/slices/userApiSlice";
import { toast } from "react-toastify";
const Header = () => {
  const navigate = useNavigate();

  const isUserLogged = useAuth();

  const user = useSelector(getAuth);

  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();

      dispatch(removeCredential());
      toast.success(res.msg);
      RouterService.navigate(navigate, "/");
    } catch (error) {
      toast.error(error.data.msg);
    }
  };

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect bg="dark" variant="dark">
        <Container>
          <Link to="/" className="text-decoration-none">
            <Navbar.Brand>JWT AUTH</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {!isUserLogged ? (
                <>
                  <Nav.Link
                    onClick={() => RouterService.navigate(navigate, "/login")}
                  >
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                  <Nav.Link
                    onClick={() =>
                      RouterService.navigate(navigate, "/register")
                    }
                  >
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown title={user.name} id="user">
                    <NavDropdown.Item
                      onClick={() =>
                        RouterService.navigate(navigate, "/profile")
                      }
                    >
                      Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
