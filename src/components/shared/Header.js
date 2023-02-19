import React, { Fragment } from 'react'
import { Dropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Item className="m-2">
			<Link to='/create-game' style={linkStyle}>
				Add New Game
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='/favorites' style={linkStyle}>
				Your Favorites
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
		{/* <Nav.Item className="m-2">
			<Dropdown>
				<Dropdown.Toggle variant='success' id='dropdown-basic'>
					Account
				</Dropdown.Toggle>
				<Dropdown.Menu id="dropdown-basic-button" title="Dropdown button">
				<Dropdown.Item><Link to='change-password'></Link>ChangePassword</Dropdown.Item>
				<Dropdown.Item href="sign-out">Sign Out</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Nav.Item> */}
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className="m-2">
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className="m-2">
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

// const alwaysOptions = (
// 	<>
// 		<Nav.Item className="m-2">
// 			<Link to='/' style={linkStyle}>
// 				Home
// 			</Link>
// 		</Nav.Item>
// 	</>
// )

const Header = ({ user }) => (
	<Navbar bg='#191921' variant='dark' expand='md' style={{ backgroundColor: '#191921' }}>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
			<img height={'45px'} width={'150px'}src="https://media.discordapp.net/attachments/1073710181965369404/1076648682998480936/GameHub-1_2.png?width=1066&height=350" alt="GameHub Logo"></img>
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.username}</span>
				)}
				{/* {alwaysOptions} */}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
