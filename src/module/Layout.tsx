import { Outlet } from "react-router-dom";
import GlobalNav from "./GlobalNav";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
    return (
        <>
            <Navbar bg="light" expand="lg" style={{ paddingLeft: '20px' }}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <GlobalNav />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <main className='container mt-3'>
                <Outlet />
            </main>
            <ToastContainer />
        </>
    );
}

export default Layout;