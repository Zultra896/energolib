import { Routes, Route, Navigate } from 'react-router-dom';
import PasswordResetCard from '../components/PasswordResetCard.jsx';
import SignInCard from '../components/SingInCard.jsx';
import SignUpCard from '../components/SingUpCard.jsx';

function Auth() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="login" element={<SignInCard />} />
      <Route path="register" element={<SignUpCard />} />
      <Route path="reset" element={<PasswordResetCard />} />
    </Routes>
  );
}

export default Auth;
