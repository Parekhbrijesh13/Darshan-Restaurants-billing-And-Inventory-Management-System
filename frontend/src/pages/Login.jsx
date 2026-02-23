import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { login } from '../api/auth';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    setErrors({});
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const data = await login(formData.username, formData.password);
      console.log('Login success', data);
      navigate('/dashboard');
    } catch (err) {
      setLoginError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 to-lime-500 px-4">

      <div className="w-full max-w-md">

        {/* Logo Section */}
        <div className="text-center mb-8 text-white">
          <div className="text-6xl mb-3">🍽️</div>
          <h1 className="text-3xl font-bold">Darshan Restaurants</h1>
          <p className="text-emerald-100 mt-2 text-sm">
            Billing & Inventory Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-emerald-100">

          <h2 className="text-2xl font-semibold text-emerald-700 mb-2 text-center">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 text-center mb-6">
            Please enter your credentials to continue
          </p>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-5">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username Field */}
            <div className="space-y-1">
              <Input
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Enter your password"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="accent-emerald-600 w-4 h-4"
                />
                Remember me
              </label>

              <a
                href="#"
                className="text-emerald-600 hover:text-emerald-700 font-medium transition"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 font-medium"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-xs mt-6">
          © 2024 Darshan Restaurants. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default Login;