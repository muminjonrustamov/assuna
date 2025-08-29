import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import SHA256 from 'crypto-js/sha256';
import AdminImg from '../../images/admin.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'assuna01') {
      const token = SHA256(username + password).toString();
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div className="login-big">
      <div className="login-card">
        <div className="login-image">
          <img src={AdminImg} alt="Admin" />
        </div>
        <div className="login-form">
          <h2>Admin Panel</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Username </label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
              <label>Password </label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;