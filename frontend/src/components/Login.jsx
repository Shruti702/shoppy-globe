import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token to localStorage so we can use it later
        localStorage.setItem('token', data.token);
        alert('Login Successful!');
        navigate('/'); // Redirect to Home
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Check if backend is running.');
    }
  };

  return (
    <div className="checkout-page"> {/* Reusing checkout styles for consistency */}
      <h2>Login</h2>
      {error && <p className="error-msg" style={{textAlign: 'center'}}>{error}</p>}
      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="place-order-btn">Login</button>
        <p style={{textAlign: 'center', marginTop: '10px'}}>
           New here? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;