import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, EyeOff, Eye, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        fullName,
        email,
        password
      };

      await signup(userData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" style={{ padding: '0', boxShadow: '0 10px 32px -8px rgba(139,92,246,0.15)' }}>
        <div className="login-header" style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>Create Account</h2>
          <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Sign up to get started</p>
        </div>
        <div className="login-form" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="error-message" style={{ background: '#FEE2E2', color: '#B91C1C', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', fontWeight: 500, fontSize: '0.95rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            {/* Full Name input */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-container">
                <span className="icon">
                  <User size={18} />
                </span>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
              </div>
            </div>
            {/* Email input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <span className="icon">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            {/* Password input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <span className="icon">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {/* Confirm Password input */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-container">
                <span className="icon">
                  <Lock size={18} />
                </span>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {/* Terms and Conditions */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="remember-me terms-checkbox" style={{ alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                  style={{ accentColor: '#8B5CF6', marginTop: '0.2rem' }}
                />
                <span style={{ fontSize: '0.95rem', color: '#4B5563' }}>
                  I agree to the{' '}
                  <Link to="/terms" className="terms-link">Terms of Service</Link>{' '}and{' '}
                  <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </span>
              </label>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || !acceptTerms}
              className="login-button"
              style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.75rem 0', marginTop: '0.5rem', borderRadius: '0.75rem' }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="spinner"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRight style={{ marginLeft: '8px' }} size={18} />
                </>
              )}
            </button>
          </form>
          {/* Sign in link */}
          <div className="signup" style={{ marginTop: '2rem', fontSize: '1rem' }}>
            <p>
              Already have an account?{' '}
              <Link to="/login" className="forgot-password" style={{ fontWeight: 600 }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
