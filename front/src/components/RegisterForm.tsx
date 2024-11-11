import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoImage from '../img/logo.png'
import './RegisterForm.css'

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5001/register', {
        username,
        password,
      });
      setMessage('登録完了しました!');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('登録失敗しました.');
    }
  };

  const handleBack = () => {
    navigate(-1); // 前のページに戻る
  };

  return (
    <div className = "register-container">
      <img src={LogoImage} alt="Logo" />
      <h2>会員登録</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} className="register-button">登録</button>
      <button onClick={handleBack} className="back-button" >戻る</button> {/* 戻るボタン */}
      <p>{message}</p>
    </div>
  );
};

export default RegisterForm;
