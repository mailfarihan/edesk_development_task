'use client'
import Nav from 'react-bootstrap/Nav';
import { usePathname } from 'next/navigation';

const Navbar = () => {

  //get current pathname
  const pathName = usePathname();  

  return (
    //React router handle navigation by default. if we were to use normal react, we would wrap this navigation using BrowserRouter, Routes and Route.
    <Nav defaultActiveKey="./home" className="flex-column col-2 z-10 shadow-sm">
        <Nav.Link className="relative" active={pathName === '/'} eventKey="1" href="./">Home</Nav.Link>
        <Nav.Link className="relative" active={pathName === '/Profile'} eventKey="2" href="./Profile">Profile</Nav.Link>
        <Nav.Link className="relative" active={pathName === '/Message'} eventKey="2" href="./Message">Message</Nav.Link>
        <Nav.Link className="relative" active={pathName === '/Settings'} eventKey="2" href="./Settings">Settings</Nav.Link>
      
    </Nav>
  )
}

export default Navbar