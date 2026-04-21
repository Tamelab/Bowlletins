'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  if (status === 'loading') return null;

  const currentUser = session?.user?.email;
  const role = session?.user?.role;

  return (
    <div>
      <div className="top-strip"></div>

      <Navbar className="nav-main d-flex align-items-center px-3 py-0" expand="md">
        <Container fluid className="position-relative">

          {/* LOGO LEFT */}
          <Navbar.Brand href="/">
            <img src="/logo.png" width="140" alt="Bow-lletins" />
          </Navbar.Brand>

          {/* MENU BUTTON (MOBILE) */}
          <button
            className="menu-btn d-md-none ms-auto"
            onClick={(e) => {
              const menu = document.getElementById('basic-navbar-nav');
              menu?.classList.toggle('show');

              const arrow = e.currentTarget.querySelector('.menu-arrow');
              arrow?.classList.toggle('open');
            }}
          >
            Menu <span className="menu-arrow">▾</span>
          </button>

          <Navbar.Collapse id="basic-navbar-nav">

            {/* DESKTOP CENTER NAV */}
            <Nav className="nav-center d-none d-md-flex">
              <Nav.Link href="/" className="nav-link-custom" active={pathName === '/'}>
                Home
              </Nav.Link>

              <Nav.Link href="/posts" className="nav-link-custom" active={pathName === '/posts'}>
                Posts
              </Nav.Link>

              <NavDropdown title="Categories" className="nav-link-custom">
                <NavDropdown.Item href="#">Jobs</NavDropdown.Item>
                <NavDropdown.Item href="#">Internships</NavDropdown.Item>
                <NavDropdown.Item href="#">Events</NavDropdown.Item>
                <NavDropdown.Item href="#">Study Groups</NavDropdown.Item>
                <NavDropdown.Item href="#">Social</NavDropdown.Item>
                <NavDropdown.Item href="#">Clubs</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/about" className="nav-link-custom" active={pathName === '/about'}>
                About
              </Nav.Link>

              <Nav.Link href="#" className="nav-link-custom">
                Contact
              </Nav.Link>
            </Nav>

            {/* MOBILE NAV */}
            <Nav className="nav-center d-flex d-md-none">
              <Nav.Link href="/" className="nav-link-custom">
                Home
              </Nav.Link>

              <Nav.Link href="/posts" className="nav-link-custom">
                Posts
              </Nav.Link>

              <NavDropdown title="Categories" className="nav-link-custom">
                <NavDropdown.Item href="#">Jobs</NavDropdown.Item>
                <NavDropdown.Item href="#">Internships</NavDropdown.Item>
                <NavDropdown.Item href="#">Events</NavDropdown.Item>
                <NavDropdown.Item href="#">Study Groups</NavDropdown.Item>
                <NavDropdown.Item href="#">Social</NavDropdown.Item>
                <NavDropdown.Item href="#">Clubs</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/about" className="nav-link-custom">
                About
              </Nav.Link>

              <Nav.Link href="#" className="nav-link-custom">
                Contact
              </Nav.Link>
            </Nav>

            {/* RIGHT SIDE AUTH */}
            <Nav className="nav-auth ms-md-auto mt-2 mt-md-0">
              {currentUser && role === 'ADMIN' && (
                <Nav.Link href="/admin">
                  Admin
                </Nav.Link>
              )}

              {session ? (
                <NavDropdown title={currentUser}>
                  <NavDropdown.Item href="/homeDashboard">
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item href="/api/auth/signout">
                    <BoxArrowRight className="me-2" />
                    Sign Out
                  </NavDropdown.Item>

                  <NavDropdown.Item href="/auth/change-password">
                    <Lock className="me-2" />
                    Change Password
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="auth-buttons">
                  <a href="/signin" className="btn btn-sm text-uh-green">
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