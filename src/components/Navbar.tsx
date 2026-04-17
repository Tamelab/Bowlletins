'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock } from 'react-bootstrap-icons';
import Image from 'next/image';

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  if (status === 'loading') return null;

  const currentUser = session?.user?.email;
  const role = session?.user?.role;

  return (
    <div>
      <div className="top-strip"></div>

      <Navbar className="nav-main py-0" expand="md">
        <Container fluid className="px-3 position-relative">
          <Navbar.Brand href="/" className="me-0">
          <Image src="/logo.png" height="60" width="100"alt="Bow-lletins" />
          </Navbar.Brand>

          <Nav className="nav-center d-none d-md-flex">
            <Nav.Link href="/" className="nav-link-custom" active={pathName === '/'}>
              Home
            </Nav.Link>

            <Nav.Link href="/profile" className="nav-link-custom" active={pathName === '/profile'}>
              Profile
            </Nav.Link>

            <NavDropdown title="Categories" className="nav-link-custom">
              <NavDropdown.Item href="#">Jobs</NavDropdown.Item>
              <NavDropdown.Item href="#">Internships</NavDropdown.Item>
              <NavDropdown.Item href="#">Events</NavDropdown.Item>
              <NavDropdown.Item href="#">Study Groups</NavDropdown.Item>
              <NavDropdown.Item href="#">Social</NavDropdown.Item>
              <NavDropdown.Item href="#">Clubs</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#" className="nav-link-custom">
              About
            </Nav.Link>

            <Nav.Link href="#" className="nav-link-custom">
              Contact
            </Nav.Link>
          </Nav>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto d-md-none" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-center d-flex d-md-none">
              <Nav.Link href="/" className="nav-link-custom" active={pathName === '/'}>
                Home
              </Nav.Link>

              <Nav.Link href="/profile" className="nav-link-custom" active={pathName === '/profile'}>
                Profile
              </Nav.Link>

              <NavDropdown title="Categories" className="nav-link-custom">
                <NavDropdown.Item href="#">Jobs</NavDropdown.Item>
                <NavDropdown.Item href="#">Internships</NavDropdown.Item>
                <NavDropdown.Item href="#">Events</NavDropdown.Item>
                <NavDropdown.Item href="#">Study Groups</NavDropdown.Item>
                <NavDropdown.Item href="#">Social</NavDropdown.Item>
                <NavDropdown.Item href="#">Clubs</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="#" className="nav-link-custom">
                About
              </Nav.Link>

              <Nav.Link href="#" className="nav-link-custom">
                Contact
              </Nav.Link>
            </Nav>

            <Nav className="nav-auth ms-md-auto mt-3 mt-md-0">
              {currentUser && (
                <>
                  <Nav.Link id="add-stuff-nav" href="/add" active={pathName === '/add'}>
                    Add Stuff
                  </Nav.Link>
                  <Nav.Link id="list-stuff-nav" href="/list" active={pathName === '/list'}>
                    List Stuff
                  </Nav.Link>
                </>
              )}

              {currentUser && role === 'ADMIN' && (
                <Nav.Link id="admin-stuff-nav" href="/admin" active={pathName === '/admin'}>
                  Admin
                </Nav.Link>
              )}

              {session ? (
                <NavDropdown id="login-dropdown" title={currentUser}>
                  <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                    <BoxArrowRight className="me-2" />
                    Sign Out
                  </NavDropdown.Item>
                  <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                    <Lock className="me-2" />
                    Change Password
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="auth-buttons">
                  <a href="Link /" className="btn btn-sm text-uh-green">
                    Login
                  </a>
                  <a href="/auth/signup" className="btn btn-sm btn-outline-success">
                    Sign Up
                  </a>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;