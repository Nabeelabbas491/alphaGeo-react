import { Navigate, Route, Routes } from 'react-router';
import './App.scss';
import AuthLayout from './components/layouts/auth-layout/auth-layout';
import Login from './components/auth/login';
import ResetPassword from './components/auth/reset-password';
import RecoverPassword from './components/auth/recover-password';
import TrialSetup from './components/auth/trial-setup';
import MultiFactorAuthentication from './components/auth/multi-factor-authentication';
import FullLayout from './components/layouts/full-layout/full-layout';
import SideBar from './components/shared/sidebar';
import { ToastContainer } from 'react-toastify';
import AccountVerification from './components/auth/account-verification';

function App() {
  return (
    <div className='h-full'>
      <ToastContainer />
      <Routes>
        <Route path='' element={<AuthLayout />} >
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path='login' element={<Login />} />
          <Route path='forgot-password' element={<RecoverPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='trial-setup' element={<TrialSetup />} />
          <Route path='mfa' element={<MultiFactorAuthentication />} />
          <Route path='account-verification' element={<AccountVerification />} />
        </Route>
        <Route path='full-layout' element={<FullLayout />}>
          <Route path='menu' element={<SideBar />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
