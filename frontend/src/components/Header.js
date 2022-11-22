import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

function Header(){

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
            <img class="debug-header" src={process.env.PUBLIC_URL+"simplified_logo_WhiteBlack.png"} />
              DEBUG COFFEE
              </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox/>
            <Nav className="mr-auto">

              <LinkContainer to='/cart'>
                <Nav.Link ><i class="nav_icon"className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>

              {userInfo ?(
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer> 

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><i class="nav_icon"className="fas fa-user"></i>Login</Nav.Link>
                </LinkContainer>
              )}                
                <LinkContainer to='/Merch'>
                  <Nav.Link><i class="nav_icon" className="fa-solid fa-shirt"></i>Merch</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/AboutUs'>
                  <Nav.Link><i class="nav_icon" className="fa-solid fa-circle-info"></i>About Us</Nav.Link>
                </LinkContainer>

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer> 
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer> 
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer> 
                  </NavDropdown> 
                )}
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>		</header>
  )
}

export default Header
