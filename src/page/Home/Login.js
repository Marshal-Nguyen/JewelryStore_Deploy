import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import style from './Login.module.css';
import axios from 'axios';

export default function LoginToStore() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Username/Password is required!!!');
      return;
    }
    setLoadingApi(true);
    try {
      const data = await axios.post('https://jssatsproject.azurewebsites.net/api/login', {
        username: username,
        password: password,

      });
      // console.log('>>> check res dta', data)
      const user = data.data;
      // console.log('>>> check user', user)
      if (user && user.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('staffId', user.staffId);
        localStorage.setItem('name', user.name);
        // console.log('>>> check local', localStorage.getItem('token'))
        // localStorage.setItem('Role', user.role);
        // Determine user role and redirect or show appropriate UI
        switch (user.role) {
          case 'admin':
            navigate('/admin/Dashboard');
            break;
          case 'seller':
            navigate('/public');
            break;
          case 'manager':
            navigate('/manager/Dashboard');
            break;
          case 'cashier':
            navigate('/cs_public/cs_order/cs_waitingPayment');
            break;
          // Add more cases for other roles if needed
          default:
            toast.error('Unknown user role');
            break;
        }
      }

    } catch (error) {
      toast.error('Invalid username or password');
    }
    setLoadingApi(false);
  };

  return (

    <div className={clsx(style.login_container)}>
      {localStorage.clear()}
      <div className={clsx(style.title_login)}>Log in</div>
      <input
        type='text'
        placeholder='Username...'
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <div className={clsx(style.input_2)}>
        <input
          type={isShowPassword ? 'text' : 'password'}
          placeholder='Password...'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <span>
          <FontAwesomeIcon
            icon={isShowPassword ? faEye : faEyeSlash}
            onClick={() => setIsShowPassword(!isShowPassword)}
          />
        </span>
      </div>

      <button
        className={username && password ? clsx(style.active) : ''}
        disabled={!username || !password}
        onClick={() => handleLogin()}
      >
        {loadingApi && (
          <FontAwesomeIcon
            icon={faSpinner}
            className='fa-spin-pulse fa-spin-reverse fa-1.5x me-2'
          />
        )}
        Login
      </button>


    </div>
  );
}