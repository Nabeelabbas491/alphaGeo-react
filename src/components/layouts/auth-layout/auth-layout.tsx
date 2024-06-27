import './auth-layout.scss'
import logo from "../../../assets/images/auth/logo.png"
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

function AuthLayout() {
    return (
        <div className="main-container h-screen">
            <ToastContainer />
            <div className='content-container'>
                <div className='logo-container xl:w-1/4 lg:w-1/3 md:w-1/3'>
                    <img src={logo} width="200" alt='Login to access AlphaGeo: future-proof analytics on one platform' />
                </div>
                <div className='outlet xl:w-1/4 lg:w-1/3 md:w-1/3'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
